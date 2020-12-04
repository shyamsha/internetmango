// App Imports
import params from '../../../setup/config/params'
import User from '../../../modules/admin/User'

// Admin user routes
export const userList = {
  path: '/admin/users',
  component: User,
  auth: true,
  role: params.user.roles.admin
}