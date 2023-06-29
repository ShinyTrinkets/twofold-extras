const r = require('r2')
const cache = require('./cache')

async function httpGet(_, {url, headers = {}}, {double = false}) {
    if (url.slice(0, 4) !== 'http') {
        url = 'http://' + url
    }

    const cached = await cache.getUrl(url)
    if (cached && cached.text) {
        console.log('Serve from cache::', cached.text)
        return cached.text.trim()
    }

    const resp = await r(url, {headers}).response
    let text = await resp.text()
    text = text.trim()
    const ttl = 5 * 60 * 1000 // 5 minutes

    if (resp.ok) {
        console.log('Save in cache::', text)
        await cache.cacheUrl(url, {text}, ttl)
    } else {
        console.error(text)
    }

    if (double) {
        return `\n${text}\n`
    }

    return text
}

async function darkskyWeather(_, {latLong, units = null, lang = null, apiKey = null}, {double = false}) {
    /**
     * Get Weather from api.darksky.net.
     * You need to register and provide your API KEY.
     */
    const exclude = 'minutely,hourly,daily,alerts'

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

    const url = `https://api.darksky.net/forecast/$apiKey/${latLong}?${units}exclude=${exclude}`

    const cached = await cache.getUrl(url)
    if (cached && cached.text) {
        console.log('Serve from cache::', url, cached.text)
        return cached.text.trim()
    }

    apiKey = apiKey ? apiKey : process.env.DARKSKY_API_KEY
    const resp = await r(url.replace('$apiKey', apiKey)).response
    const data = await resp.json()

    units = data.flags.units === 'si' ? 'C' : 'F'
    let text = `${data.currently.summary}, ${data.currently.temperature}° ${units}`
    text += `, feels like ${data.currently.apparentTemperature}°`

    const ttl = 10 * 60 * 1000 // 10 minutes
    if (resp.ok) {
        console.log('Save in cache::', url, text)
        await cache.cacheUrl(url, {text}, ttl)
    } else {
        console.error(text)
    }

    if (double) {
        return `\n${text}\n`
    }

    return text
}

async function openWeatherMap(_, {where, units = null, apiKey = null}, {double = false}) {
    /**
     * Get Weather from api.openweathermap.org.
     * You need to register and provide your API KEY.
     */
    let unitQuery = ''
    if (units) {
        unitQuery = `&units=${units}`
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?APPID=$apiKey&q=${where}${unitQuery}`

    const cached = await cache.getUrl(url)
    if (cached && cached.text) {
        console.log('Serve from cache::', cached.text)
        return cached.text.trim()
    }

    apiKey = apiKey ? apiKey : process.env.OPENWEATHER_API_KEY
    const resp = await r(url.replace('$apiKey', apiKey)).response
    const data = await resp.json()

    units = units === 'metric' ? 'C' : 'F'
    let text = `${data.weather[0].description}, ${data.main.temp}° ${units}`
    text += `, humidity ${data.main.humidity}%`
    text = text.charAt(0).toUpperCase() + text.substr(1)

    const ttl = 10 * 60 * 1000 // 10 minutes
    if (resp.ok) {
        console.log('Save in cache::', text)
        await cache.cacheUrl(url, {text}, ttl)
    } else {
        console.error(text)
    }

    if (double) {
        return `\n${text}\n`
    }

    return text
}

module.exports = {
    httpGet,
    darkskyWeather,
    openWeatherMap,
}
