const { publicEncrypt, privateDecrypt } = require('crypto')
const { privateKey, publicKey } = require('./libs/key-pair')
const { title, readLine } = require('./libs/console-utils')
const { run } = require('./libs/async-utils')

async function main() {
    title(
        'ASYMMETRIC KEYS',
        'Allows encript a data with a public key, but decript with a private key.'
    )

    const message = await readLine('Type the message')
    console.log(`\nOriginal:\n${message}\n`)

    const encryptedMessage = publicEncrypt(publicKey, Buffer.from(message))
    console.log(`Encrypted:\n${encryptedMessage.toString('hex')}\n`)

    const decryptedMessage = privateDecrypt(privateKey, encryptedMessage)
    console.log(`Decrypted:\n${decryptedMessage.toString('utf-8')}`)
}

run(main)