import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Filter, Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import CreateCurrency from "./create-currency"
import Select from "react-select"
import FilterPayment from "./Filter"
import {deleteCurrency, getCurrencies, setCurrency} from "../../redux/reducers/currency"

export default function Currencies({firmId}) {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        currencies,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.currencies)

    const [createModal, setCreateModal] = useState(false)
    const [filter, setFilter] = useState(false)

    const handleFilter = () => setFilter(!filter)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {

        if (location.search) {
            dispatch(getCurrencies({...query}))
        } else {
            dispatch(getCurrencies({filter: JSON.stringify({firmId})}))
        }

        return () => {
            dispatch({
                type: 'currency/getCurrencies/fulfilled',
                payload: {
                    data: []
                }
            })
        }
    }, [location])

    function editItem(item) {
        dispatch(setCurrency(item))
        toggleCreate()
    }

    const basicColumns = [
        {
            name: "Summa",
            width: '200px',
            sortable: true,
            sortField: "currencyMoney",
            wrap: true,
            selector: (row) => row?.currencyMoney
        },
        {
            name: "Izoh",
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "currencyOption",
            selector: (row) => row?.currencyOption
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
                <BiEdit className={'text-warning cursor-pointer'} size={20} onClick={() => editItem(row)}/>
                <BiTrash className={'text-danger cursor-pointer'} size={20}
                         onClick={() => dispatch(deleteCurrency(row?.id))}/>
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
                    data={currencies}
                    columns={basicColumns}
                    size={currencies.length}
                    limit={limit}
                    sortServer
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateCurrency toggleModal={toggleCreate} modal={createModal} firmId={firmId}/>
            <FilterPayment handleFilter={handleFilter} open={filter} firmId={firmId}/>
        </div>
    )
}