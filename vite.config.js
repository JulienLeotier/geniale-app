import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { URL, fileURLToPath } from "node:url";
import eslintPlugin from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        eslintPlugin({
            overrideConfigFile: fileURLToPath(new URL('.eslintrc.cjs', import.meta.url)),
        }),
        Components({
            dirs: [
                "src"
            ],
            directoryAsNamespace: true,
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
            include: [/\.vue$/, /\.vue\?vue/, /[\\/]node_modules[\\/]@satelia/],
            exclude: [/[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
