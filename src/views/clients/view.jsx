import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getClientById} from "../../redux/reducers/user"
import {Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap"
import {getStores} from "../../redux/reducers/store"
import DateFormatClock from "../../components/DateFormatClock"
import {handleSwitchPayType} from "../../utility/Utils"
import qs from "qs"
import {getDebtsList} from "../../redux/reducers/debt"
import SaleComponent from "../sales"

export default function ViewClient() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {client} = useSelector(state => state.users)

    const [active, setActive] = useState(null)

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    useEffect(() => {
        dispatch(getClientById(id))
    }, [id])

    useEffect(() => {
        dispatch(getStores())
    }, [])

    useEffect(() => {
        if (location.pathname !== `/administrator/client/${id}`) {
            history.push({
                search: ""
            })

            dispatch({
                type: 'app/getClientById/fulfilled',
                payload: {
                    data: null
                }
            })
        }

    }, [location.pathname])

    return (
        <div>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-center">
                        <span><b>{client?.clientName} / {client?.clientPhone}</b> ga tegishli hisobot</span>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Nav className="justify-content-center" tabs>
                        <NavItem>
                            <NavLink
                                active={active === "1"}
                                onClick={() => {
                                    toggle("1")
                                }}
                            >
                                Sotuvlar bo'limi
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === "2"}
                                onClick={() => {
                                    toggle("2")
                                }}
                            >
                                Qarzlar bo'limi
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === "3"}
                                onClick={() => {
                                    toggle("3")
                                }}
                            >
                                To'lovlar bo'limi
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardBody>
            </Card>
            <TabContent className="py-50" activeTab={active}>
                <TabPane tabId={"1"}>
                    <SaleComponent clientId={id}/>
                </TabPane>
                <TabPane tabId={"2"}>
                    <DebtComponent/>
                </TabPane>
                <TabPane tabId={"3"}>
                    <PaymentComponent/>
                </TabPane>
            </TabContent>
        </div>
    )
}

export const DebtComponent = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {client} = useSelector(state => state.users)
    const {stores} = useSelector(state => state.stores)
    const {debts} = useSelector(state => state.debts)
    const [amount, setAmount] = useState(0)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (client) {
            history.push({
                search: qs.stringify({
                    filter: JSON.stringify({
                        clientId: client?.id
                    })
                })
            })
        }
    }, [client])

    useEffect(() => {
        if (location.search) {
            dispatch(getDebtsList({...query}))
        }

        return () => {
            dispatch({
                type: 'debt/getDebtById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [location.search])

    useEffect(() => {
        let num = 0
        debts.forEach(item => {
            num += item.debt
        })
        setAmount(num)
    }, [debts])

    return (
        <div>
            <Row sm={2} md={3} xl={4} className={"row-cols-1"}>
                {debts?.map((item, ind) => {
                    return (
                        <Col key={ind}>
                            <Card className={item?.debt < 0 ? 'border border-danger' : 'border border-success'}>
                                <CardBody className={`d-flex flex-column gap-1`}>
                                    <div className="">
                                        <span><b>Do'kon: </b> {stores?.find(val => val.id === item?.storeId)?.storeName}</span>
                                    </div>
                                    <div className="">
                                        <span><b>Savdo sanasi: </b> <DateFormatClock
                                            current_date={item?.createdAt}/></span>
                                    </div>
                                    <div className="">
                                        <span><b>Summa: </b> {item?.debt} sum</span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <Row>
                <Col className={"col-12"}>
                    <Card>
                        <CardBody className={"d-flex justify-content-between align-items-center"}>
                            <div className="w-auto"><b>Jami:</b> {amount} sum</div>
                            {amount < 0 && <div className="text-danger">Qarzdor</div>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export const PaymentComponent = () => {
    const {client} = useSelector(state => state.users)
    return (
        <Row sm={2} md={3} xl={4} className={"row-cols-1"}>
            {client?.payments?.map((item, ind) => {
                return (
                    <Col key={ind}>
                        <Card>
                            <CardBody className={"d-flex flex-column gap-1"}>
                                {/*<div class="">*/}
                                {/*    <span><b>Do'kon: </b> {stores?.find(val => val.id === item?.storeId)?.storeName}</span>*/}
                                {/*</div>*/}
                                <div className="">
                                        <span><b>To'lov sanasi: </b> <DateFormatClock
                                            current_date={item?.createdAt}/></span>
                                </div>
                                <div className="">
                                    <span><b>To'lov summasi: </b> {item?.paymentAmount} sum</span>
                                </div>
                                <div className="">
                                    <span><b>To'lov turi: </b> {handleSwitchPayType(item?.paymentType)}</span>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}
// export const AmountComponent = ({saleId}) => {
//
//     const {client} = useSelector(state => state.clients)
//     const [amount, setAmount] = useState()
//
//     useEffect(() => {
//         let num = 0
//         const datas = client?.debts?.filter(item => item?.saleId === saleId)
//
//         for (const data of datas) {
//             num += data?.debt
//         }
//
//         setAmount(num)
//     }, [])
//
//     return (
//         <span>{amount} sum</span>
//     )
// }