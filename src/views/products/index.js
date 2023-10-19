import React, {useEffect, useState} from 'react'
import {Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from 'react-router-dom'
import {getStores} from "../../redux/reducers/store"
import Product from "./product"

export default function Products() {

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
                    <Product storeId={active}/>
                </TabPane>}
            </TabContent>
        </div>
    )
}