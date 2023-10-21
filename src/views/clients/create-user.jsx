import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"

import ReactInputMask from "react-input-mask"
import {INPUT_MSG} from "../../utility/Utils"
import {createClient, patchClient, setClient} from "../../redux/reducers/user"
import {unwrapResult} from "@reduxjs/toolkit"

export default function CreateUser({
                                       toggleModal,
                                       modal,
                                       storeId
                                   }) {

    const dispatch = useDispatch()
    const {client} = useSelector(state => state.users)

    const ValidateSchema = Yup.object().shape({
        clientName: Yup.string().required(INPUT_MSG),
        clientPaymentDate: Yup.string().required(INPUT_MSG),
        clientAdress: Yup.string().required(INPUT_MSG),
        clientPhone: Yup.string().required(INPUT_MSG)
    })

    const formik = useFormik({
        initialValues: {
            clientName: client?.clientName || '',
            clientPhone: client?.clientPhone || '',
            clientAdress: client?.clientAdress || '',
            clientPaymentDate: client?.clientPaymentDate?.substring(0, 10) || '',
            storeId
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (client) {
                const data = {
                    id: client?.id,
                    body: val
                }
                dispatch(patchClient(data)).then(unwrapResult).then(function () {
                    dispatch(setClient(null))
                    toggleModal()
                })
            } else {
                dispatch(createClient(val)).then(unwrapResult).then(function () {
                    dispatch(setClient(null))
                    toggleModal()
                })
            }
        }
    })

    return (
        <Modal
            isOpen={modal}
            toggle={() => {
                dispatch(setClient(null))
                toggleModal()
            }}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => {
                dispatch(setClient(null))
                toggleModal()
            }}>
                {client ? "Sotuvchini o'zgartirish" : "Sotuvchi qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={2}>
                        <Col>
                            <div className="mb-1">
                                <Label for={"clientName"}>F.I.O *</Label>
                                <Input
                                    id={'clientName'}
                                    name={"clientName"}
                                    defaultValue={client?.clientName}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"clientPhone"}>Telefon raqami *</Label>
                                <Input
                                    id={'clientPhone'}
                                    name={"clientPhone"}
                                    defaultValue={client?.clientPhone}
                                    type={"number"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"clientAdress"}>Manzili *</Label>
                                <Input
                                    id={'clientAdress'}
                                    name={"clientAdress"}
                                    defaultValue={client?.clientAdress}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"clientPaymentDate"}>To'lov sanasi *</Label>
                                <Input
                                    id={'clientPaymentDate'}
                                    name={"clientPaymentDate"}
                                    defaultValue={client?.clientPaymentDate?.substring(0, 10)}
                                    type={"date"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button disabled={!formik.isValid || !formik.dirty}
                                color={"primary"}
                                type={'submit'}>{client ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}