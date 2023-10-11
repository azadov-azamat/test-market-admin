import {useDispatch, useSelector} from "react-redux"
import {useLocation} from "react-router-dom"
import React, {useEffect, useState} from "react"
import qs from "qs"
import {deleteDebt, getDebtsList, setDebt} from "../../redux/reducers/debt"
import {unwrapResult} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import {Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap"
import DateFormatClock from "../../components/DateFormatClock"
import {Edit, Trash} from "react-feather"
import DeleteModal from "../delete-modal"
import CreateDebt from "./create-debt"

export default function DebtComponent({clientId}) {

    const dispatch = useDispatch()
    // const history = useHistory()
    const location = useLocation()

    const {client} = useSelector(state => state.users)
    const {stores} = useSelector(state => state.stores)
    const {debts} = useSelector(state => state.debts)
    const [amount, setAmount] = useState(0)

    const [removeId, setId] = useState()
    const [isDelete, setDelete] = useState(false)

    const [createModal, setCreateModal] = useState(false)
    const toggleCreate = () => setCreateModal(!createModal)

    const toggleDelete = () => setDelete(!isDelete)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const [active, setActive] = useState(null)

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const removeById = () => {
        dispatch(deleteDebt(removeId)).then(unwrapResult)
            .then(() => {
                toast.success(`${removeId} - tegishli qarz o'chirildi`)
            })
            .catch((err) => {
                toast.error(`${err}`)
            })
    }

    // useEffect(() => {
    //     if (client && active) {
    //         history.push({
    //             search: qs.stringify({
    //                 filter: JSON.stringify({
    //                     clientId: client?.id,
    //                     storeId: active
    //                 })
    //             })
    //         })
    //     }
    // }, [client, active])

    useEffect(() => {
        if (client || active) {
            dispatch(getDebtsList({
                filter: JSON.stringify({
                    clientId: client?.id,
                    storeId: active
                })
            }))
        } else if (location.search) {
            dispatch(getDebtsList({...query}))
        } else {
            dispatch(getDebtsList({
                filter: JSON.stringify({
                    clientId: client?.id,
                    storeId: active
                })
            }))
        }

        return () => {
            dispatch({
                type: 'debt/getDebtById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [location.search, client, active])

    useEffect(() => {
        let num = 0
        debts.forEach(item => {
            num += item.debt
        })
        setAmount(num)
    }, [debts])

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
                                        <div
                                            className="d-flex gap-1 align-items-center justify-content-end w-100 py-1 px-1">
                                            <Edit size={20} className={"cursor-pointer text-warning"} onClick={() => {
                                                dispatch(setDebt(item))
                                                setTimeout(() => {
                                                    toggleCreate()
                                                }, 500)
                                            }}/>
                                            <Trash size={20} className={"cursor-pointer text-danger"} onClick={() => {
                                                setId(item?.id)
                                                setTimeout(() => {
                                                    toggleDelete()
                                                }, 500)
                                            }}/>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </TabPane>}
            </TabContent>

            <Row>
                <Col className={"col-12"}>
                    <Card>
                        <CardBody className={"d-flex justify-content-between align-items-center"}>
                            <div className="w-auto"><b>Jami:</b> {amount} sum</div>

                            <div className="">
                                {/*<Button onClick={() => {*/}
                                {/*    dispatch(setDebt(null))*/}
                                {/*    setTimeout(() => {*/}
                                {/*        toggleCreate()*/}
                                {/*    }, 500)*/}
                                {/*}} color={"success"} outline className="btn-icon">*/}
                                {/*    <Plus size={16} className={"cursor-pointer text-success"} />*/}
                                {/*</Button>*/}
                                {amount < 0 && <div className="text-danger">Qarzdor</div>}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <DeleteModal toggleModal={toggleDelete} modal={isDelete} onFunction={removeById}/>
            <CreateDebt modal={createModal} toggleModal={toggleCreate} clientId={clientId}/>
        </div>
    )
}