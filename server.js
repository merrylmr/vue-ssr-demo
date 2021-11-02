const fs = require('fs')
const path = require('path')
const express = require('express');
const server = express();

const {createBundleRenderer} = require('vue-server-renderer')
const LRU = require('lru-cache')

const resolve = file => path.resolve(__dirname, file)

const template = fs.readFileSync(resolve('./render/index.template.html'), 'utf-8')

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            template,
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: resolve('./dist'),
            runInNewContext: false
        })
    )
}

let renderer
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
renderer = createRenderer(bundle, {
    runInNewContext: false, // 推荐
    clientManifest
})

/**
 * 渲染函数
 * @param ctx
 * @param next
 * @returns {Promise}
 */
function render(ctx, next) {
    ctx.set("Content-Type", "text/html")
    return new Promise(function (resolve, reject) {
        const handleError = err => {
            if (err && err.code === 404) {
                ctx.status = 404
                ctx.body = '404 | Page Not Found'
            } else {
                ctx.status = 500
                ctx.body = '500 | Internal Server Error'
                console.error(`error during render : ${ctx.url}`)
                console.error(err.stack)
            }
            resolve()
        }
        const context = {
            title: 'Vue Ssr 2.3',
            url: ctx.url
        }
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return handleError(err)
            }
            console.log(html)
            ctx.body = html
            resolve()
        })
    })
}

// 静态资源
server.use('/', express.static(path.join(__dirname, 'dist')));
server.get('*', (req, res) => {
    const context = {
        title: 'Vue Ssr 2.3',
        url: req.url
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log('err', err)
            if (err.code === 404) {
                res.status(404).end('page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
            return
        }
        // 处理异常……
        res.end(html)
    })
})
const port = process.env.PORT || 9001
server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})

