import {Col, Form, Input, Label, Modal, ModalBody, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"
import {INPUT_MSG} from "../../utility/Utils"
import React from "react"
import Button from '../../components/Btn'
import {unwrapResult} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import {createCurrency, patchCurrency, setCurrency} from "../../redux/reducers/currency"

export default function CreateCurrency({
                                           toggleModal,
                                           modal,
    firmId
                                       }) {

    const dispatch = useDispatch()

    const {
        currency,
        isLoading
    } = useSelector(state => state.currencies)

    const ValidateSchema = Yup.object().shape({
        currencyOption: Yup.string().required(INPUT_MSG),
        currencyMoney: Yup.number().required(INPUT_MSG)
    })

    const toggleCancel = () => {
        dispatch(setCurrency(null))
        toggleModal()
    }

    const formik = useFormik({
        initialValues: {
            currencyOption: currency?.currencyOption || '',
            currencyMoney: currency?.currencyMoney || '',
            firmId
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (currency) {
                const data = {
                    id: currency?.id,
                    body: {
                        ...val
                    }
                }
                dispatch(patchCurrency(data)).then(unwrapResult)
                    .then(() => {
                        toast.success("O'zgartirildi")
                        toggleCancel()
                    })
            } else {
                dispatch(createCurrency(val)).then(unwrapResult)
                    .then(() => {
                        toast.success("Saqlandi")
                        toggleCancel()
                    })
            }
        }
    })

    return (
        <Modal
            isOpen={modal}
            toggle={toggleCancel}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={2}>
                        <Col>
                            <div className="w-100">
                                <Label for={"currencyMoney"}>Mablag' *</Label>
                                <Input
                                    id={'currencyMoney'}
                                    name={"currencyMoney"}
                                    defaultValue={currency?.currencyMoney}
                                    type={"number"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="w-100">
                                <Label for={"currencyOption"}>Izoh *</Label>
                                <Input
                                    id={'currencyOption'}
                                    name={"currencyOption"}
                                    defaultValue={currency?.currencyOption}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button disabled={!formik.isValid || !formik.dirty}
                                loading={isLoading}
                                color={"primary"}
                                type={'submit'}>{currency ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}