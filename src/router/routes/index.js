import {lazy} from 'react'
import {TOKEN} from "../../utility/Utils"

// ** Document title
const TemplateTitle = 'magazine-admin'

// ** Default Route
const DefaultRoute = '/login'

// const token = localStorage.getItem(TOKEN) || ""

// ** Merge Routes
const Routes = [
    {
        path: '/login',
        component: lazy(() => import('../../views/authentication/LoginBasic')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/administrator/users',
        component: lazy(() => import('../../views/users')),
        exact: true
    },
    {
        path: '/administrator/stores',
        component: lazy(() => import('../../views/stores')),
        exact: true
    },
    {
        path: '/administrator/addresses',
        component: lazy(() => import('../../views/addresses')),
        exact: true
    },
    {
        path: '/administrator/products',
        component: lazy(() => import('../../views/products')),
        exact: true
    },
    {
        path: '/administrator/clients',
        component: lazy(() => import('../../views/clients')),
        exact: true
    },
    {
        path: '/administrator/client/:id',
        component: lazy(() => import('../../views/clients/view')),
        exact: true,
        meta: {
            navLink: '/administrator/clients'
        }
    }
]

export {DefaultRoute, TemplateTitle, Routes}
