import * as riot from 'riot'

import AppBuckets from './components/buckets.riot'

// register components for buckets
riot.register('app-buckets', AppBuckets)
riot.mount('app-buckets')