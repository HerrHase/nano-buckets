import { v4 } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { validate, required, isIn, maxLength } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'

import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { UserSchema } from './../../stores/user.ts'

import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

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
    const users = await userRepository.db.findAll()

    response.json({
        data: user
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
router.get('/:id', async function(request, response)
{
    const userRepository = new UserRepository()

    const [ valid, errors ] = await validate(request.params, {
        id: [ required, uuid ]
    })

    if (valid) {
        const user = await userRepository.db.findOne({
            '_id': request.params.id
        })

        if (!user) {
            response.setStatus(404)
        }

    } else {
        response.setStatus(405)
    }

    response.json({
        data: user
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

    const [ valid, errors ] = await validate(body, {
        email: [ email, required ]
    })

    if (valid) {
        user = await userRepository.create(body)
    }

    response.json({
        data: user
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.put('/:id', async function(request, response, next)
{
    const body = request.body
    const userRepository = new UserRepository()

    let user = false

    const [ valid, errors ] = await validate(body, {
        _id: [ required, uuid, exists ],
        email: [ email, required, unique ],
        password: [ maxLength(64) ],
        displayname: [ maxLength(128) ],
        role: [ array() ]
    })

    if (valid) {
        user = userRepository.update(body)
    }

    response.json({
        data: user
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 *
 */
router.delete('/:id', function(request, response)
{
    const userRepository = new UserRepository()
    let user = false

    const [ valid, errors ] = await validate(request.params, {
        '_id': [ required, uuid, exists ]
    })

    if (valid) {
        user = userRepository.db.deleteOne({
            '_id': request.params._id
        })
    }

    response.json({
        data: user
    })
})

export default router