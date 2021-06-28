import { Drash } from 'https://deno.land/x/drash@v1.4.4/mod.ts'
import { v4 } from 'https://deno.land/std@0.99.0/uuid/mod.ts'

import { Bucket as BucketSchema } from './src/schemas/bucket.ts'
import Schema, { Type, string, number, array } from 'https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts'

/**
 *
 *
 */
export class BucketResource extends Drash.Http.Resource
{
    // route
    static paths = ['/bucket/[:id?]']

    /**
     *  [GET description]
     *  @param  id [description]
     *  @return    [description]
     */
    public GET(id)
    {
        const db = new Database<BucketSchema>()
        const buckets = await db.findOne({
            '_id': id
        })

        this.response.body = bucket
        return this.response
    }

    /**
     *
     *
     */
    public POST()
    {
        const db = new Database<BucketSchema>()

        this.response.body = bucket
        return this.response
    }
}