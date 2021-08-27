import { validate, required, email } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { Router } from 'https://deno.land/x/opine@1.5.3/mod.ts'

const router = Router()

/**
 *  auth user, check for password in db
 *  and create jwt
 *
 *  @param  request
 *  @param  response
 *  @return
 */
router.post('/', async function(request, response)
{
    if (body.password) {
        body.password = escapeHtml(body.password)
    }

    const [ valid, errors ] = await validate(body, {
        email: [ required, email ],
        password: [ required, maxLength(64) ]
    });

    if (valid) {

        // check if user exists
        user = await userRepository.db.findOne({
            'email': body.email
        })

        if (user) {
            result = userRepository.verifyPassword(user, body.password)

            if (result) {
                response.cookie('auth-token', jwt)
            }
        }
    }

    response.redirect('/')
}
