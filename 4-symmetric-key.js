const { createCipheriv, randomBytes, createDecipheriv } = require('crypto')
const { title, readLine } = require('./libs/console-utils')
const { run } = require('./libs/async-utils')

async function main() {
    title(
        'SYMMETRIC KEY',
        'Allows encript and decript data with the same key.'
    )

    const message = await readLine('Type the message')
    console.log(`\nOriginal:\n${message}\n`)

    const key = randomBytes(32)
    const iv = randomBytes(16)

    // Encrypt data

    const cipher = createCipheriv('aes256', key, iv)    
    const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex')
    console.log(`Encrypted:\n${encryptedMessage.toString('utf-8')}\n`)

    // Decrypt data

    const decipher = createDecipheriv('aes256', key, iv)
    const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8')
    console.log(`Decrypted:\n${decryptedMessage.toString('utf-8')}`)
}

run(main)