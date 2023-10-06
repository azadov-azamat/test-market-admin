import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Download, Filter, Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {BsEye} from "react-icons/bs"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import CreateProduct from "./create-product"
import {deleteProduct, getProducts, setProduct} from "../../redux/reducers/product"
import {getAddresses} from "../../redux/reducers/address"
import Select from "react-select"
import FilterProduct from "./Filter"
import {BASE_URL} from "../../utility/Utils"
import DownloadProduct from "./download-product"

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

    const [createModal, setCreateModal] = useState(false)
    const [filter, setFilter] = useState(false)
    const [isDownload, setDownload] = useState(false)
    const handleFilter = () => setFilter(!filter)
    const handleDownload = () => setDownload(!isDownload)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (storeId) {
            history.push({
                search: qs.stringify({
                    filter: {storeId}
                })
            })
        }
    }, [storeId])

    useEffect(() => {
        dispatch(getProducts({...query}))
    }, [location])

    useEffect(() => {
        dispatch(getAddresses())
    }, [])

    function editProduct(currentProduct) {
        dispatch(setProduct(currentProduct))
        toggleCreate()
    }

    const basicColumns = [
        // {
        //     width: '50px',
        //     wrap: true,
        //     cell: () => <>
        //         <BsEye className={'text-success cursor-pointer'} size={20}/>
        //     </>
        // },
        {
            name: "Nomi",
            width: '250px',
            sortable: true,
            sortField: "productName",
            // wrap: true,
            selector: (row) => row.productName
        },
        {
            name: "Narxi",
            width: '100px',
            sortable: true,
            sortField: "productPrice",
            wrap: true,
            selector: (row) => `${row.productPrice} sum`
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
                                history.push({
                                    search: qs.stringify({
                                        limit: val?.value,
                                        ...query
                                    })
                                })
                            }}
                        />
                    </div>
                    <Button onClick={handleFilter} className="btn-icon" outline color="primary">
                        <Filter size={16}/>
                    </Button>
                    <Button className="btn-icon" onClick={toggleCreate} outline color="primary">
                        <Plus size={16}/>
                    </Button>
                    <Button className="btn-icon" onClick={handleDownload} outline color="primary">
                        <Download size={16}/>
                    </Button>
                </div>
            </div>
            <div>
                <TableComponent
                    progressPending={isLoading}
                    data={products}
                    sortServer
                    columns={basicColumns}
                    size={products.length}
                    limit={limit}
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateProduct toggleModal={toggleCreate} modal={createModal} storeId={storeId}/>
            <FilterProduct handleFilter={handleFilter} open={filter} storeId={storeId}/>
            <DownloadProduct toggleModal={handleDownload} modal={isDownload}/>
        </div>
    )
}