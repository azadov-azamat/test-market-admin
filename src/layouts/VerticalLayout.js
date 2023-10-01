import Layout from '@layouts/VerticalLayout'

import admin_nav from "@src/navigation/vertical/admin-navigation"

const VerticalLayout = props => {

    return (
        <Layout menuData={admin_nav} {...props}>
            {props.children}
        </Layout>
    )
}

export default VerticalLayout