import {Col, Form, Input, Label, Modal, ModalBody, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"
import {INPUT_MSG} from "../../utility/Utils"
import React from "react"
import Button from '../../components/Btn'
import {unwrapResult} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import {createFirm, patchFirm, setFirm} from "../../redux/reducers/firms"

export default function CreateFirm({
                                       toggleModal,
                                       modal
                                   }) {

    const dispatch = useDispatch()

    const {
        firm,
        isLoading
    } = useSelector(state => state.firms)

    const ValidateSchema = Yup.object().shape({
        firmName: Yup.string().required(INPUT_MSG),
        firmINN: Yup.number().required(INPUT_MSG)
    })

    const toggleCancel = () => {
        dispatch(setFirm(null))
        toggleModal()
    }

    const formik = useFormik({
        initialValues: {
            firmINN: firm?.firmINN || '',
            firmName: firm?.firmName || ''
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (firm) {
                const data = {
                    id: firm?.id,
                    body: {
                        ...val
                    }
                }
                dispatch(patchFirm(data)).then(unwrapResult)
                    .then(() => {
                        toast.success("O'zgartirildi")
                        toggleCancel()
                    })
            } else {
                dispatch(createFirm(val)).then(unwrapResult)
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
                                <Label for={"firmName"}>Korxona nomi *</Label>
                                <Input
                                    id={'firmName'}
                                    name={"firmName"}
                                    defaultValue={firm?.firmName}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="w-100">
                                <Label for={"firmINN"}>Korxona INN *</Label>
                                <Input
                                    id={'firmINN'}
                                    name={"firmINN"}
                                    defaultValue={firm?.firmINN}
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
                                type={'submit'}>{firm ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}