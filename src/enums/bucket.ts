import Enum from 'https://deno.land/x/enum@v3.0.4/index.js'

// visibilties are a template for the roles
export const visibilties = new Enum([
    'PUBLIC',
    'COMMUNITY',
    'PRIVATE'
], { freeze: true, name: 'visibilties' })

// types define the structure of a bucket
// kanban: columns with title
// masonry: wall with columns and each note can have different hight
// blog: all notes will be organized in one column
export const types = new Enum([
    'KANBAN',
    'MASONRY',
    'BLOG'
], { freeze: true, name: 'types' })