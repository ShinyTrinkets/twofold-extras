const esprima = require('esprima')

function extractFunctionArgs(func) {
    /**
     * Helper that extracts all arguments from a function definition.
     */
    const lex = esprima.parseScript(func.toString(), { tokens: true, range: true })
    let min,
        max = 0
    for (const param of lex.body[0].params) {
        if (min) {
            min = Math.min(...param.range, min)
        } else {
            min = Math.min(...param.range)
        }
        max = Math.max(...param.range, max)
    }
    return func.toString().slice(min, max)
}

function extractFunctionDocs(func) {
    /**
     * Helper that extracts the documentation from a function definition.
     */
    const lex = esprima.parseScript(func.toString(), { comment: true, range: true })
    const comment = lex.comments[0].value.trim()
    let final = ''
    for (let c of comment.split('\n')) {
        c = c.trim()
        if (!c || c === '*') {
            continue
        }
        final += c + '\n'
    }
    return final
}

module.exports = { extractFunctionArgs, extractFunctionDocs }
