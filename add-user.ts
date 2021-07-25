import 'https://deno.land/x/dotenv@v2.0.0/load.ts'
import Ask from 'https://deno.land/x/ask@1.0.6/mod.ts'

import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { UserSchema } from './src/stores/user.ts'

import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'

// create ask for promt
const ask = new Ask()

const user = <UserSchema>{ is_admin: false };

// getting email for user
const { email } = await ask.input({
    name: 'email',
    message: 'Email:',
    validate: (value) => {
        return (value) ? true : false
    }
})

user.email = email


// getting password for user
const { password } = await ask.input({
    name: 'password',
    message: 'Password:',
    validate: (value) => {
        return (value) ? true : false
    }
})

const { passwordRepeat } = await ask.input({
    name: 'passwordRepeat',
    message: 'Repeat Password:',
    validate: (value) => {
        let result = false

        if (value === password) {
            result = true
        } else {
            console.log('Password not match')
        }

        return result
    }
})

user.password = password


// is admin
const { isAdmin } = await ask.input({
    name: 'admin',
    message: 'Admin (n):',
    validate: (value) => {
        let result = false

        if (value === 'n' || value === 'y') {
            result = true
        } else {
            console.log('Ony (y)es and (n)o allowed')
        }

        return result
    }
})

user.is_admin = isAdmin

// getting schema for users
const db = new Database<UserSchema>('./storage/database/users.json')

// search for user by email
const userExists = await db.findOne({ email: email })

if (userExists) {
    console.log('User already exists')
    Deno.exit(1);
}

// hash password
user.password = await bcrypt.hash(user.password);

await db.insertOne(user)