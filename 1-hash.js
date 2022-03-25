const { createHash } = require('crypto')
const { title, readLine } = require('./libs/console-utils')
const { run } = require('./libs/async-utils')

// Create a string hash

function hash(input) {
    return createHash('sha256').update(input).digest('base64')
}

async function main() {

    title(
        'HASH',
        'Hash is a one way encriptation method, it isn\'t possible to decrypt the data.'
    )

    // Compare two hashed passwords

    const password1 = await readLine('Password 1')
    const hash1 = hash(password1)
    console.log(`${hash1}\n`)

    // ... some time later

    const password2 = await readLine('Password 2')
    const hash2 = hash(password2)
    console.log(`${hash2}\n`)

    // Verify if it matches

    const match = hash1 == hash2
    console.log(match 
        ? '✔ Good password'
        : '❌ Password does not match')
}

run(main)