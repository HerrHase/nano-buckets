import { invalid, Validity, Rule } from "https://deno.land/x/validasaur/mod.ts";

/**
 *
 *  @param  id
 *  @return
 */
export function exists(id: string): Rule {
    return async function existsRule(value: any): Promise<Validity> {

        if (typeof value !== 'string' && typeof value !== 'number') {
            return invalid('exists', { value, table, column });
        }

        const data = await db.findOne({
            key: value
        })

        if (data !== null) {
            return invalid('unique', { value, table, column });
        }
    }
}