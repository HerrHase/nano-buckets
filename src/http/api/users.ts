import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import UserRepository from '../../repositories/user.ts'

import { validate, required, maxLength, isEmail } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { uuid } from '../../rules/uuid.ts'

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

    // @TODO check for permission of current user

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

    // @TODO check for permission of current user

    let user

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

/**
 *  update user
 *
 *  @param  request
 *  @param  response
 *  @return
 *
 */
router.put('/:id', async function(request, response)
{
    const body = request.body
    const userRepository = new UserRepository()

    // @TODO check for permission of current user

    let user

    const [ validUser, errorsUser ] = await validate(request.params, {
        'id': [ required, uuid ]
    })

    if (!validUser) {
        response.json({
            data: user
        })
    }

    const [ valid, errors ] = await validate(body, {
        email: [ isEmail, maxLength(255), required ],
        password: [ maxLength(64) ]
    })

    if (valid) {

        body._id = request.params.id
        user = await userRepository.update(body)

        // remove password
        // @TODO make sure repository can hide variables
        delete user.password
    }

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
router.delete('/:id', async function(request, response)
{
    const userRepository = new UserRepository()

    // @TODO check for permission of current user
    let user = false

    const [ valid, errors ] = await validate(request.params, {
        'id': [ required, uuid ]
    })

    if (valid) {
        user = userRepository.db.deleteOne({
            '_id': request.params.id
        })
    }

    response.json({
        data: user
    })
})

export default router