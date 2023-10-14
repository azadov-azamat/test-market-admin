import {Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik"
import * as Yup from "yup"
import {INPUT_MSG} from "../../utility/Utils"
import {unwrapResult} from "@reduxjs/toolkit"
import {createProduct, patchProduct, setProduct} from "../../redux/reducers/product"
import FileUploaderSingle from "../../components/FileUploaderSingle"
import {useState} from "react"
import Button from '../../components/Btn'
import {uploadFile} from "../../redux/reducers/file"
import Select from "react-select"
import {getAddresses} from "../../redux/reducers/address"
import {XCircle} from "react-feather"
import {toast} from "react-toastify"

export default function CreateProduct({
                                          toggleModal,
                                          modal,
                                          storeId
                                      }) {

    const dispatch = useDispatch()
    const {
        product,
        isLoading
    } = useSelector(state => state.products)
    const {addresses} = useSelector(state => state.addresses)

    const [file, setFile] = useState(null)
    const [editImg, setEditImg] = useState(false)

    const ValidateSchema = Yup.object().shape({
        productName: Yup.string().required(INPUT_MSG),
        productPrice: Yup.number().required(INPUT_MSG),
        productQuantity: Yup.number().required(INPUT_MSG),
        productModel: Yup.string().required(INPUT_MSG),
        productMainPrice: Yup.number().required(INPUT_MSG),
        adressId: Yup.string().required(INPUT_MSG),
        productMeasure: Yup.string().required(INPUT_MSG)
    })

    const toggleCancel = () => {
        setFile(null)
        setEditImg(false)
        dispatch(setProduct(null))
        toggleModal()
    }

    const formik = useFormik({
        initialValues: {
            productName: product?.productName || '',
            productPrice: product?.productPrice || 0,
            productQuantity: product?.productQuantity || 0,
            productMainPrice: product?.productMainPrice || 0,
            productCurrency: product?.productCurrency || "dollar",
            productModel: product?.productModel || '',
            storeId,
            adressId: product?.adressId || '',
            productMeasure: product?.productMeasure || ''
        },
        enableReinitialize: true,
        validationSchema: ValidateSchema,
        onSubmit: (val) => {
            if (product) {
                if (file !== null) {
                    const data = new FormData()
                    data.append("file", file)
                    dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                        const data = {
                            id: product?.id,
                            body: {
                                productImgUrl: res.url,
                                ...val
                            }
                        }
                        dispatch(patchProduct(data)).then(unwrapResult).then(function () {
                            toggleCancel()
                        })
                    })
                } else {
                    const data = {
                        id: product?.id,
                        body: {
                            productImgUrl: product?.productImgUrl,
                            ...val
                        }
                    }
                    dispatch(patchProduct(data)).then(unwrapResult).then(function () {
                        toggleCancel()
                    })
                }
            } else {
                if (!file) return toast.error("Rasm biriktirilmagan!")
                const data = new FormData()
                data.append("file", file)
                dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                    const create = {
                        productImgUrl: res.url,
                        ...val
                    }
                    dispatch(createProduct(create)).then(unwrapResult).then(function () {
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
        >
            <ModalHeader toggle={toggleCancel}>
                {product ? "Mahsulot o'zgartirish" : "Mahsulot qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={1}>
                        <Col>
                            {!product?.productImgUrl || editImg ? <div className="mb-1">
                                <FileUploaderSingle setFile={setFile} title={"Rasm yuklash"} accept={"image/*"}/>
                            </div> : <div className={"d-flex justify-content-center position-relative"}>
                                <img width={200} src={product?.productImgUrl} className={"mt-2"} alt={product?.productName}/>
                                <XCircle onClick={() => setEditImg(true)} size={25}
                                         className={"text-danger cursor-pointer"}/>
                            </div>}
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"productName"}>Nomi *</Label>
                                <Input
                                    id={'productName'}
                                    name={"productName"}
                                    defaultValue={product?.productName}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"productModel"}>Modeli *</Label>
                                <Input
                                    id={'productModel'}
                                    name={"productModel"}
                                    defaultValue={product?.productModel}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <div className="d-flex align-items-center gap-1">
                        <Col className="col-3">
                            <div className="mb-1">
                                <Label className="form-label" for="productCurrency">
                                    Valyuta *
                                </Label>
                                <Select
                                    id="productCurrency"
                                    name="productCurrency"
                                    placeholder="Tanlang..."
                                    options={[
                                        {value: "dollar"},
                                        {value: "sum"}
                                    ]}
                                    defaultValue={{
                                        label: product?.productCurrency || "dollar",
                                        value: product?.productCurrency || "dollar"
                                    }}
                                    getOptionLabel={option => option.value}
                                    getOptionValue={option => option.value}
                                    onChange={(val) => {
                                        formik.setFieldValue("productCurrency", val.value)
                                    }}
                                />
                            </div>
                        </Col>
                        <Col className="col-8">
                            <div className="mb-1">
                                <Label for={"productMainPrice"}>Asosiy narxi *</Label>
                                <Input
                                    id={'productMainPrice'}
                                    name={"productMainPrice"}
                                    defaultValue={product?.productMainPrice}
                                    type={"number"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        </div>
                        <Col>
                            <div className="mb-1">
                                <Label for={"productPrice"}>Narxi *</Label>
                                <Input
                                    id={'productPrice'}
                                    name={"productPrice"}
                                    defaultValue={product?.productPrice}
                                    type={"number"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                    
                        <Col>
                            <div className="mb-1">
                                <Label for={"productQuantity"}>Miqdori *</Label>
                                <Input
                                    id={'productQuantity'}
                                    name={"productQuantity"}
                                    defaultValue={product?.productQuantity}
                                    type={"number"}
                                    onChange={formik.handleChange}
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
                                    defaultValue={{
                                        label: addresses.find(item => item.id === product?.adressId)?.adressName,
                                        value: product?.adressId
                                    }}
                                    getOptionLabel={option => option.adressName}
                                    getOptionValue={option => option.id}
                                    onChange={(val) => {
                                        formik.setFieldValue("adressId", val.id)
                                    }}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label className="form-label" for="productMeasure">
                                    Mahsulot birligini kiriting *
                                </Label>
                                <Select
                                    id="productMeasure"
                                    name="productMeasure"
                                    placeholder="Tanlang..."
                                    options={[
                                        {value: "kg"},
                                        {value: "dona"},
                                        {value: "litr"},
                                        {value: "metr"},
                                        {value: "metrkv"}
                                    ]}
                                    defaultValue={{
                                        label: product?.productMeasure,
                                        value: product?.productMeasure
                                    }}
                                    getOptionLabel={option => option.value}
                                    getOptionValue={option => option.value}
                                    onChange={(val) => {
                                        formik.setFieldValue("productMeasure", val.value)
                                    }}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"productOption"}>Mahsulot uchun option</Label>
                                <Input
                                    id={'productOption'}
                                    name={"productOption"}
                                    defaultValue={product?.productOption}
                                    type={"textarea"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button disabled={!formik.isValid || !formik.dirty }
                                loading={isLoading}
                                color={"primary"}
                                type={'submit'}>{product ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}