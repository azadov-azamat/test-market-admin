import {Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {useState} from "react"
import Select from "react-select"
import {getAddresses} from "../../redux/reducers/address"
import {useDownload} from "../../utility/hooks/useDownload"

export default function DownloadProduct({
                                            toggleModal,
                                            modal
                                        }) {

    const dispatch = useDispatch()
    const [addressId, setAddressId] = useState(null)
    const {addresses} = useSelector(state => state.addresses)

    return (
        <Modal
            isOpen={modal}
            toggle={() => {
                setAddressId(null)
                toggleModal()
            }}
            size={"lg"}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => {
                setAddressId(null)
                toggleModal()
            }}>
                Manzil bo'yicha yuklab olish
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row xs={1}>
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
                                        setAddressId(val?.id)
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="w-100 d-flex justify-content-end">
                        <Button disabled={!addressId} color={"primary"}
                                onClick={() => useDownload(`products/file/${addressId}`)}>Yuklash</Button>
                        {/*<a className={"disabled"} onClick={() => !addressId && toast.error("Manzilni tanlang")}*/}
                        {/*   href={addressId ? `${BASE_URL}/products/file/${addressId}` : "#"}>*/}
                        {/*    Yuklash*/}
                        {/*</a>*/}
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}