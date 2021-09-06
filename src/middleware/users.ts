import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { validate, required } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { uuid } from '../rules/uuid.ts'

import UserRepository from '../repositories/user.ts'

const router = Router()

/**
 *  check route for user if parameter is
 *
 *  @param  request
 *  @param  response
 *  @param  next
 *  @return
 *  
 */
async function usersMiddleware(request: any, response: any, next: any)
{
    // max for id
    request.params.id = request.params.id.slice(0, 128)

    // only dash, numbers & letters are allowed
    request.params.id = request.params.id.replace(/[^a-z0-9-]/gi, '')

    const [ valid, errors ] = await validate(request.params, {
        id: [ uuid ]
    })

    // if invalid send 404
    if (!valid) {
        response
            .setStatus(404)
            .send()
    }

    // getting
    const userRepository = new UserRepository()
    const user = await userRepository.db.findOne({ '_id': request.params.id })

    // if not exists send 404
    if (!user) {
        response
            .setStatus(404)
            .send()
    }

    response.locals.user = user
    next()
}

export default usersMiddleware