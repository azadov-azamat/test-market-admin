import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"

import ReactInputMask from "react-input-mask"
import {INPUT_MSG} from "../../utility/Utils"
import {createUser, patchUser, setUser} from "../../redux/reducers/user"
import {unwrapResult} from "@reduxjs/toolkit"

export default function CreateUser({
                                       toggleModal,
                                       modal
                                   }) {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.users)

    const ValidateSchema = Yup.object().shape({
        sellerName: Yup.string().required(INPUT_MSG),
        sellerPhone: Yup.string().required(INPUT_MSG)
    })

    const formik = useFormik({
        initialValues: {
            sellerName: user?.sellerName || '',
            sellerPhone: user?.sellerPhone || '',
            sellerRole: 'seller'
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (user) {
                const data = {
                    id: user?.id,
                    body: val
                }
                dispatch(patchUser(data)).then(unwrapResult).then(function () {
                    dispatch(setUser(null))
                    toggleModal()
                })
            } else {
                dispatch(createUser(val)).then(unwrapResult).then(function () {
                    toggleModal()
                })
            }
        }
    })

    function pinChange(e) {
        formik.setFieldValue('sellerPhone', e.target.value.replace(/_/g, ''))
    }

    return (
        <Modal
            isOpen={modal}
            toggle={toggleModal}
            size={"lg"}
            className="modal-dialog-centered"
            // onClose/d={toggleModal}
        >
            <ModalHeader toggle={toggleModal}>
                {user ? "Sotuvchini o'zgartirish" : "Sotuvchi qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={user ? 2 : 3}>
                        <Col>
                            <div className="mb-1">
                                <Label for={"sellerName"}>F.I.O *</Label>
                                <Input
                                    id={'sellerName'}
                                    name={"sellerName"}
                                    defaultValue={user?.sellerName}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"sellerPhone"}>Telefon raqami *</Label>
                                <Input
                                    id={'sellerPhone'}
                                    name={"sellerPhone"}
                                    defaultValue={user?.sellerPhone}
                                    type={"text"}
                                    mask="99999999999"
                                    maskplaceholder=" "
                                    tag={ReactInputMask}
                                    onChange={pinChange}
                                />
                            </div>
                        </Col>
                        {!user && <Col>
                            <div className="mb-1">
                                <Label for={"sellerPassword"}>Parol *</Label>
                                <Input
                                    id={'sellerPassword'}
                                    name={"sellerPassword"}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>}
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