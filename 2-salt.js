const { scryptSync, randomBytes, timingSafeEqual } = require('crypto')
const { title, readLine } = require('./libs/console-utils')
const { run } = require('./libs/async-utils')

let users = []

function signup(email, password) {
    const salt = randomBytes(16).toString('hex')
    const hashedPassword = scryptSync(password, salt, 64).toString('hex')

    const user = {
        email,
        password: `${salt}:${hashedPassword}`
    }

    users.push(user)
    return user
}

function login(email, password) {
    const user = users.find(u => u.email == email)

    if (!user) return '❌ User not found!'

    const [ salt, key ] = user.password.split(':')
    const hashedBuffer = scryptSync(password, salt, 64)
    const keyBuffer = Buffer.from(key, 'hex')

    // TimingSaveEqual a security problem
    const match = timingSafeEqual(hashedBuffer, keyBuffer)

    return match
        ? '✔ Login success!'
        : '❌ Invalid password!'
}

async function main() {

    title(
        'SALT',
        'Is a more secure type of hash because a random string is added to it.'
    )
    
    // Register users

    signup('joao@email.com', 'joao123')
    signup('ze@email.com', 'ze123')
    signup('maria@email.com', 'maria123')

    // Login screen

    console.log('Login\n-------------------')

    const email = await readLine('E-mail')
    const password = await readLine('Password')
    
    const result = login(email, password)
    console.log(`\n${result}`)
}

run(main)