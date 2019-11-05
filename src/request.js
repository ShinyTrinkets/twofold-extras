const r = require('r2')

async function httpGet(_, { url }) {
    if (url.slice(0, 4) !=='http') {
        url = 'http://' + url
    }
    const resp = await r(url).text
    return resp.trim()
}

module.exports = {
    httpGet,
}
