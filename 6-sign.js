const { createSign, createVerify } = require('crypto')
const { privateKey, publicKey } = require('./libs/key-pair')
const { title, readLine } = require('./libs/console-utils')
const { run } = require('./libs/async-utils')

async function main() {
    title(
        'SIGH',
        'Allows you to sign a message to guaratee its authenticity.'
    )

    const originalMessage = await readLine('Original message')
    const receivedMessage = await readLine('Received message')

    // Sign

    const signer = createSign('rsa-sha256')
    signer.update(originalMessage)

    const signature = signer.sign(privateKey, 'hex')

    // Verify

    const verifier = createVerify('rsa-sha256')
    verifier.update(receivedMessage)

    const isVerified = verifier.verify(publicKey, signature, 'hex')

    console.log(
        isVerified
            ? '\n✔ The message is authentic!'
            : '\n❌ The message was corrupted!'
    )
}

run(main)