const r = require('r2')

async function httpGet(_, {url, body = {}, headers = {}}, {double = false}) {
    if (url.slice(0, 4) !== 'http') {
        url = 'http://' + url
    }

    const resp = await r(url, {json: body, headers}).text

    if (double) {
        return `\n${resp.trim()}\n`
    }

    return resp.trim()
}

module.exports = {
    httpGet,
}
