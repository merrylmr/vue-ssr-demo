import {createApp} from './src/app'

const fs = require('fs')
const serialize = require('serialize-javascript');

function writeFile(content) {
    const data = serialize(content)
    console.log('writeFile content1111', data)
    try {
        fs.writeFileSync('./dist/global.js', 'window.__INITIAL_STATE__=' + data)
    } catch (err) {
        console.error('writeFile', err)
    }
}

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp()
        router.push(context.url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({code: 404})
            }

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    console.log('router.currentRoute', router.currentRoute)
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state
                // 将文件写入到global.js中
                writeFile(store.state)
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}