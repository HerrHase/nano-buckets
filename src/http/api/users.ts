import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import UserRepository from '../../repositories/user.ts'

import { validate, required, maxLength, isEmail } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'

const router = Router()


/**
 *  get all users
 *
 *  @param  request
 *  @param  response
 *  @return
 *
 */
router.get('/', async function(request, response)
{
    const userRepository = new UserRepository()
    const users = await userRepository.db.findMany()

    response.json({
        data: users
    })
})

/**
 *  create user
 *
 *  @param  request
 *  @param  response
 *  @return
 *
 */
router.post('/', async function(request, response)
{
    const body = request.body
    const userRepository = new UserRepository()

    let user = []

    const [ valid, errors ] = await validate(body, {
        email: [ isEmail, maxLength(255), required ],
        password: [ required, maxLength(64) ]
    })

    if (valid) {
        user = await userRepository.create(body)

        // remove password
        // @TODO make sure repository can hide variables 
        delete user.password
    }

    response.json({
        data: user
    })
})

export default router