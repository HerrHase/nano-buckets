import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { v4 } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { validate, required, isIn, maxLength } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { escapeHtml } from "https://deno.land/x/escape@1.3.0/mod.ts"

import { BucketSchema } from './../stores/bucket.ts'
import { visibilties, types } from './../enums/bucket.ts'

const router = Router()

/**
 *  render template for form
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.get('/create', function(request, response, next)
{
    response.render('bucket/form', {
        visiblities: visibilties.enums,
        types: types.enums
    })
})

/**
 *  render template for form
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.post('/store', async function(request, response, next)
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

    if (body.description) {
        body.description = escapeHtml(body.description)
    }

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

        response.redirect('/bucket/' + bucket._id)
    } else {
        response.redirect('/bucket/create')
    }
})

/**
 *  render template for form
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.get('/:id', async function(request, response, next)
{
    if (!v4.validate(request.params.id)) {
        response.setStatus(404)
    }

    const db = new Database<BucketSchema>('./storage/database/buckets.json')
    const bucket = await db.findOne({ '_id': request.params.id })

    if (!bucket) {
        response.setStatus(404)
    }

    response.render('bucket/single', {
        bucket: bucket
    })
})

export default router