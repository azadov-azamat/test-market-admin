import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Filter, Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import CreatePayment from "./create-payment"
import Select from "react-select"
import {deletePayment, getPayments, setPayment} from "../../redux/reducers/payment"
import {handleSwitchPayType} from "../../utility/Utils"
import FilterPayment from "./Filter"

export default function Payments() {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        payments,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.payments)

    const [createModal, setCreateModal] = useState(false)
    const [filter, setFilter] = useState(false)
    // const [amount, setAmount] = useState(0)
    const handleFilter = () => setFilter(!filter)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    // useEffect(() => {
    //     if (payments) {
    //         let num = 0
    //         payments.forEach(item => {
    //             num += item?.paymentAmount
    //         })
    //         setAmount(num)
    //     }
    // }, [payments])

    useEffect(() => {
        if (location.search) {
            dispatch(getPayments({...query}))
        } else {
            dispatch(getPayments())
        }
    }, [location])

    function editPayment(currentUser) {
        dispatch(setPayment(currentUser))
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
            name: "Summa",
            width: '200px',
            sortable: true,
            sortField: "paymentAmount",
            wrap: true,
            selector: (row) => <>{row.paymentAmount} sum</>
        },
        {
            name: "To'lov turi",
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "paymentType",
            selector: (row) => handleSwitchPayType(row.paymentType)
        },
        {
            name: "Ro'yxatdan o'tgan vaqt",
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
                <BiEdit className={'text-warning cursor-pointer'} size={20} onClick={() => editPayment(row)}/>
                <BiTrash className={'text-danger cursor-pointer'} size={20}
                         onClick={() => dispatch(deletePayment(row?.id))}/>
            </div>
        }
    ]

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
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
                </div>
            </div>
            <div>
                <TableComponent
                    progressPending={isLoading}
                    data={payments}
                    columns={basicColumns}
                    size={payments.length}
                    limit={limit}
                    sortServer
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreatePayment toggleModal={toggleCreate} modal={createModal}/>
            <FilterPayment handleFilter={handleFilter} open={filter}/>
        </div>
    )
}