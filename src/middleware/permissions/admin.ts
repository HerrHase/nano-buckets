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
async function adminAllowedMiddleware(request: any, response: any, next: any)
{
    // if no session
    if (!response.locals.current) {
        response.send(401)
    }

    // if role is wrong
    if (response.locals.current.roles.indexOf('admin') === -1) {
        response.send(403)
    }

    next()
}