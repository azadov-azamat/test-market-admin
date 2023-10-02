import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {BsEye} from "react-icons/bs"
import {useLocation} from "react-router-dom"
import qs from "qs"
import CreateProduct from "./create-product"
import {deleteProduct, getProducts, setProduct} from "../../redux/reducers/product"

export default function Product({storeId}) {

    const dispatch = useDispatch()
    // const history = useHistory()
    const location = useLocation()
    const {
        products,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.products)

    const [createModal, setCreateModal] = useState(false)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (location.search) {
            dispatch(getProducts({...query}))
        } else {
            dispatch(getProducts())
        }
    }, [location])

    function editProduct(currentProduct) {
        dispatch(setProduct(currentProduct))
        toggleCreate()
    }

    console.log(storeId)

    const basicColumns = [
        {
            width: '50px',
            wrap: true,
            cell: () => <>
                <BsEye className={'text-success cursor-pointer'} size={20}/>
            </>
        },
        {
            name: "Nomi",
            width: '100px',
            wrap: true,
            selector: (row) => row.productName
        },
        {
            name: "Narxi",
            width: '100px',
            wrap: true,
            selector: (row) => `${row.productPrice} sum`
        },
        {
            name: "Miqdori",
            width: '100px',
            wrap: true,
            selector: (row) => `${row.productQuantity} ${row.productMeasure}`
        },
        // {
        //     name: "Do'koni",
        //     width: '100px',
        //     wrap: true,
        //     selector: (row) => `${row?.storeId}`
        // },
        {
            name: "Manzili",
            width: '100px',
            wrap: true,
            selector: (row) => `${row?.adressId}`
        },
        {
            name: "Modeli",
            width: '100px',
            wrap: true,
            selector: (row) => row.productModel
        },
        {
            name: "Ro'yxatga olingan vaqt",
            width: '200px',
            wrap: true,
            selector: (row) => <DateFormatClock current_date={row.createdAt}/>
        },
        {
            name: "O'zgartirish kiritilgan vaqt",
            width: '200px',
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
            <div className="d-flex items-center justify-content-between">
                <h4>Ma'lumotlar</h4>
                <div className="d-flex gap-1">
                    <Button className="btn-icon" onClick={toggleCreate} outline color="primary">
                        <Plus size={16}/>
                    </Button>
                </div>
            </div>
            <div>
                <TableComponent
                    progressPending={isLoading}
                    data={products.filter(item => item.storeId === storeId)}
                    columns={basicColumns}
                    size={products.length}
                    limit={limit}
                    totalPage s={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateProduct toggleModal={toggleCreate} modal={createModal} storeId={storeId}/>
        </div>
    )
}