import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"

import ReactInputMask from "react-input-mask"
import {INPUT_MSG} from "../../utility/Utils"
import {createClient, patchClient, setUser} from "../../redux/reducers/user"
import {unwrapResult} from "@reduxjs/toolkit"

export default function CreateUser({
                                       toggleModal,
                                       modal
                                   }) {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.users)

    const ValidateSchema = Yup.object().shape({
        clientName: Yup.string().required(INPUT_MSG),
        clientPaymentDate: Yup.string().required(INPUT_MSG),
        clientAdress: Yup.string().required(INPUT_MSG),
        clientPhone: Yup.string().required(INPUT_MSG)
    })

    const formik = useFormik({
        initialValues: {
            clientName: user?.clientName || '',
            clientPhone: user?.clientPhone || '',
            clientAdress: user?.clientAdress || '',
            clientPaymentDate: user?.clientPaymentDate || ''
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (user) {
                const data = {
                    id: user?.id,
                    body: val
                }
                dispatch(patchClient(data)).then(unwrapResult).then(function () {
                    dispatch(setUser(null))
                    toggleModal()
                })
            } else {
                dispatch(createClient(val)).then(unwrapResult).then(function () {
                    dispatch(setUser(null))
                    toggleModal()
                })
            }
        }
    })

    function pinChange(e) {
        formik.setFieldValue('clientPhone', e.target.value.replace(/_/g, ''))
    }

    return (
        <Modal
            isOpen={modal}
            toggle={() => {
                dispatch(setUser(null))
                toggleModal()
            }}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => {
                dispatch(setUser(null))
                toggleModal()
            }}>
                {user ? "Sotuvchini o'zgartirish" : "Sotuvchi qo'shish"}
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
                                    defaultValue={user?.clientName}
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
                                    defaultValue={user?.clientPhone}
                                    type={"text"}
                                    mask="99999999999"
                                    maskplaceholder=" "
                                    tag={ReactInputMask}
                                    onChange={pinChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"clientAdress"}>Manzili *</Label>
                                <Input
                                    id={'clientAdress'}
                                    name={"clientAdress"}
                                    defaultValue={user?.clientAdress}
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
                                    defaultValue={user?.clientPaymentDate}
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
                                type={'submit'}>{user ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}