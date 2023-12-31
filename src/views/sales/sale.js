import {useDispatch, useSelector} from "react-redux"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import React, {useEffect, useState} from "react"
import {deleteSale, getSales} from "../../redux/reducers/sale"
import {Button, Card, CardBody, Col, Row} from "reactstrap"
import DateFormatClock from "../../components/DateFormatClock"
import {HiQrCode} from "react-icons/hi2"
import Select from "react-select"
import {Filter, Trash} from "react-feather"
import FilterSales from "./Filter"
import CustomPagination from "../custom-pagination"
import DeleteModal from "../delete-modal"
import {toast} from "react-toastify"
import {unwrapResult} from "@reduxjs/toolkit"
import {getStores} from "../../redux/reducers/store"
import {useDownload} from "../../utility/hooks/useDownload"

export default function SaleListComponent({
                                              clientId,
                                              storeId
                                          }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {stores} = useSelector(state => state.stores)
    const {
        sales,
        limit,
        currentPage,
        pageCount,
        totalCount
    } = useSelector(state => state.sales)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const [removeId, setId] = useState()
    // const [createModal, setCreateModal] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const [filter, setFilter] = useState(false)
    const handleFilter = () => setFilter(!filter)
    const toggleDelete = () => setDelete(!isDelete)

    useEffect(() => {
        dispatch(getStores())

        history.push({
            search: qs.stringify({
                ...query,
                limit: 10,
                sort: '-id'
            })
        })
    }, [])

    useEffect(() => {
        if (clientId || storeId) {
            if (location.search) {
                dispatch(getSales({
                    ...query,
                    sort: '-id',
                    filter: JSON.stringify({
                        clientId,
                        storeId
                    })
                }))
            } else {
                // setTimeout(() => {
                dispatch(getSales({
                    limit: 10,
                    sort: '-id',
                    filter: JSON.stringify({
                        clientId,
                        storeId
                    })
                }))
                // }, 1000)
            }
        } else {
            if (location.search) {
                dispatch(getSales({
                    ...query,
                    sort: '-id'
                }))
            } else {
                // setTimeout(() => {
                dispatch(getSales({
                    limit: 10,
                    sort: '-id'
                }))
                // }, 1000)
            }
        }
    }, [location, clientId, storeId])

    useEffect(() => {
        return () => {
            dispatch({
                type: 'sale/getSales/fulfilled',
                payload: {
                    data: [],
                    currentPage: 0,
                    limit: 10,
                    pageCount: 0,
                    totalCount: 0
                }
            })
        }
    }, [])

    const removeById = () => {
        dispatch(deleteSale(removeId)).then(unwrapResult)
            .then(() => {
                toast.success(`${removeId} - tegishli savdo o'chirildi`)
            })
            .catch((err) => {
                toast.error(`${err}`)
            })
    }

    return (
        <div>
            {clientId === undefined &&
                <div className="d-flex align-items-center justify-content-between my-2">
                    <h4>Ma'lumotlar</h4>
                    <div className="d-flex gap-1">
                        <div className="">
                            <Select
                                id="limit"
                                name="limit"
                                options={[
                                    {value: 10},
                                    {value: 15},
                                    {value: 20},
                                    {value: 25}
                                ]}
                                defaultValue={{
                                    label: limit,
                                    value: limit
                                }}
                                getOptionLabel={option => option.value}
                                getOptionValue={option => option.value}
                                onChange={(val) => {
                                    history.push({
                                        search: qs.stringify({
                                            ...query,
                                            limit: val?.value
                                        })
                                    })
                                }}
                            />
                        </div>
                        <Button onClick={handleFilter} className="btn-icon" outline color="primary">
                            <Filter size={16}/>
                        </Button>
                    </div>
                </div>}
            <Row md={2} xl={3} className={"row-cols-1"}>
                {sales?.map((item, ind) => {
                    return (
                        <Col key={ind}>
                            <Card className={"position-relative"}>
                                <CardBody className={"d-flex flex-column gap-1 cursor-pointer p-0 m-2"}
                                          onClick={() => history.push(`/administrator/sale/${item?.id}`)}>
                                    <div className="">
                                        <span><b>ID </b>#{item?.id}</span>
                                    </div>
                                    <div className="">
                                        <span><b> Do'kon: </b> {stores?.find(val => val.id === item?.storeId)?.storeName}</span>
                                    </div>
                                    <div className="">
                                        <span><b>Savdo sanasi: </b> <DateFormatClock
                                            current_date={item?.createdAt}/></span>
                                    </div>
                                    <div className="">
                                        <span><b>Umumiy savdo narxi: </b> {item?.saleMainPrice} sum</span>
                                    </div>
                                    <div className="">
                                        <span><b>Savdo narxi (chegirma): </b> {item?.saleSoldPrice} sum</span>
                                    </div>
                                    <div className="">
                                        <span><b>Sharx: </b> {item?.comment}</span>
                                    </div>
                                    <div className="">
                                        <div><b>Sotilgan mahsulotlar: </b> {item?.saleDebt && <span
                                            className={"text-white rounded fw-light font-small-2 px-1 bg-danger"}>Qarz savdo</span>}
                                        </div>
                                        {item?.soldproducts?.length > 0 && <div className={""}>
                                            <div className="w-100 d-flex">
                                                <b className={"w-50"}>Nomi</b>
                                                <b className={"w-25"}>Narxi</b>
                                                <b className={"w-25"}>Birligi</b>
                                            </div>
                                            {
                                                item?.soldproducts?.map((pr, i) => (
                                                    <div className="w-100 d-flex" key={i}>
                                                        <span className={"w-50"}>{pr?.soldProductName}</span>
                                                        <span className={"w-25"}>{pr?.soldPrice} sum</span>
                                                        <span
                                                            className={"w-25"}>{pr?.soldQuantity} {pr?.soldProductMeasure}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>}
                                    </div>

                                </CardBody>
                                <div
                                    className="d-flex gap-1 align-items-center justify-content-end w-100 py-1 px-1">
                                    <HiQrCode size={22} onClick={() => useDownload(`sales/file/${item?.id}`)}/>
                                    <Trash size={20} className={"cursor-pointer text-danger"} onClick={() => {
                                        setId(item?.id)
                                        setTimeout(() => {
                                            toggleDelete()
                                        }, 500)
                                    }}/>
                                </div>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <CustomPagination size={sales.length} currentPage={Number(currentPage)} totalPages={pageCount}
                              total_count={totalCount} limit={limit}/>
            <FilterSales handleFilter={handleFilter} open={filter}/>
            <DeleteModal toggleModal={toggleDelete} modal={isDelete} onFunction={removeById}/>
        </div>
    )
}