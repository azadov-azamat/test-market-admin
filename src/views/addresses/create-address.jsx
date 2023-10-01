import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"
import {INPUT_MSG} from "../../utility/Utils"
import {unwrapResult} from "@reduxjs/toolkit"
import {createAddress, patchAddress, setAddress} from "../../redux/reducers/address"

export default function CreateAddress({
                                          toggleModal,
                                          modal
                                      }) {

    const dispatch = useDispatch()
    const {address} = useSelector(state => state.addresses)

    const ValidateSchema = Yup.object().shape({
        adressName: Yup.string().required(INPUT_MSG)
    })

    const formik = useFormik({
        initialValues: {
            adressName: address?.adressName || ''
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (address) {
                const data = {
                    id: address?.id,
                    body: val
                }
                dispatch(patchAddress(data)).then(unwrapResult).then(function () {
                    dispatch(setAddress(null))
                    toggleModal()
                })
            } else {
                dispatch(createAddress(val)).then(unwrapResult).then(function () {
                    toggleModal()
                })
            }
        }
    })

    return (
        <Modal
            isOpen={modal}
            toggle={toggleModal}
            size={"lg"}
            className="modal-dialog-centered"
            // onClose/d={toggleModal}
        >
            <ModalHeader toggle={toggleModal}>
                {address ? "Manzil o'zgartirish" : "Manzil qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={2} className={"d-flex justify-content-center"}>
                        <Col>
                            <div className="mb-1">
                                <Label for={"adressName"}>Nomi *</Label>
                                <Input
                                    id={'adressName'}
                                    name={"adressName"}
                                    defaultValue={address?.adressName}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button disabled={!formik.isValid || !formik.dirty}
                                color={"primary"}
                                type={'submit'}>{address ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}