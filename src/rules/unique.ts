import { invalid, Validity, Rule } from "https://deno.land/x/validasaur/mod.ts";

/**
 *  search for key
 *
 *  @param  key
 *  @param  value
 *  @return
 */
export function unique(key: string, value: string): Rule {
    return async function uniqueRule(value: any): Promise<Validity> {

        if (typeof value !== 'string' && typeof value !== 'number') {
            return invalid('unique', { value, table, column });
        }

        const data = await db.findOne({
            key: value
        })

        if (data !== null) {
            return invalid('unique', { value, table, column });
        }
    }
}