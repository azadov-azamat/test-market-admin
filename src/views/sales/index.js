import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import React, {useEffect, useState} from "react"
import {Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap"
import {getStores} from "../../redux/reducers/store"
import SaleListComponent from "./sale"

export default function SaleComponent({clientId}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const {stores} = useSelector(state => state.stores)

    const [active, setActive] = useState(null)

    const toggle = tab => {
        if (active !== tab) {
            history.push({
                search: ''
            })
            setActive(tab)
        }
    }

    useEffect(() => {
        dispatch(getStores())
    }, [])

    return (
        <div>
            <Card>
                <CardBody>
                    <Nav className="justify-content-center" tabs>
                        {
                            stores.map(({
                                            storeName,
                                            id
                                        }, ind) => {
                                    return (
                                        <NavItem key={ind}>
                                            <NavLink
                                                active={active === id}
                                                onClick={() => {
                                                    toggle(id)
                                                }}
                                            >
                                                {storeName}
                                            </NavLink>
                                        </NavItem>
                                    )
                                }
                            )
                        }
                    </Nav>
                </CardBody>
            </Card>
            <TabContent className="py-50" activeTab={active}>
                {active !== null && <TabPane tabId={active}>
                    <SaleListComponent storeId={active} clientId={clientId}/>
                </TabPane>}
            </TabContent>
        </div>
    )
}