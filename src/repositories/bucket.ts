import { v4 } from 'https://deno.land/std@0.99.0/uuid/mod.ts'
import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { BucketSchema } from '../schemas/bucket.ts'

/**
 *
 *
 */
class BucketRepository
{
    /** */
    db: any

    /**
     *
     *
     */
    constructor()
    {
        this.db = new Database<BucketSchema>('./storage/database/buckets.json')
    }

    /**
     *
     *
     */
    async create(data: any)
    {
        data._id = v4.generate()
        return await this.db.insertOne(data)
    }

    /**
     *
     *
     */
    async update(data: any)
    {
        return await this.db.updateOne({ '_id': data._id }, data)
    }
}

export default BucketRepository
