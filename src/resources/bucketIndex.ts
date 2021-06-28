import { Drash } from 'https://deno.land/x/drash@v1.4.4/mod.ts'
import { v4 } from 'https://deno.land/std@0.99.0/uuid/mod.ts'

import { Bucket as BucketSchema } from './src/schemas/bucket.ts'

/**
 *
 *
 */
export class BucketResource extends Drash.Http.Resource
{
    // route
    static paths = ['/buckets']

    //
    public GET()
    {
        const db = new Database<BucketSchema>()
        const buckets = await db.findMany()

        this.response.body = buckets
        return this.response
    }
}