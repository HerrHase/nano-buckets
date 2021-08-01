import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { v4 } from 'https://deno.land/std@0.99.0/uuid/mod.ts'

import UserRepository from './../repositories/user.ts'

export default async function(request: any, response: any, next: any)
{
    request.user = false

    try {
        const token = request.headers.authorization.split(' ')[1];

        // if v4 is not validate next
        if (!v4.validate(token)) {
            next()
        }

        // search for user with session id
        const userRepository = new UserRepository()
        const user = await userRepository.db.findOne({
            'session_id': token
        })

        if (user) {
            response.locals.user = user
        }
    } catch(error) {

    }

    next()
}