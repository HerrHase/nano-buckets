import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

import { v4 } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { validate, required, isIn, maxLength } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'

import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { BucketSchema } from './../../stores/bucket.ts'

import { visibilties, types } from './../../enums/bucket.ts'

const router = Router()

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.get('/', async function(request, response)
{
    const db = new Database<BucketSchema>('./storage/database/buckets.json')
    const buckets = await db.findMany({
        "type" : "1"
    })

    response.json({
        data: buckets
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.get('/:uuid', function(request, response) {

})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.post('/', function(request, response, next) {

})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.put('/:uuid', function(request, response, next) {

})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.delete('/:uuid', async function(request, response, next)
{
    if (!v4.validate(request.params.uuid)) {
        response.setStatus(404)
    }

    let result = false

    const db = new Database<BucketSchema>('./storage/database/buckets.json')
    const bucket = await db.deleteOne({ _id: request.params.uuid });

    if (bucket) {
        result = true
    }

    response.json({
        'success': result
    })
})

export default router