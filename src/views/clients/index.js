import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getStores} from "../../redux/reducers/store"
import Client from './client'
import {Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap"

export default function Clients() {

    const dispatch = useDispatch()

    const {stores} = useSelector(state => state.stores)

    const [active, setActive] = useState(null)

    const toggle = tab => {
        if (active !== tab) {
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
                    <Client storeId={active}/>
                </TabPane>}
            </TabContent>
        </div>
    )
}