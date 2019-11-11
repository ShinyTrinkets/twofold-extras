import test from 'ava'
import func from '../src/time'

test('horoscop sign', t => {
    let d
    d = {date: new Date(2012, 0, 23, 11)}
    t.is(func.zodiacSign(0, d), 'Aquarius')
    d = {date: new Date(2012, 2, 23, 11)}
    t.is(func.zodiacSign(0, d), 'Aries')
    d = {date: new Date(2012, 6, 23, 11)}
    t.is(func.zodiacSign(0, d), 'Leo')
})

test('moon phase', t => {
    let d
    d = {date: new Date('2019-07-17')}
    t.is('🌝', func.moonPhase(0, d))
    d = {date: new Date('2019-04-20'), emoji: 'no'}
    t.is('Full Moon', func.moonPhase(0, d))
})
