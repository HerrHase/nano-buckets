import { validate, required, isNumber } from 'https://deno.land/x/validasaur@0.15.0/mod.ts'

// create shema for validation
const BucketSchema = Schema({
    title: string.trim().normalize(),
    description: string.trim().normalize().optional(),
    type: Schema.either('a', 'b', 'c'),
    visiblity: Schema.either('a', 'b', 'c')
})

// create type and get validator from schema
export type bucketType = Type<typeof BucketSchema>
export const bucketValidator = BucketSchema.destruct()