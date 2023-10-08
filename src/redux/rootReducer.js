// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './reducers/auth'
import users from './reducers/user'
import stores from './reducers/store'
import addresses from './reducers/address'
import products from './reducers/product'
import files from './reducers/file'
import payments from './reducers/payment'
import firms from './reducers/firms'
import currencies from './reducers/currency'
import sales from './reducers/sale'
import debts from './reducers/debt'

const rootReducer = {
  auth,
  navbar,
  layout,
  users,
  addresses,
  products,
  stores,
  files,
  payments,
  firms,
  currencies,
  debts,
  sales
}

export default rootReducer
