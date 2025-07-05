import { defineConfig } from 'orval';
export default defineConfig({
    ledger: {
        input: './openapi.yaml',
        output: {
            mode: 'split',
            target: './src/api/generated',
            schemas: './src/api/generated/model',
            client: 'swr',
            httpClient: 'axios',
            mock: true,
            override: {
                mutator: {
                    path: './src/api/mutator/custom-instance.ts',
                    name: 'customInstance',
                },
            },
        },
    },
});
