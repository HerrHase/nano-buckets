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
        'type': request.params.visiblity
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
router.get('/:uuid', function(request, response)
{
    response.render('bucket/form', {
        visiblities: visibilties.enums,
        types: types.enums
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.post('/', function(request, response, next)
{
    const body = request.body

    let typeValues = <any>[]
    let visiblityValues = <any>[]

    types.enums.forEach(function(type) {
        typeValues.push(String(type.value))
    })

    visibilties.enums.forEach(function(visiblity) {
        visiblityValues.push(String(visiblity.value))
    })

    // escape before validate
    if (body.title) {
        body.title = escapeHtml(body.title)
    }

    // escape before validate
    if (body.description) {
        body.description = escapeHtml(body.description)
    }

    // validate
    const [ valid, errors ] = await validate(body, {
        title: [ required, maxLength(255) ],
        description: [ required, maxLength(255) ],
        type: [ required, isIn(typeValues) ],
        visiblity: [ required, isIn(visiblityValues)]
    });

    if (valid) {
        const db = new Database<BucketSchema>('./storage/database/buckets.json')

        body._id = v4.generate()
        const bucket = await db.insertOne(body)

        response.redirect('/buckets/' + bucket._id)
    } else {
        response.redirect('/buckets/create')
    }
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.put('/:uuid', function(request, response, next)
{

})

/**
 *  delete single bucket
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.delete('/:uuid', async function(request, response, next)
{
    // check if uuid is valid
    if (!v4.validate(request.params.uuid)) {
        response.setStatus(404)
    }

    let result = false

    // getting database and search by uuid
    const db = new Database<BucketSchema>('./storage/database/buckets.json')
    const bucket = await db.deleteOne({ _id: request.params.uuid });

    // check if bucket is deleted
    if (bucket) {
        result = true
    }

    response.json({
        'success': result
    })
})

export default router