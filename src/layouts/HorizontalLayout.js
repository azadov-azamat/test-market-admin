// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'

// ** Menu Items Array
import admin_nav from "@src/navigation/vertical/admin-navigation"

const HorizontalLayout = props => {

    return (
        <Layout menuData={admin_nav} {...props}>
            {props.children}
        </Layout>
    )
}

export default HorizontalLayout
