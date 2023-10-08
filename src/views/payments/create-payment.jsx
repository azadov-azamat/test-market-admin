import {Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {handleSwitchPayType} from "../../utility/Utils"
import React, {useEffect, useState} from "react"
import Select from "react-select"
import {createPayment, patchPayment, setPayment} from "../../redux/reducers/payment"
import {unwrapResult} from "@reduxjs/toolkit"
import {getClients} from "../../redux/reducers/user"
import {getSales} from "../../redux/reducers/sale"

export default function CreatePayment({
                                          toggleModal,
                                          modal,
                                          storeId
                                      }) {

    const dispatch = useDispatch()
    const {clients} = useSelector(state => state.users)
    const {sales} = useSelector(state => state.sales)

    const {payment} = useSelector(state => state.payments)

    const [inputFields, setInputFields] = useState([])

    useEffect(() => {
        if (storeId) {
            setInputFields([
                {
                    paymentAmount: 0,
                    paymentType: "transfer",
                    clientId: null,
                    saleId: null,
                    storeId
                }
            ])
        }
    }, [storeId])

    useEffect(() => {
        dispatch(getClients())
        dispatch(getSales())
    }, [])

    useEffect(() => {
        if (payment) {
            setInputFields([payment])
        }
    }, [payment])

    function handleMask(e, index) {
        const {
            name,
            value
        } = e.target

        if (name === 'paymentAmount') {
            inputFields[index].paymentAmount = value.replace(/_/g, '')
        } else {
            inputFields[index].paymentType = value
        }
        setInputFields([...inputFields])
    }

    const handleAdd = () => {
        const list = [...inputFields]
        list.push({
            paymentType: "transfer",
            clientId: null,
            saleId: null,
            paymentAmount: 0,
            storeId
        })
        setInputFields(list)
    }

    const handleRemove = (index) => {
        inputFields.splice(index, 1)
        setInputFields([...inputFields])
    }

    const toggleCancel = () => {
        dispatch(setPayment(null))
        setInputFields([
            {
                paymentAmount: 0,
                paymentType: "transfer",
                clientId: null,
                saleId: null,
                storeId
            }
        ])
        toggleModal()
    }
    console.log(inputFields)

    function SavePayments() {
        if (payment) {
            const data = {
                id: payment?.id,
                body: inputFields[0]
            }
            dispatch(patchPayment(data)).then(unwrapResult).then(() => {
                toggleCancel()
            })
        } else {
            dispatch(createPayment(inputFields)).then(unwrapResult).then(() => {
                toggleCancel()
            })
        }
    }

    return (
        <Modal
            isOpen={modal}
            toggle={toggleCancel}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => {
                dispatch(toggleCancel)
                toggleModal()
            }}>
                {payment ? "To'lovni o'zgartirish" : "To'lov qo'shish"}
            </ModalHeader>
            <ModalBody>
                <div>
                    {inputFields.map((item, ind) => {
                        return (
                            <Row key={ind} className={"align-items-end mb-2"}>
                                <Col xs={10} className={""}>
                                    <div className="d-flex flex-md-row flex-column gap-1">
                                        <div className="w-100">
                                            <Label for={"paymentAmount"}>To'lov summasi *</Label>
                                            <Input
                                                id={'paymentAmount'}
                                                name={"paymentAmount"}
                                                value={item.paymentAmount}
                                                type={"number"}
                                                onChange={(e) => handleMask(e, ind)}
                                            />
                                        </div>
                                        <div className="w-100">
                                            <Label className="form-label" for="paymentType">
                                                To'lov turi *
                                            </Label>
                                            <Select
                                                id="paymentType"
                                                name="paymentType"
                                                placeholder="To'lov turi bo'yicha..."
                                                options={[
                                                    {
                                                        value: "terminal",
                                                        label: handleSwitchPayType("terminal")
                                                    },
                                                    {
                                                        value: "naqd",
                                                        label: handleSwitchPayType("naqd")
                                                    },
                                                    {
                                                        value: "transfer",
                                                        label: handleSwitchPayType("transfer")
                                                    }
                                                ]}
                                                value={{
                                                    value: item.paymentType,
                                                    label: handleSwitchPayType(item.paymentType)
                                                }}
                                                getOptionLabel={option => option.label}
                                                getOptionValue={option => option.value}
                                                onChange={(e) => {
                                                    inputFields[ind].paymentType = e.value
                                                    setInputFields([...inputFields])
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column gap-1">
                                        <div className="w-100">
                                            <Label className="form-label" for="clientId">
                                                Mijoz tanlash
                                            </Label>
                                            <Select
                                                id="clientId"
                                                name="clientId"
                                                placeholder="Mijoz biriktirish..."
                                                options={clients}
                                                defaultValue={{
                                                    value: item.clientId,
                                                    label: clients.find(cl => cl.id === item.clientId)?.clientName
                                                }}
                                                getOptionLabel={option => option.clientName}
                                                getOptionValue={option => option.id}
                                                onChange={(e) => {
                                                    inputFields[ind].clientId = e?.id
                                                    setInputFields([...inputFields])
                                                }}
                                            />
                                        </div>
                                        <div className="w-100">
                                            <Label className="form-label" for="saleId">
                                                Savdoni belgilang
                                            </Label>
                                            <Select
                                                id="saleId"
                                                name="saleId"
                                                placeholder="Savdo biriktirish..."
                                                options={sales}
                                                defaultValue={{
                                                    value: item.saleId,
                                                    label: sales.find(cl => cl.id === item.saleId)?.id
                                                }}
                                                getOptionLabel={option => option.id}
                                                getOptionValue={option => option.id}
                                                onChange={(e) => {
                                                    inputFields[ind].saleId = e?.id
                                                    setInputFields([...inputFields])
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                {!payment && <Col xs={2}>
                                    <div
                                        className="d-flex flex-md-row flex-column align-items-center gap-1 justify-content-end">
                                        {inputFields.length > 1 &&
                                            <Button onClick={() => handleRemove(ind)} color={"danger"}
                                                    className={"font-small-4"}>x</Button>}
                                        {inputFields.length === (ind + 1) &&
                                            <Button color={"success"} className={""} onClick={handleAdd}>+</Button>}
                                    </div>
                                </Col>}
                            </Row>)
                    })}
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button
                            color={"primary"}
                            onClick={SavePayments}
                            type={'submit'}>{payment ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}