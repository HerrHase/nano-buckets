import 'https://deno.land/x/dotenv@v2.0.0/load.ts'
import {
    opine,
    serveStatic,
    json,
    urlencoded
} from 'https://deno.land/x/opine@1.5.3/mod.ts'
import { dirname, join, createError } from "https://deno.land/x/opine@1.5.3/deps.ts";
import { renderFile } from 'https://deno.land/x/eta@v1.12.2/mod.ts'

// getting routes
import index from './src/http/index.ts'
import bucket from './src/http/bucket.ts'
import bucketApi from './src/http/api/bucket.ts'

const app = opine()
const __dirname = dirname(import.meta.url)

//
app.use(json()); // for parsing application/json
app.use(urlencoded()); // for parsing application/x-www-form-urlencoded

// adding static files
app.use(serveStatic(join(__dirname, 'public')))

// adding eta as view engine
app.engine('.html', renderFile)
app.set('views', join(__dirname, 'resources/views'))
app.set('view engine', 'html')

// adding http classes for routes
app.use('/', index)
app.use('/bucket', bucket)
app.use('/api/bucket', bucketApi)
app.use((request, response, next) => {
    response.setStatus(404)
    response.render('errors/404')
})

// let it rain
app.listen(Number(Deno.env.get('SERVER_PORT')))
console.log('running on ' + Deno.env.get('SERVER_PORT'))

