import {useDispatch, useSelector} from "react-redux"
import {useHistory, useParams} from "react-router-dom"
import React, {useEffect} from "react"
import {getSaleById} from "../../redux/reducers/sale"
import {Card, CardBody, Col, Row} from "reactstrap"
import DateFormatClock from "../../components/DateFormatClock"
import {BASE_URL, handleSwitchPayType} from "../../utility/Utils"
import {HiQrCode} from "react-icons/hi2"
import {FiExternalLink} from "react-icons/fi"
import DateFormat from "../../components/DateFormat"

export default function ViewSales() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const {sale} = useSelector(state => state.sales)

    console.log(sale)

    useEffect(() => {
        dispatch(getSaleById(id))

        return () => {
            dispatch({
                type: 'sale/getSaleById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [])

    return (
        <>
            <Row md={2} xl={3} className={"row-cols-1"}>
                <Col>
                    <Card className={"position-relative"}>
                        <CardBody className={"d-flex flex-column gap-1 p-0 m-2"}>
                            <div className="">
                                <span
                                    className={"w-100 d-flex justify-content-between align-items-center"}><b>Do'kon: </b> {sale?.store?.storeName}</span>
                            </div>
                            <div className="">
                                        <span className={"w-100 d-flex justify-content-between align-items-center"}><b>Savdo sanasi: </b> <DateFormatClock
                                            current_date={sale?.createdAt}/></span>
                            </div>
                            <div className="">
                                <span className={"w-100 d-flex justify-content-between align-items-center"}><b>Umumiy savdo narxi: </b> {sale?.saleMainPrice} sum</span>
                            </div>
                            <div className="">
                                <span className={"w-100 d-flex justify-content-between align-items-center"}><b>Savdo narxi (chegirma): </b> {sale?.saleSoldPrice} sum</span>
                            </div>
                            <div className="">
                                <span
                                    className={"w-100 d-flex justify-content-between align-items-center"}><b>Sotuvchi: </b> {sale?.seller?.sellerName}</span>
                            </div>
                        </CardBody>
                        <div
                            className="position-absolute top-0 d-flex justify-content-end w-100">
                            <a href={`${BASE_URL}/sales/file/${sale?.id}`} className={'cursor-pointer'}>
                                <HiQrCode size={25}/>
                            </a>
                        </div>
                    </Card>
                </Col>
                <Col>
                    <Card className={"position-relative"}>
                        <CardBody className={"d-flex flex-column gap-1 p-0 m-2"}>
                            <div><b>To'lovlar: </b> {sale?.saleDebt && <span
                                className={"text-white rounded fw-light font-small-2 px-1 bg-danger"}>Qarz savdo</span>}
                            </div>
                            {sale?.payments?.length > 0 && <div className={""}>
                                <div className="w-100 d-flex gap-1">
                                    <b className={""}>#</b>
                                    <b className={"w-50"}>Summa</b>
                                    <b className={"w-50"}>Turi</b>
                                </div>
                                {
                                    sale?.payments?.map((pr, i) => (
                                        <div className="w-100 d-flex gap-1" key={i}>
                                            <span className={""}>{i + 1}</span>
                                            <span className={"w-50"}>{pr?.paymentAmount} sum</span>
                                            <span className={"w-50"}>{handleSwitchPayType(pr?.paymentType)}</span>
                                        </div>
                                    ))
                                }
                            </div>}
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className={"position-relative"}>
                        {
                            sale?.client ? <>
                                <CardBody className={"d-flex flex-column gap-1 p-0 m-2"}>
                                    <div className={"fw-bolder"}>Xaridor:</div>
                                    <div className={"d-flex flex-column gap-1"}>
                                        <div className="">
                                <span
                                    className={"w-100 d-flex justify-content-between align-items-center"}><b>F.I.O: </b> {sale?.client?.clientName}</span>
                                        </div>
                                        <div className="">
                                <span
                                    className={"w-100 d-flex justify-content-between align-items-center"}><b>Telefon raqami: </b> {sale?.client?.clientPhone}</span>
                                        </div>
                                        <div className="">
                                <span
                                    className={"w-100 d-flex justify-content-between align-items-center"}><b>Manzili: </b> {sale?.client?.clientAdress}</span>
                                        </div>
                                        <div className="">
                                <span
                                    className={"w-100 d-flex justify-content-between align-items-center"}><b>To'lov kuni: </b> <DateFormat
                                    current_date={sale?.client?.clientPaymentDate}/></span>
                                        </div>
                                    </div>
                                </CardBody>
                                <div
                                    className="position-absolute top-0 d-flex justify-content-end w-100">
                                    <FiExternalLink size={20}
                                                    className="cursor-pointer text-success"
                                                    onClick={() => history.push(`/administrator/client/${sale?.client?.id}}`)}/>
                                </div>

                            </> : <>
                                <div
                                    className={"d-flex w-full py-5 justify-content-center align-items-center fw-bolder font-small-4"}>
                                    Xaridor biriktirilmagan
                                </div>
                            </>
                        }
                    </Card>
                </Col>
                <Col>
                    <Card className={"position-relative"}>
                        <CardBody className={"d-flex flex-column gap-1 p-0 m-2"}>
                            <div className={"fw-bolder"}>Sotilgan Mahsulotlar:</div>
                            {sale?.soldproducts?.length > 0 && <div className={""}>
                                <div className="w-100 d-flex gap-1">
                                    <b className={"w-25"}>Nomi</b>
                                    <b className={"w-25"}>Narxi</b>
                                    <b className={"w-25"}>Miqdori</b>
                                </div>
                                {
                                    sale?.soldproducts?.map((pr, i) => (
                                        <div className="w-100 d-flex gap-1" key={i}>
                                            <span className={"w-25"}>{pr?.soldProductName}</span>
                                            <span className={"w-25"}>{pr?.soldPrice} sum</span>
                                            <span className={"w-25"}>{pr?.soldQuantity}</span>
                                        </div>
                                    ))
                                }
                            </div>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <div className="">
                                <span><b>Sharx: </b> {sale?.comment}</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}