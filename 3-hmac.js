const { createHmac } = require('crypto')
const { title, readLine } = require('./libs/console-utils')
const { run } = require('./libs/async-utils')

async function main() {

    title(
        'HMAC',
        'Is a hash encrypted using a password.'
    )

    const message = await readLine('Message')
    const key = await readLine('Key 1')
    const hmac = createHmac('sha256', key).update(message).digest('hex')

    console.log(hmac)

    const key2 = await readLine('Key 2')
    const hmac2 = createHmac('sha256', key2).update(message).digest('hex')
    
    console.log(hmac2)
    
}

run(main)