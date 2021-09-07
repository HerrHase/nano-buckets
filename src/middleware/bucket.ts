import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { validate, required } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { uuid } from '../rules/uuid.ts'

import BucketRepository from '../repositories/bucket.ts'
import uuidSerialize from '../serializers/uuid.ts'

const router = Router()

/**
 *  check every route for single bucket
 *
 *  @param  request
 *  @param  response
 *  @param  next
 *  @return
 */
async function bucketMiddleware(request: any, response: any, next: any)
{
    // clean id
    request.params.bucket_id = uuidSerialize(request.params.bucket_id)

    const [ valid, errors ] = await validate(request.params, {
        bucket_id: [ uuid ]
    })

    // if invalid send 404
    if (!valid) {
        response.send(422)
    }

    // getting
    const bucketRepository = new BucketRepository()
    const bucket = await bucketRepository.db.findOne({ '_id': request.params.bucket_id })

    // if not exists send 404
    if (!bucket) {
        response.send(404)
    }

    response.locals.bucket = bucket
    next()
}

export default bucketMiddleware