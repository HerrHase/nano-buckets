import { v4 } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { validate, required, isIn, maxLength } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'

import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { BucketSchema } from './../../stores/bucket.ts'
import { NoteSchema } from './../../stores/note.ts'

import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

const router = Router()

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.post('/:bucket_id', async function(request, response)
{
    const body = request.body

    const [ valid, errors ] = await validate(body, {
        title: [ maxLength(255) ],
        content: [ maxLength(10922) ]
    })

    if (valid) {
        const noteRepository = new NoteRepository(request.bucket._id)
        note = await db.insertOne(body)
    }

    response.json({
        data: note
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.put('/:bucket_id', async function(request, response, next)
{
    const body = request.body

    let note

    // check if uuid is valid
    if (!v4.validate(request.params.bucket_id)) {
        response.setStatus(404)
    }

    // check if bucket exists
    const bucketDb = new Database<BucketSchema>('./storage/database/buckets.json')
    const bucket = await bucketDb.findOne({ _id: request.params.bucket_id })

    if (!bucket) {
        response.setStatus(404)
    }

    const [ valid, errors ] = await validate(body, {
        title: [ maxLength(255) ],
        content: [ maxLength(10922) ]
    })

    if (valid && bucket) {

        // getting database and search by uuid
        const db = new Database<NoteSchema>('./storage/database/' + bucket._id + '.json')
        note = await db.updateOne({ _id: body._id }, body)
    }

    response.json({
        data: note
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.delete('/:bucket_id/:id', function(request, response, next)
{

})

export default router