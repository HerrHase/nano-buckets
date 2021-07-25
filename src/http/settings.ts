import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

const router = Router()

/**
 *  render template for settings
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.get('/', function(request, response, next)
{
    response.render('settings')
})

export default router
