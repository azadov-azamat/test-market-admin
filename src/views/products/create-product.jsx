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
import {setStore} from "../../redux/reducers/store"
import Select from "react-select"
import {getAddresses} from "../../redux/reducers/address"

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

    const ValidateSchema = Yup.object().shape({
        productName: Yup.string().required(INPUT_MSG),
        productPrice: Yup.string().required(INPUT_MSG),
        productQuantity: Yup.string().required(INPUT_MSG),
        adressId: Yup.string().required(INPUT_MSG),
        productMeasure: Yup.string().required(INPUT_MSG)
    })

    const formik = useFormik({
        initialValues: {
            productName: product?.productName || '',
            productPrice: product?.productPrice || '',
            productQuantity: product?.productQuantity || '',
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
                            dispatch(setProduct(null))
                            setFile(null)
                            toggleModal()
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
                        dispatch(setStore(null))
                        setFile(null)
                        toggleModal()
                    })
                }
            } else {
                const data = new FormData()
                data.append("file", file)
                dispatch(uploadFile(data)).then(unwrapResult).then(res => {
                    const create = {
                        productImgUrl: res.url,
                        ...val
                    }
                    dispatch(createProduct(create)).then(unwrapResult).then(function () {
                        setFile(null)
                        toggleModal()
                    })
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
                {product ? "Mahsulot o'zgartirish" : "Mahsulot qo'shish"}
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={1}>
                        <Col>
                            <div className="mb-1">
                                <FileUploaderSingle setFile={setFile} title={"Rasm yuklash"}/>
                            </div>
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
                                <Label for={"productModel"}>Modeli</Label>
                                <Input
                                    id={'productModel'}
                                    name={"productModel"}
                                    defaultValue={product?.productModel}
                                    type={"textarea"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="mb-1">
                                <Label for={"productPrice"}>Narxi *</Label>
                                <Input
                                    id={'productPrice'}
                                    name={"productPrice"}
                                    defaultValue={product?.productPrice}
                                    type={"text"}
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
                                    type={"text"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Col>
                        {/*<Col>*/}
                        {/*    <div className="mb-1">*/}
                        {/*        <Label className="form-label" for="storeId">*/}
                        {/*            Do'kon tanlang*/}
                        {/*        </Label>*/}
                        {/*        <Select*/}
                        {/*            id="storeId"*/}
                        {/*            name="storeId"*/}
                        {/*            placeholder="Tanlang..."*/}
                        {/*            onFocus={() => {*/}
                        {/*                dispatch(getStores())*/}
                        {/*            }}*/}
                        {/*            options={stores}*/}
                        {/*            // defaultValue={{*/}
                        {/*            //     label: currentItem?.active ? "active" : "inactive",*/}
                        {/*            //     value: currentItem?.active*/}
                        {/*            // }}*/}
                        {/*            getOptionLabel={option => option.storeName}*/}
                        {/*            getOptionValue={option => option.id}*/}
                        {/*            onChange={(val) => {*/}
                        {/*                formik.setFieldValue("storeId", val.id)*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
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
                                        {value: "litr"}
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
                                type={'submit'}>{product ? "O'zgartirish" : "Saqlash"}</Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}