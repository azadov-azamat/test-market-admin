import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Filter, Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import CreateFirm from "./create-firm"
import Select from "react-select"
import FilterPayment from "./Filter"
import {deleteFirm, getFirms, setFirm} from "../../redux/reducers/firms"
import {BsEye} from "react-icons/bs"

export default function Firms() {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        firms,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.firms)

    const [createModal, setCreateModal] = useState(false)
    const [filter, setFilter] = useState(false)

    const handleFilter = () => setFilter(!filter)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (location.search) {
            dispatch(getFirms({...query}))
        } else {
            dispatch(getFirms())
        }
        return () => {
            dispatch({
                type: 'firm/getFirms/fulfilled',
                payload: {
                    data: []
                }
            })
        }

    }, [location])

    function editItem(item) {
        dispatch(setFirm(item))
        toggleCreate()
    }


    const basicColumns = [
        {
            width: '50px',
            wrap: true,
            cell: (row) => <>
                <BsEye className={'text-success cursor-pointer'} size={20}
                       onClick={() => history.push(`/administrator/firm/${row?.id}`)}/>
            </>
        },
        {
            name: "Nomi",
            width: '200px',
            sortable: true,
            sortField: "firmName",
            wrap: true,
            selector: (row) => row?.firmName
        },
        {
            name: "INN",
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "firmINN",
            selector: (row) => row?.firmINN
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
                         onClick={() => dispatch(deleteFirm(row?.id))}/>
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
                    data={firms}
                    columns={basicColumns}
                    size={firms.length}
                    limit={limit}
                    sortServer
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateFirm toggleModal={toggleCreate} modal={createModal}/>
            <FilterPayment handleFilter={handleFilter} open={filter}/>
        </div>
    )
}