import { invalid, Validity } from 'https://deno.land/x/validasaur@v0.15.0/mod.ts'
import { v4 } from 'https://deno.land/std@0.99.0/uuid/mod.ts'

/**
 *  validate uuid v4
 *
 *  @param  value
 *  @return <Promise>
 *
 */
export async function uuid(value: any): Promise<Validity> {
    if (typeof value !== 'string') {
        return invalid('uuid', { value: value })
    }

    if (!v4.validate(value)) {
        return invalid('uuid', { value: value })
    }
}