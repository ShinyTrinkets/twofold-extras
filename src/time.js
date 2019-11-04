function getDate(text) {
    if (text && typeof text === 'string') {
        return new Date(text)
    } else if (!text || typeof text !== 'object') {
        return new Date()
    }
    return text
}

function moonPhase(_, { date = null, d = null, emoji = true } = {}) {
    const moonmoji = require('moonmoji')
    date = getDate(date || d)
    const m = moonmoji(date)
    if (emoji) {
        return m.emoji
    } else {
        return m.name
    }
}

function zodiacSign(_, { date = null, d = null } = {}) {
    const zodSigns = [
        'Capricorn',
        'Aquarius',
        'Pisces',
        'Aries',
        'Taurus',
        'Gemini',
        'Cancer',
        'Leo',
        'Virgo',
        'Libra',
        'Scorpio',
        'Sagittarius',
    ]
    date = getDate(date || d)
    const day = date.getDate()
    const month = date.getMonth()
    let sign = ''
    switch (month) {
        case 0:
            // January
            if (day < 20) sign = zodSigns[0]
            else sign = zodSigns[1]
            break
        case 1:
            // February
            if (day < 19) sign = zodSigns[1]
            else sign = zodSigns[2]
            break
        case 2:
            // March
            if (day < 21) sign = zodSigns[2]
            else sign = zodSigns[3]
            break
        case 3:
            // April
            if (day < 20) sign = zodSigns[3]
            else sign = zodSigns[4]
            break
        case 4:
            // May
            if (day < 21) sign = zodSigns[4]
            else sign = zodSigns[5]
            break
        case 5:
            // June
            if (day < 21) sign = zodSigns[5]
            else sign = zodSigns[6]
            break
        case 6:
            // July
            if (day < 23) sign = zodSigns[6]
            else sign = zodSigns[7]
            break
        case 7:
            // August
            if (day < 23) sign = zodSigns[7]
            else sign = zodSigns[8]
            break
        case 8:
            // September
            if (day < 23) sign = zodSigns[8]
            else sign = zodSigns[9]
            break
        case 9:
            // October
            if (day < 23) sign = zodSigns[9]
            else sign = zodSigns[10]
            break
        case 10:
            // November
            if (day < 22) sign = zodSigns[10]
            else sign = zodSigns[11]
            break
        case 11:
            // December
            if (day < 22) sign = zodSigns[11]
            else sign = zodSigns[0]
            break
    }
    return sign
}

module.exports = {
    moonPhase,
    moon: moonPhase,
    zodiacSign,
    zodiac: zodiacSign,
}
