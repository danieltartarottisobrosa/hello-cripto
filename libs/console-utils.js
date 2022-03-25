const util = require('util')

const line = '-'.repeat(80)

const readLine = util.promisify((label, cb) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(`${label}: `, value => {
        readline.close();
        cb(null, value)
    });
})

function title(title, subtitle) {
    console.log(`\n${line}`)
    console.log(`${title}\n`)
    if (subtitle) console.log(subtitle)
    console.log(`${line}\n`)
}

module.exports = {
    readLine,
    title,
    line
}