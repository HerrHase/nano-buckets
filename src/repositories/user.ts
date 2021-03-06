import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { v4 } from 'https://deno.land/std@0.99.0/uuid/mod.ts'

import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { UserSchema } from './../schemas/user.ts'

/**
 *
 *
 */
class UserRepository
{
    db: any;

    constructor()
    {
        this.db = new Database<UserSchema>('./storage/database/users.json')
    }

    /**
     *
     */
    async create(data: any)
    {
        data._id = v4.generate()
        data.password = await bcrypt.hash(data.password)

        const user = await this.db.insertOne(data)

        return user
    }

    /**
     *
     */
    async update(id: any, data: any)
    {
        const user = await this.db.findOne({ '_id': id })

        // if password has changed hash password new
        if (user && user.password !== data.password) {
            data.password = await bcrypt.hash(data.password)
        }

        return await this.db.updateOne({ '_id': id }, data)
    }
}

export default UserRepository
