import { invalid, Validity, Rule } from "https://deno.land/x/validasaur/mod.ts";
import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { UserSchema } from './../stores/user.ts'

/**
 *  search for key
 *
 *  @param  key
 *  @param  value
 *  @return
 */
export function uniqueUser(key: string): Rule {
    return async function uniqueRule(value: any): Promise<Validity> {

        console.log(value)

        if (typeof value !== 'string' && typeof value !== 'number') {
            return invalid('unique', { key, value });
        }

        const db = new Database<UserSchema>('./storage/database/users.json')
        const data = await db.findOne({
            [ key ]: value
        })

        if (data !== null) {
            return invalid('unique', { key, value });
        }
    }
}