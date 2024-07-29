import {fileURLToPath, URL} from 'node:url'

// ElementUI自动按需引入 vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            // 配置elementPlus采用sass样式配色系统
            resolvers: [ElementPlusResolver({importStyle: "sass"})],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 自动导入定制化样式文件进行样式覆盖
                additionalData: `
                  @use "@/styles/element/index.scss" as *;
                  @use "@/styles/var.scss" as *;
                `,
            }
        }
    },
    server: {
        cors: false,
        open: true, //是否自动弹出浏览器页面
        host: 'localhost',
        port: '8081',
        hotOnly: false,
        proxy: {
            '^/zyk': {
                target: 'https://1080zyk5.com/',
                secure: true,
                changeOrigin: true,
                rewrite: (path) => {
                    console.log(path);
                    return path.replace(/^\/zyk/, '')
                },
                configure: (proxy, options) => {
                    // proxy will be an instance of 'http-proxy'
                    proxy.on('proxyReq', (proxyReq, req, res, options) => {
                        proxyReq.setHeader("referer", "https://1080zyk5.com/")
                        console.log(39, req.headers, req.url)
                    })
                }
            }
        }
    }
})
