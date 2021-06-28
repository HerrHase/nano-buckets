import Schema, { Type, string, number, array } from 'https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts'

// create shema for validation
const NoteSchema = Schema({
    title: string.trim().normalize(),
    description: string.trim().normalize().optional(),
    type: Schema.either('a', 'b', 'c'),
    visiblity: Schema.either('a', 'b', 'c')
})

// create type and get validator from schema
type Note = Type<typeof NoteSchema>
const validator = NoteSchema.destruct()

export default validator