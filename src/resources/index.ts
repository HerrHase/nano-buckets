import { Drash } from 'https://deno.land/x/drash@v1.4.4/mod.ts'

/**
 *
 *
 */
export class IndexResource extends Drash.Http.Resource
{
    // route
    static paths = ['/']

    //
    public GET()
    {
        this.response.body = 'Hallo'
        return this.response
    }
}