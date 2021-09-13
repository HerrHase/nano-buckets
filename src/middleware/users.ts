import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { validate, required } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { uuid } from '../rules/uuid.ts'

import UserRepository from '../repositories/user.ts'
import { uuidSerialize } from '../serializers/uuid.ts'

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
    // clean id
    request.params.id = uuidSerialize(request.params.id)

    const [ valid, errors ] = await validate(request.params, {
        id: [ uuid ]
    })

    // if invalid send 422
    if (!valid) {
        response.send(422)
    }

    // getting
    const userRepository = new UserRepository()
    const user = await userRepository.db.findOne({ '_id': request.params.id })

    // if not exists send 404
    if (!user) {
        response.send(404)
    }

    response.locals.user = user
    next()
}

export default usersMiddleware