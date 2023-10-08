import {Col, Form, Input, Label, Modal, ModalBody, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"
import {INPUT_MSG} from "../../utility/Utils"
import React from "react"
import Button from '../../components/Btn'
import {createDebt, setDebt} from "../../redux/reducers/debt"
import {unwrapResult} from "@reduxjs/toolkit"
import {toast} from "react-toastify"

export default function CreateDebt({
                                       toggleModal,
                                       modal,
                                       clientId
                                   }) {

    const dispatch = useDispatch()

    const {
        debt,
        isLoading
    } = useSelector(state => state.debts)

    const ValidateSchema = Yup.object().shape({
        debt: Yup.string().required(INPUT_MSG),
        clientId: Yup.string().required(INPUT_MSG)
    })

    const toggleCancel = () => {
        dispatch(setDebt(null))
        toggleModal()
    }

    const formik = useFormik({
        initialValues: {
            debt: debt?.debt || '',
            clientId
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            dispatch(createDebt(val)).then(unwrapResult)
                .then(() => {
                    toast.success("Saqlandi")
                    toggleCancel()
                })
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
                    <Row xs={1}>
                        <Col>
                            <div className="w-100">
                                <Label for={"debt"}>Summa *</Label>
                                <Input
                                    id={'debt'}
                                    name={"debt"}
                                    defaultValue={debt?.debt}
                                    type={"number"}
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
                                type={'submit'}>{debt ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}