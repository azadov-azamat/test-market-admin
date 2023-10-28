import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Download, Filter, Plus, Trash2, Upload} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import CreateProduct from "./create-product"
import {deleteProduct, deleteProductList, getProducts, setProduct} from "../../redux/reducers/product"
import {getAddresses} from "../../redux/reducers/address"
import Select from "react-select"
import FilterProduct from "./Filter"
import DownloadProduct from "./download-product"
import UploadProduct from "./upload-product"
import {getCurrencyNbu} from '../../redux/reducers/payment'
import DeleteModal from "../delete-modal"

export default function Product({storeId}) {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        products,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.products)
    const {addresses} = useSelector(state => state.addresses)
    const {currencies} = useSelector(state => state.payments)

    const [idData, setIdData] = useState([])
    const [modals, setModal] = useState({
        create: false,
        isUpload: false,
        filter: false,
        isDownload: false,
        isDeleteList: false
    })

    const toggleModal = (modal) => {
        modals[modal] = !modals[modal]
        setModal({...modals})
    }

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    const dollarCur = parseInt(currencies?.find(item => item.Ccy === "USD")?.Rate)

    useEffect(() => {
        if (location.search) {
            dispatch(getProducts({
                ...query,
                filter: {storeId}
            }))
        } else {
            dispatch(getProducts({
                limit: 10,
                filter: {storeId}
            }))
        }
    }, [location, storeId])

    useEffect(() => {
        dispatch(getAddresses())
    }, [])

    useEffect(() => {
        dispatch(getCurrencyNbu())
    }, [])

    function editProduct(currentProduct) {
        dispatch(setProduct(currentProduct))
        toggleModal('create')
    }

    const basicColumns = [
        {
            name: "Nomi",
            width: '200px',
            sortable: true,
            sortField: "productName",
            // wrap: true,
            selector: (row) => row.productName
        },
        {
            name: "Asosiy narxi",
            width: '250px',
            sortable: true,
            sortField: "productMainPrice",
            wrap: true,
            selector: (row) => `${row?.productMainPrice}  ${row?.productCurrency || "sum"} ${row?.productCurrency === "dollar" ? (` - ${Math.round(row?.productMainPrice * dollarCur)} sum`) : ""}`
        },
        {
            name: "Narxi",
            width: '250px',
            sortable: true,
            sortField: "productPrice",
            wrap: true,
            selector: (row) => `${row?.productPrice}  ${row?.productCurrency || "sum"} ${row?.productCurrency === "dollar" ? (` - ${Math.round(row?.productPrice * dollarCur)} sum`) : ""}`
        },
        {
            name: "Miqdori",
            width: '100px',
            sortable: true,
            sortField: "productQuantity",
            wrap: true,
            selector: (row) => `${row.productQuantity} ${row.productMeasure}`
        },
        {
            name: "Manzili",
            sortable: true,
            sortField: "adressId",
            width: '150px',
            wrap: true,
            selector: (row) => addresses.find(item => item.id === row.adressId)?.adressName
        },
        {
            name: "Modeli",
            width: '150px',
            sortable: true,
            sortField: "productModel",
            wrap: true,
            selector: (row) => row.productModel
        },
        {
            name: "Ro'yxatga olingan vaqt",
            width: '200px',
            sortable: true,
            sortField: "createdAt",
            wrap: true,
            selector: (row) => <DateFormatClock current_date={row.createdAt}/>
        },
        {
            name: "O'zgartirish kiritilgan vaqt",
            width: '200px',
            sortable: true,
            sortField: "updatedAt",
            wrap: true,
            selector: (row) => <DateFormatClock current_date={row.updatedAt}/>
        },
        {
            name: 'Holat',
            wrap: true,
            width: '100px',
            cell: (row) => <div className={`d-flex gap-1`}>
                <BiEdit className={'text-warning cursor-pointer'} size={20} onClick={() => editProduct(row)}/>
                <BiTrash className={'text-danger cursor-pointer'} size={20}
                         onClick={() => dispatch(deleteProduct(row?.id))}/>
            </div>
        }
    ]

    const handleChange = (selectList) => {
        const currentData = []
        for (const selectedRow of selectList.selectedRows) {
            currentData.push(selectedRow?.id)
        }
        setIdData(currentData)
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h4>Ma'lumotlar</h4>
                <div className="d-flex gap-1 align-items-center">
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
                                const data = {
                                    limit: query?.limit || 0,
                                    ...query
                                }
                                data.limit = val.value
                                history.push({
                                    search: qs.stringify({
                                        ...data
                                    })
                                })
                            }}
                        />
                    </div>
                    {idData.length > 0 &&
                        <Button onClick={() => toggleModal('isDeleteList')} className="btn-icon" outline color="danger">
                            <Trash2 size={16}/>
                        </Button>}
                    <Button onClick={() => toggleModal('filter')} className="btn-icon" outline color="primary">
                        <Filter size={16}/>
                    </Button>
                    <Button className="btn-icon" onClick={() => toggleModal('create')} outline color="primary">
                        <Plus size={16}/>
                    </Button>
                    <Button className="btn-icon" onClick={() => toggleModal('isUpload')} outline color="primary">
                        <Upload size={16}/>
                    </Button>
                    <Button className="btn-icon" onClick={() => toggleModal('isDownload')} outline color="primary">
                        <Download size={16}/>
                    </Button>
                </div>
            </div>
            <div className="d-flex justify-content-center w-100 text-center mt-2">
                <p>Valyuta kursi NBU bankining {currencies?.find(item => item.Ccy === "USD")?.Date} ma'lumotiga
                    ko'ra: {dollarCur} Sum</p>
            </div>
            <div>
                <TableComponent
                    progressPending={isLoading}
                    data={products}
                    sortServer
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    columns={basicColumns}
                    size={products.length}
                    limit={limit}
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateProduct modal={modals.create} toggleModal={() => toggleModal('create')} storeId={storeId}/>
            <FilterProduct open={modals.filter} handleFilter={() => toggleModal('filter')} storeId={storeId}/>
            <UploadProduct modal={modals.isUpload} toggleModal={() => toggleModal('isUpload')} storeId={storeId}/>
            <DownloadProduct modal={modals.isDownload} toggleModal={() => toggleModal('isDownload')} storeId={storeId}/>
            <DeleteModal modal={modals.isDeleteList} toggleModal={() => toggleModal('isDeleteList')}
                         onFunction={() => dispatch(deleteProductList(idData))}/>
        </div>
    )
}