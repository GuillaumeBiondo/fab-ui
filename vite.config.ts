import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({ include: ['src'], insertTypesEntry: true, skipDiagnostics: true }),
    ],
    resolve: {
        alias: { '@': resolve(__dirname, 'src') },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'FabUI',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [
                'vue',
                'vue-input-otp',
                'reka-ui',
                'lucide-vue-next',
                'class-variance-authority',
                '@vueuse/core',
                /^@inertiajs\//,
                /^tailwindcss/,
            ],
            output: {
                assetFileNames: (info) => {
                    const name = info.names?.[0] ?? '';
                    if (name.endsWith('.css')) return 'style.css';
                    if (/.(woff2?|ttf|eot)$/.test(name)) return 'fonts/[name][extname]';
                    return 'assets/[name][extname]';
                },
            },
        },
        cssCodeSplit: false,
        assetsInlineLimit: 0,
    },
})
