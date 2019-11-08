const execa = require('execa')
const {parse} = require('shell-quote')

async function cmd(_, {cmd, args = [], trim = false}) {
    // Shell?
    // timeout?
    if (typeof args === 'string') {
        args = parse(args)
    }

    if (args.length === 0 && cmd.includes(' ')) {
        ;[cmd, ...args] = parse(cmd)
    }

    const {stdout} = await execa(cmd, args)
    if (trim) {
        return stdout.trim()
    }

    return stdout
}

module.exports = {
    cmd,
}
