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

async function darkskyWeather(_, {latLong, units = null, lang = null, apiKey = null}, {double = false}) {
    /**
     * Get Weather from api.darksky.net.
     * You need to register and provide your API KEY.
     */
    const exclude = 'minutely,hourly,daily,alerts,flags'
    apiKey = apiKey ? apiKey : process.env.DARKSKY_API_KEY

    if (units) {
        units = `units=${units}&`
    } else {
        units = ''
    }

    if (lang) {
        lang = `lang=${lang}&`
    } else {
        lang = ''
    }

    const url = `https://api.darksky.net/forecast/${apiKey}/${latLong}?${units}exclude=${exclude}`
    const resp = await r(url).text

    if (double) {
        return `\n${resp.trim()}\n`
    }

    return resp.trim()
}

async function openWeatherMap(_, {where, apiKey = null}, {double = false}) {
    /**
     * Get Weather from api.openweathermap.org.
     * You need to register and provide your API KEY.
     */
    apiKey = apiKey ? apiKey : process.env.OPENWEATHER_API_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&q=${where}`
    const resp = await r(url).text

    if (double) {
        return `\n${resp.trim()}\n`
    }

    return resp.trim()
}

module.exports = {
    httpGet,
    darkskyWeather,
    openWeatherMap,
}
