const fs = require('fs')
const os = require('os')
const path = require('path')

const {promisify} = require('util')
const dotProp = require('dot-prop')
const urlSlug = require('url-slug')
const loadJson = require('load-json-file')
const writeJson = require('write-json-file')

const makeDir = promisify(fs.mkdir)

const APP_NAME = '2fold'

function isWritable(pth) {
    try {
        fs.accessSync(pth, fs.constants.W_OK)
        return true
    } catch (_) {
        return false
    }
}

async function getCacheDir(appName) {
    const dir = path.join(os.homedir(), '.cache', appName)
    if (!isWritable(dir)) {
        try {
            await makeDir(dir)
        } catch (error) {
            throw error
        }
    }

    return dir
}

async function getCacheFile(name) {
    const cacheDir = await getCacheDir(APP_NAME)
    const cacheFile = path.join(cacheDir, name)
    let data = {}
    if (isWritable(cacheFile)) {
        data = await loadJson(cacheFile)
    }

    return [cacheFile, data]
}

async function getCache(name, key, defaultValue = null) {
    const [_, data] = await getCacheFile(name)
    const value = dotProp.get(data, key, defaultValue)
    if (value && typeof value.expires === 'number' && Date.now() > value.expires) {
        delCache(name, key)
        return defaultValue
    }

    return value
}

async function delCache(name, key) {
    const [cacheFile, data] = await getCacheFile(name)
    dotProp.delete(data, key)
    await writeJson(cacheFile, data, {sortKeys: true})
}

async function putCache(name, key, value, ttl = null) {
    const [cacheFile, data] = await getCacheFile(name)
    if (typeof ttl === 'number' && ttl > 0) {
        value.expires = Date.now() + ttl
    }

    dotProp.set(data, key, value)
    await writeJson(cacheFile, data, {sortKeys: true})
}

async function getUrl(url, defaultValue = null) {
    const cacheFile = 'requests.json'
    const result = await getCache(cacheFile, urlSlug(url), defaultValue)
    return result
}

async function cacheUrl(url, value, ttl = null) {
    const cacheFile = 'requests.json'
    const result = await putCache(cacheFile, urlSlug(url), value, ttl)
    return result
}

module.exports = {
    getCache,
    delCache,
    putCache,
    getUrl,
    cacheUrl,
}
