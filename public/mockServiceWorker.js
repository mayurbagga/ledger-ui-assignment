/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (0.35.0).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */
const INTEGRITY_CHECKSUM = '3d6b9f06410d179a7f7404d4bf4c3c70'
const bypassHeaderName = 'x-msw-bypass'

let clients = {}

self.addEventListener('install', function () {
  return self.skipWaiting()
})

self.addEventListener('activate', async function (event) {
  return self.clients.claim()
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !clients[clientId]) {
    return
  }

  const client = clients[clientId]
  const allClients = await self.clients.matchAll()

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      clients[clientId].active = true
      break
    }

    case 'MOCK_DEACTIVATE': {
      clients[clientId].active = false
      break
    }

    case 'CLIENT_CLOSED': {
      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      // Unregister itself when there are no more clients
      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', async function (event) {
  const { request } = event
  const accept = request.headers.get('accept') || ''

  // Bypass server-sent events.
  if (accept.includes('text/event-stream')) {
    return
  }

  // Bypass navigation requests.
  if (request.mode === 'navigate') {
    return
  }

  // Opening the DevTools triggers the "only-if-cached" request
  // so that the DevTools can display the cached response.
  // https://github.com/mswjs/msw/issues/301
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  // Bypass all requests when there are no active clients.
  // Prevents the self-unregistered worked from throwing errors.
  if (!Object.values(clients).some((client) => client.active)) {
    return
  }

  // Generate unique request ID.
  const requestId = Math.random().toString(16).slice(2)

  event.respondWith(
    handleRequest(event, requestId).catch((error) => {
      if (error.name === 'NetworkError') {
        console.warn(
          '[MSW] Successfully emulated a network error for the "%s %s" request.',
          request.method,
          request.url,
        )
        return
      }

      // At this point, any exception indicates an issue with the request handler.
      // It does not indicate a problem with the Mock Service Worker itself.
      console.error(
        `\
[MSW] Caught an exception from the "%s %s" request handler:

%s

This exception has been gracefully handled.\
`,
        request.method,
        request.url,
        error,
      )
    }),
  )
})

async function handleRequest(event, requestId) {
  const client = await resolveMainClient(event)
  const response = await getResponse(event, client, requestId)

  // Send back the response clone for the "response:*" life-cycle events.
  // Ensure MSW is active and called, and constructing a new Response object
  // from the intercepted response so that the "response:*" life-cycle events
  // can be triggered.
  const responseClone = response.clone()

  sendToClient(
    client,
    {
      type: 'RESPONSE',
      payload: {
        requestId,
        type: responseClone.type,
        ok: responseClone.ok,
        status: responseClone.status,
        statusText: responseClone.statusText,
        body:
          responseClone.body === null ? null : await responseClone.text(),
        headers: Object.fromEntries(responseClone.headers.entries()),
        redirected: responseClone.redirected,
      },
    },
    [responseClone.body],
  )

  return response
}

// Resolve the main client for the given event.
// Client that issues a request is considered the main client. If the main
// client is not available, we'll fall back to the first available client.
async function resolveMainClient(event) {
  const client = await event.target.clients.get(event.clientId)

  if (client?.frameType === 'top-level') {
    return client
  }

  const allClients = await event.target.clients.matchAll()

  return allClients
    .filter((client) => {
      // Get only those clients that are currently visible.
      return client.visibilityState === 'visible'
    })
    .find((client) => {
      // Find the first client that isn't a worker.
      return client.frameType !== 'nested'
    })
}

async function getResponse(event, client, requestId) {
  const { request } = event
  const requestClone = request.clone()
  const getOriginalResponse = () => fetch(requestClone)

  // Bypass mocking when the request client is not active.
  if (!client?.active) {
    return getOriginalResponse()
  }

  // Bypass requests with the explicit bypass header
  if (requestClone.headers.get(bypassHeaderName) === 'true') {
    const cleanRequestHeaders = serializeHeaders(requestClone.headers)
    delete cleanRequestHeaders[bypassHeaderName]

    const originalRequest = new Request(requestClone, {
      headers: cleanRequestHeaders,
    })

    return fetch(originalRequest)
  }

  // Send the request to the client-side MSW.
  const reqHeaders = serializeHeaders(request.headers)
  const body = await request.text()

  const clientMessage = await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        url: request.url,
        method: request.method,
        headers: reqHeaders,
        cache: request.cache,
        mode: request.mode,
        credentials: request.credentials,
        destination: request.destination,
        integrity: request.integrity,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        body,
        bodyUsed: request.bodyUsed,
        keepalive: request.keepalive,
      },
    },
    [request.body],
  )

  switch (clientMessage.type) {
    case 'MOCK_SUCCESS': {
      return delayPromise(
        () => respondWithMock(clientMessage.payload),
        clientMessage.payload.delay,
      )
    }

    case 'MOCK_NOT_FOUND': {
      return getOriginalResponse()
    }

    case 'NETWORK_ERROR': {
      const { name, message } = clientMessage.payload
      const networkError = new Error(message)
      networkError.name = name

      // Rejecting a "respondWith" promise emulates a network error.
      throw networkError
    }

    case 'INTERNAL_ERROR': {
      const parsedBody = JSON.parse(clientMessage.payload.body)

      console.error(
        `\
[MSW] Uncaught exception in the request handler for "%s %s":

%s

This exception has been gracefully handled.\
`,
        request.method,
        request.url,
        parsedBody.errorType,
      )

      return respondWithMock(clientMessage.payload)
    }
  }

  return getOriginalResponse()
}

function sendToClient(client, message, transferrables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }

      resolve(event.data)
    }

    client.postMessage(JSON.stringify(message), [channel.port2].concat(transferrables))
  })
}

function delayPromise(cb, duration) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cb()), duration)
  })
}

function respondWithMock(response) {
  // Setting response status code to 0 is a no-op.
  // However, when responding with a Response object, the status code
  // needs to be explicitly set to 200 to close the request properly.
  if (response.status === 0) {
    response.status = 200
  }

  return new Response(response.body, {
    ...response,
    headers: response.headers,
  })
}

function serializeHeaders(headers) {
  const reqHeaders = {}
  headers.forEach((value, name) => {
    reqHeaders[name] = reqHeaders[name]
      ? [].concat(reqHeaders[name]).concat(value)
      : value
  })
  return reqHeaders
}
