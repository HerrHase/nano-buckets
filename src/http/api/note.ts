import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

const router = Router()

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.post('/:bucket_id', function(request, response)
{
    const [ valid, errors ] = await validate(body, {
        title: [ maxLength(255) ],
        content: [ maxLength(10922) ],
        tags: [ ],
        url: isUrl
    })
})

/**
 *
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.put('/:bucket_id/:id', function(request, response, next)
{

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