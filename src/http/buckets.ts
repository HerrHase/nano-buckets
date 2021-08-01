import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'
import bucketMiddleware from '../middleware/bucket.ts'

const router = Router()

// check for id and try load bucket
router.param('bucket_id', bucketMiddleware)

/**
 *  render single bucket
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.get('/:bucket_id', async function(request, response)
{
    response.render('bucket/single', {
        bucket: response.locals.bucket
    })
})

export default router