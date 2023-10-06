import {Col, Form, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useState} from "react"
import Select from "react-select"
import {getAddresses} from "../../redux/reducers/address"
import {INPUT_MSG} from "../../utility/Utils"
import {toast} from "react-toastify"
import FileUploaderSingle from "../../components/FileUploaderSingle"
import {useFormik} from "formik"
import {uploadFile} from "../../redux/reducers/file"
import {unwrapResult} from "@reduxjs/toolkit"
import * as Yup from "yup"
import Button from "../../components/Btn"

export default function UploadProduct({
                                          toggleModal,
                                          modal,
                                          storeId
                                      }) {

    const dispatch = useDispatch()
    const {addresses} = useSelector(state => state.addresses)
    const {isLoading} = useSelector(state => state.products)
    const [file, setFile] = useState(null)


    console.log(file)
    const ValidateSchema = Yup.object().shape({
        adressId: Yup.string().required(INPUT_MSG)
    })

    const formik = useFormik({
        initialValues: {
            storeId,
            adressId: ''
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (file !== null) {
                toast.error("Fayl biriktirilmagan")
            } else {
                const file = new FormData()
                file.append("file", file)
                dispatch(uploadFile(file)).then(unwrapResult).then(res => {
                    const data = {
                        url: res.url,
                        ...val
                    }
                    console.log(data)
                    // dispatch(patchStore(data)).then(unwrapResult).then(function () {
                    setFile(null)
                    toggleModal()
                    // })
                })
            }
        }
    })

    return (
        <Modal
            isOpen={modal}
            toggle={() => {
                setFile(null)
                toggleModal()
            }}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => {
                setFile(null)
                toggleModal()
            }}>
                Mahsulotlarni fayl orqali yuklash
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={1}>
                        <Col>
                            <div className="mb-1">
                                <FileUploaderSingle setFile={setFile} title={"Tegishli faylni yuklang"}
                                                    accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label className="form-label" for="adressId">
                                    Mahsulot manzilini tanlang *
                                </Label>
                                <Select
                                    id="adressId"
                                    name="adressId"
                                    onFocus={() => {
                                        dispatch(getAddresses())
                                    }}
                                    placeholder="Tanlang..."
                                    options={addresses}
                                    getOptionLabel={option => option.adressName}
                                    getOptionValue={option => option.id}
                                    onChange={(val) => {
                                        formik.setFieldValue("adressId", val?.id)
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button disabled={!formik.isValid || !formik.dirty || !file}
                                loading={isLoading}
                                color={"primary"}
                                type={'submit'}>Saqlash</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}