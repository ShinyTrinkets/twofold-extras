const r = require('r2')

async function httpGet(_, {url, body = {}, headers = {}}) {
    if (url.slice(0, 4) !== 'http') {
        url = 'http://' + url
    }

    const resp = await r(url, {json: body, headers}).text
    return resp.trim()
}

module.exports = {
    httpGet,
}
