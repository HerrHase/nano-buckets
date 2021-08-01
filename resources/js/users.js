import * as riot from 'riot'

import AppUsers from './components/users.riot'
import AppUsersForm from './components/users/form.riot'

// register components for buckets
riot.register('app-users', AppUsers)
riot.mount('app-users')

riot.register('app-users-form', AppUsersForm)
riot.mount('app-users-form')