import Schema, { Type, string, number, array } from 'https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts'

// create shema for validation
const UserSchema = Schema({
    username: string.trim().normalize(),
    password: string.normalize(),
    email: Schema.email()
})

// create type and get validator from schema
type User = Type<typeof UserSchema>
const validator = UserSchema.destruct()

export default validator