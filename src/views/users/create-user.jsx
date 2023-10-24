import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"

import ReactInputMask from "react-input-mask"
import {INPUT_MSG} from "../../utility/Utils"
import {createUser, patchUser, setUser} from "../../redux/reducers/user"
import {unwrapResult} from "@reduxjs/toolkit"
import FileUploaderSingle from "../../components/FileUploaderSingle"
import {XCircle} from "react-feather"
import {useState} from "react"
import {uploadFile} from "../../redux/reducers/file"
import {toast} from "react-toastify"

export default function CreateUser({
                                       toggleModal,
                                       modal
                                   }) {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.users)
    const [editImg, setEditImg] = useState(false)
    const [file, setFile] = useState(null)

    const toggleCancel = () => {
        dispatch(setUser(null))
        setEditImg(false)
        setFile(null)
        toggleModal()
    }

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
                if (file !== null) {
                    const data = new FormData()
                    data.append("file", file)
                    dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                        const data = {
                            id: user?.id,
                            body: {
                                sellerImgUrl: res.url,
                                ...val
                            }
                        }
                        dispatch(patchUser(data)).then(unwrapResult).then(function () {
                            toggleCancel()
                        })
                    })
                } else {
                    const data = {
                        id: user?.id,
                        body: {
                            sellerImgUrl: user?.sellerImgUrl,
                            ...val
                        }
                    }
                    dispatch(patchUser(data)).then(unwrapResult).then(function () {
                        toggleCancel()
                    })
                }
            } else {
                if (!file) return toast.error("Rasm biriktirilmagan!")

                const data = new FormData()
                data.append("file", file)
                dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                    const create = {
                        sellerImgUrl: res.url,
                        ...val
                    }
                    dispatch(createUser(create)).then(unwrapResult).then(function () {
                        toggleCancel()
                    })
                })
            }
        }
    })

    // function pinChange(e) {
    //     formik.setFieldValue('sellerPhone', e.target.value.replace(/_/g, ''))
    // }

    return (
        <Modal
            isOpen={modal}
            toggle={toggleCancel}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={toggleCancel}>
                {user ? "Sotuvchini o'zgartirish" : "Sotuvchi qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={user ? 2 : 3}>
                        <Col xs={12}>
                            {!user?.sellerImgUrl || editImg ? <div className="mb-1">
                                <FileUploaderSingle setFile={setFile} title={"Rasm yuklash"} accept={"image/*"}/>
                            </div> : <div className={"d-flex justify-content-center position-relative"}>
                                <img width={200} src={user?.sellerImgUrl} className={"mt-2"} alt={user?.sellerName}/>
                                <XCircle onClick={() => setEditImg(true)} size={25}
                                         className={"text-danger cursor-pointer"}/>
                            </div>}
                        </Col>
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
                                    type={"number"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"sellerPassword"}>Parol *</Label>
                                <Input
                                    id={'sellerPassword'}
                                    name={"sellerPassword"}
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
                                type={'submit'}>{user ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}