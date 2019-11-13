const execa = require('execa')
const osxBrightness = require('osx-brightness')

async function setVolume({text}, {nr} = {}) {
    /**
     * Set volume from 0 to 10.
     */
    if (nr === undefined || nr === null || isNaN(nr)) {
        nr = parseInt(text, 10)
    }

    if (isNaN(nr)) {
        return ''
    }

    if (nr < 0) nr = 0
    if (nr > 10) nr = 10

    const {stdout} = await execa('osascript', ['-e', `set Volume ${nr}`])
    console.log(stdout.trim())
    return nr
}

async function setBrightness({text}, {nr} = {}) {
    /**
     * Set brightness from 0 to 10.
     */
    if (nr === undefined || nr === null || isNaN(nr)) {
        nr = parseInt(text, 10)
    }

    if (isNaN(nr)) {
        return ''
    }

    if (nr < 0) nr = 0
    if (nr > 10) nr = 10

    await osxBrightness.set(nr / 10)
    return nr
}

module.exports = {
    setBrightness,
    setVolume,
}
