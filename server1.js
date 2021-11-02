const server1 = require('express')();
const createApp = require('./dist/built-server-bundle.js')


const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./render/index.template.html', 'utf-8')
});
server1.get('*', (req, res) => {
    const context = {url: req.url}
    const app = createApp(context);
    renderer.renderToString(app, (err, html) => {

        if (err) {
            console.error('err', err)
            if (err.code === 404) {
                res.status(404).end('page not found')
            } else {

                res.status(500).end('Internal Server Error')
            }

        } else {
            res.end(html)
        }
    })
})