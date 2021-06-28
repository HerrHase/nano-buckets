import { Database } from 'https://deno.land/x/aloedb/mod.ts';

class BaseStore
{
    construct()
    {
        this.db = new Database<('./storage/database/' + this.name + '.json')
    }

    uuid()
    {

    }
}