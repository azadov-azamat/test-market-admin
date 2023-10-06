import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getClientById} from "../../redux/reducers/user"
import {Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap"
import {getStores} from "../../redux/reducers/store"
import DateFormatClock from "../../components/DateFormatClock"
import {BASE_URL, handleSwitchPayType} from "../../utility/Utils"
import {getSales} from "../../redux/reducers/sale"
import qs from "qs"
import {HiQrCode} from "react-icons/hi2"
import {getDebtsList} from "../../redux/reducers/debt"

export default function ViewClient() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.users)

    console.log(user)
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

    return (
        <div>
            <Card>
                <CardBody>
                    <div class="d-flex justify-content-center">
                        <span><b>{user?.clientName} / {user?.clientPhone}</b> ga tegishli hisobot</span>
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
                    <SaleComponent/>
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

export const SaleComponent = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {user} = useSelector(state => state.users)
    const {stores} = useSelector(state => state.stores)
    const {sales} = useSelector(state => state.sales)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (user) {
            history.push({
                search: qs.stringify({
                    filter: JSON.stringify({
                        clientId: user?.id
                    })
                })
            })
        }
    }, [user])

    useEffect(() => {
        if (location.search) {
            dispatch(getSales({...query}))
        }

        return () => {
            dispatch({
                type: 'sale/getSaleById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [location.search])

    return (
        <Row md={2} xl={3} className={"row-cols-1"}>
            {sales?.map((item, ind) => {
                return (
                    <Col key={ind}>
                        <Card className={"position-relative"}>
                            <CardBody className={"d-flex flex-column gap-1"}>
                                <div class="">
                                    <span><b>Do'kon: </b> {stores?.find(val => val.id === item?.storeId)?.storeName}</span>
                                </div>
                                <div class="">
                                        <span><b>Savdo sanasi: </b> <DateFormatClock
                                            current_date={item?.createdAt}/></span>
                                </div>
                                <div class="">
                                    <span><b>Umumiy savdo narxi: </b> {item?.saleMainPrice} sum</span>
                                </div>
                                <div class="">
                                    <span><b>Savdo narxi (chegirma): </b> {item?.saleSoldPrice} sum</span>
                                </div>
                                <div class="">
                                    <span><b>Sharx: </b> {item?.comment}</span>
                                </div>
                                <div class="">
                                    <div><b>Sotilgan mahsulotlar: </b> {item?.saleDebt && <span
                                        className={"text-white rounded fw-light font-small-2 px-1 bg-danger"}>Qarz savdo</span>}</div>
                                    {item?.soldproducts?.length > 0 && <div className={""}>
                                        <div class="w-100 d-flex">
                                            <b className={"w-50"}>Nomi</b>
                                            <b className={"w-25"}>Narxi</b>
                                            <b className={"w-25"}>Birligi</b>
                                        </div>
                                        {
                                            item?.soldproducts?.map((pr, i) => (
                                                <div className="w-100 d-flex" key={i}>
                                                    <span className={"w-50"}>{pr?.soldProductName}</span>
                                                    <span className={"w-25"}>{pr?.soldPrice} sum</span>
                                                    <span className={"w-25"}>{pr?.soldQuantity}</span>
                                                </div>
                                            ))
                                        }
                                    </div>}
                                </div>

                            </CardBody>
                            <div class="position-absolute top-0 d-flex justify-content-end w-100 cursor-pointer">
                                <a href={`${BASE_URL}/sales/file/${item?.id}`}>
                                    <HiQrCode size={25}/>
                                </a>
                            </div>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}
export const DebtComponent = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {user} = useSelector(state => state.users)
    const {stores} = useSelector(state => state.stores)
    const {debts} = useSelector(state => state.debts)
    const [amount, setAmount] = useState(0)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (user) {
            history.push({
                search: qs.stringify({
                    filter: JSON.stringify({
                        clientId: user?.id
                    })
                })
            })
        }
    }, [user])

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
                                    <div class="">
                                        <span><b>Do'kon: </b> {stores?.find(val => val.id === item?.storeId)?.storeName}</span>
                                    </div>
                                    <div class="">
                                        <span><b>Savdo sanasi: </b> <DateFormatClock
                                            current_date={item?.createdAt}/></span>
                                    </div>
                                    <div class="">
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
    const {user} = useSelector(state => state.users)
    return (
        <Row sm={2} md={3} xl={4} className={"row-cols-1"}>
            {user?.payments?.map((item, ind) => {
                return (
                    <Col key={ind}>
                        <Card>
                            <CardBody className={"d-flex flex-column gap-1"}>
                                {/*<div class="">*/}
                                {/*    <span><b>Do'kon: </b> {stores?.find(val => val.id === item?.storeId)?.storeName}</span>*/}
                                {/*</div>*/}
                                <div class="">
                                        <span><b>To'lov sanasi: </b> <DateFormatClock
                                            current_date={item?.createdAt}/></span>
                                </div>
                                <div class="">
                                    <span><b>To'lov summasi: </b> {item?.paymentAmount} sum</span>
                                </div>
                                <div class="">
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
//     const {user} = useSelector(state => state.users)
//     const [amount, setAmount] = useState()
//
//     useEffect(() => {
//         let num = 0
//         const datas = user?.debts?.filter(item => item?.saleId === saleId)
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