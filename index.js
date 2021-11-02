const Vue = require('vue');
const server = require('express')();

// const template = require('fs').readFileSync('./render/index.template.html', 'utf-8');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./render/index.template.html', 'utf-8')
});


const context = {
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
};

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url,
        },
        template: `
          <div>fang wen de url {{ url }}</div>`
    });


    renderer
        .renderToString(app, context, (err, html) => {
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

server.listen(9000)
