const fs = require('fs')
const path = require('path')
const esprima = require('esprima')

function documentJS(_, {pth, li = '##', newline = '\n\n'}, {double = false}) {
    /**
     * Auto-document all JS files and functions from a folder.
     */
    const funcs = importAny(pth)
    let final = ''
    for (const fname of Object.keys(funcs)) {
        const func = funcs[fname]
        final += `${li} ${fname} ${extractFunctionArgs(func)}${newline}`
        const docs = extractFunctionDocs(func)
        if (docs) {
            final += `${docs}${newline}`
        }
    }

    if (double) {
        return `\n${final.trim()}\n`
    }

    return final
}

function importAny(pth) {
    /**
     * Import any local file, module, or all JS files from a folder.
     */
    let functions = {}
    const normalizedPath = pth[0] === '/' ? pth : path.join(process.cwd(), pth)

    functions = _importFile(normalizedPath)
    if (functions) {
        return functions
    }

    functions = _importFile(normalizedPath + '.js')
    if (functions) {
        return functions
    }

    functions = {}
    fs.readdirSync(normalizedPath).forEach(function(fname) {
        try {
            // Side-effect: overwrite any duplicate functions
            const f = require(path.join(normalizedPath, fname))
            functions = Object.assign(functions, f)
        } catch (error) {
            console.warn(`Import error: ${error.message}, require '${fname}'`)
        }
    })
    return functions
}

function _importFile(pth) {
    let fstat
    try {
        fstat = fs.statSync(pth)
    } catch (error) {
        // Console.warn('Stat error:', pth, err.message)
    }

    if (fstat && fstat.isFile()) {
        try {
            return require(pth)
        } catch (error) {
            console.warn(`Import error: ${error.message}, require '${pth}'`)
        }
    }
}

function extractFunctionArgs(func) {
    /**
     * Helper that extracts all arguments from a function definition.
     */
    const lex = esprima.parseScript(func.toString(), {tokens: true, range: true})
    let min
    let max = 0
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
    const lex = esprima.parseScript(func.toString(), {comment: true, range: true})
    if (lex.comments.length === 0 || !lex.comments[0]) {
        return ''
    }

    const comment = lex.comments[0].value.trim()
    let final = ''
    for (let c of comment.split('\n')) {
        c = c.trim()
        if (!c || c === '*') {
            continue
        }

        final += c + '\n'
    }

    return final.trim()
}

module.exports = {documentJS}
