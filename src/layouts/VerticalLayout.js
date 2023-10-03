import Layout from '@layouts/VerticalLayout'

import admin_nav from "@src/navigation/vertical/admin-navigation"
import {useDispatch} from "react-redux"
import {useHistory, useLocation} from "react-router-dom"
import {useEffect} from "react"
import {getToken} from "../utility/Utils"
import {getUserMe} from "../redux/reducers/auth"
import {unwrapResult} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import {DefaultRoute} from "../router/routes"

const VerticalLayout = props => {

    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (getToken()) {
            dispatch(getUserMe()).then(unwrapResult)
                .catch(e => {
                    if (e.response.status === 401) {
                        toast.error("Avtorizatsiyasiz ruhsat etilmaydi!")
                        history.push(DefaultRoute)
                    }
                })
        }
    }, [pathname])

    return (
        <Layout menuData={admin_nav} {...props}>
            {props.children}
        </Layout>
    )
}

export default VerticalLayout