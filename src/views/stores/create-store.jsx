import {Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"
import {INPUT_MSG} from "../../utility/Utils"
import {unwrapResult} from "@reduxjs/toolkit"
import {createStore, patchStore, setStore} from "../../redux/reducers/store"
import Button from '../../components/Btn'
import {useState} from "react"
import FileUploaderSingle from "../../components/FileUploaderSingle"
import {uploadFile} from "../../redux/reducers/file"
import {XCircle} from "react-feather"
import {toast} from "react-toastify"

export default function CreateStore({
                                        toggleModal,
                                        modal
                                    }) {

    const dispatch = useDispatch()
    const {
        store,
        isLoading
    } = useSelector(state => state.stores)
    const [file, setFile] = useState(null)
    const [editImg, setEditImg] = useState(false)

    const ValidateSchema = Yup.object().shape({
        storeName: Yup.string().required(INPUT_MSG)
    })

    const toggleCancel = () => {
        dispatch(setStore(null))
        setEditImg(false)
        setFile(null)
        toggleModal()
    }

    const formik = useFormik({
        initialValues: {
            storeName: store?.storeName || ''
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (store) {
                if (file !== null) {
                    const data = new FormData()
                    data.append("file", file)
                    dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                        const data = {
                            id: store?.id,
                            body: {
                                storeImgUrl: res.url,
                                ...val
                            }
                        }
                        dispatch(patchStore(data)).then(unwrapResult).then(function () {
                            toggleCancel()
                        })
                    })
                } else {
                    const data = {
                        id: store?.id,
                        body: {
                            storeImgUrl: store?.storeImgUrl,
                            ...val
                        }
                    }
                    dispatch(patchStore(data)).then(unwrapResult).then(function () {
                        toggleCancel()
                    })
                }
            } else {
                if (!file) return toast.error("Rasm biriktirilmagan!")
                const data = new FormData()
                data.append("file", file)
                dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                    const create = {
                        storeImgUrl: res.url,
                        ...val
                    }
                    dispatch(createStore(create)).then(unwrapResult).then(function () {
                        toggleCancel()
                    })
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
            // onClose/d={toggleModal}
        >
            <ModalHeader toggle={toggleCancel}>
                {store ? "Do'kon o'zgartirish" : "Do'kon qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={1}>
                        <Col>
                            {!store?.storeImgUrl || editImg ? <div className="mb-1">
                                <FileUploaderSingle setFile={setFile} title={"Rasm yuklash"} accept={"image/*"}/>
                            </div> : <div className={"d-flex justify-content-center position-relative"}>
                                <img width={200} src={store?.storeImgUrl} className={"mt-2"} alt={store?.storeName}/>
                                <XCircle onClick={() => setEditImg(true)} size={25}
                                         className={"text-danger cursor-pointer"}/>
                            </div>}
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"storeName"}>Nomi *</Label>
                                <Input
                                    id={'storeName'}
                                    name={"storeName"}
                                    defaultValue={store?.storeName}
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
                                type={'submit'}>{store ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}