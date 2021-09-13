import * as riot from 'riot'

import AppUsers from './components/users.riot'
import AppUsersForm from './components/users/form.riot'
import AppSidebarButton from './components/sidebar-button.riot'
import AppLoading from './components/loading.riot'

// register components for buckets
riot.register('app-users', AppUsers)
riot.mount('app-users')

riot.register('app-users-form', AppUsersForm)
riot.mount('app-users-form')

riot.register('app-sidebar-button', AppSidebarButton)
riot.mount('app-sidebar-button')

riot.register('app-loading', AppLoading)
riot.mount('app-loading')