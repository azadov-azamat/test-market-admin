// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './reducers/auth'
import users from './reducers/user'
import stores from './reducers/store'
import addresses from './reducers/address'
import products from './reducers/product'
import files from './reducers/file'

const rootReducer = {
  auth,
  navbar,
  layout,
  users,
  addresses,
  products,
  stores,
  files
}

export default rootReducer
