const execa = require('execa')
const {parse} = require('shell-quote')

async function cmd(_, {cmd, args = [], trim = false} = {}, {double = false} = {}) {
    /**
     * Execute a system command and return the output.
     */
    if (typeof args === 'string') {
        args = parse(args)
    }

    if (args.length === 0 && cmd.includes(' ')) {
        ;[cmd, ...args] = parse(cmd)
    }

    // Shell?
    // Timeout?
    const {stdout} = await execa(cmd, args)
    if (trim) {
        return stdout.trim()
    }

    if (double) {
        return `\n${stdout.trim()}\n`
    }

    return stdout
}

module.exports = {
    cmd,
}
