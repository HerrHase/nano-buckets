import { v4 } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { validate, required, maxLength, isEmail } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { uniqueUser } from '../../rules/uniqueUser.ts'

import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

import usersMiddleware from '../../middleware/users.ts'
import UserRepository from '../../repositories/user.ts'

const router = Router()

// check for id and load user
router.param('id', usersMiddleware)

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

    // @TODO check for permission of current user

    response.json({
        data: users
    })
})

/**
 *  get user
 *
 *  @param  request
 *  @param  response
 *  @return
 *
 */
router.get('/:id', async function(request, response)
{
    response.json({
        data: response.locals.user
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

    let user

    const [ valid, errors ] = await validate(body, {
        email: [ isEmail, required, uniqueUser('email') ],
        password: [ maxLength(64) ],
        displayname: [ maxLength(128) ]
    })

    if (valid) {
        user = await userRepository.create(body)
    } else {
        response.setStatus(422)
        response.json({
            'errors': errors
        })
    }

    response.setStatus(201)
    response.json({
        data: user
    })
})

/**
 *  update user
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.put('/:id', async function(request, response, next)
{
    const body = request.body
    const userRepository = new UserRepository()

    let user

    const [ valid, errors ] = await validate(body, {
        email: [ isEmail, required, uniqueUser('email') ],
        password: [ maxLength(64) ],
        displayname: [ maxLength(128) ]
    })

    if (valid) {
        user = await userRepository.update(response.locals.user._id, body)
    } else {
        response.setStatus(422)
        response.json({
            'errors': errors
        })
    }

    response.setStatus(201)
    response.json({
        data: user
    })
})

/**
 *  delete single user
 *
 *  @param  request
 *  @param  response
 *  @return
 *
 */
router.delete('/:id', function(request, response)
{
    const userRepository = new UserRepository()

    // delete user
    const user = userRepository.db.deleteOne({
        '_id': response.locals.user._id
    })

    // send status
    response.send(204)
})

export default router