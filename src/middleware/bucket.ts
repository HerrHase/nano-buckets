import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { validate, required } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { uuid } from '../rules/uuid.ts'

import BucketRepository from '../repositories/bucket.ts'

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
    // max for id
    request.params.bucket_id = request.params.bucket_id.slice(0, 128)

    // only dash, numbers & letters are allowed
    request.params.bucket_id = request.params.bucket_id.replace(/[^a-z0-9-]/gi, '')

    const [ valid, errors ] = await validate(request.params, {
        bucket_id: [ uuid ]
    })

    // if invalid send 404
    if (!valid) {
        response
            .setStatus(404)
            .send()
    }

    // getting
    const bucketRepository = new BucketRepository()
    const bucket = await bucketRepository.db.findOne({ '_id': request.params.bucket_id })

    // if not exists send 404
    if (!bucket) {
        response
            .setStatus(404)
            .send()
    }

    response.locals.bucket = bucket
    next()
}

export default bucketMiddleware