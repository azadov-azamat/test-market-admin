import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Download, Filter, Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {BsEye} from "react-icons/bs"
import {useHistory, useLocation} from "react-router-dom"
import {deleteClient, getClients, sendSmsClients, setClient} from "../../redux/reducers/user"
import qs from "qs"
import CreateUser from "./create-user"
import Select from "react-select"
import FilterUser from "./Filter"
import DateFormat from "../../components/DateFormat"
import {MdOutlineSendToMobile} from "react-icons/md"
import {unwrapResult} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import {useDownload} from "../../utility/hooks/useDownload"

export default function Clients() {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        clients,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.users)

    const [createModal, setCreateModal] = useState(false)
    const [filter, setFilter] = useState(false)
    const [idData, setIdData] = useState([])

    const handleFilter = () => setFilter(!filter)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (location.search) {
            dispatch(getClients({...query}))
        } else {
            dispatch(getClients())
        }
    }, [location])

    function editUser(currentUser) {
        dispatch(setClient(currentUser))
        toggleCreate()
    }

    const basicColumns = [
        {
            width: '50px',
            wrap: true,
            cell: (row) => <>
                <BsEye className={'text-success cursor-pointer'} size={20}
                       onClick={() => history.push(`/administrator/client/${row.id}`)}/>
            </>
        },
        {
            name: "F.I.O",
            width: '200px',
            sortable: true,
            sortField: "clientName",
            wrap: true,
            selector: (row) => row.clientName
        },
        {
            name: 'Telefon raqam',
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "clientPhone",
            selector: (row) => row.clientPhone
        },
        {
            name: 'Manzili',
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "clientAdress",
            selector: (row) => row.clientAdress
        },
        {
            name: "To'lov sanasi",
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "clientPaymentDate",
            selector: (row) => <DateFormat current_date={row.clientPaymentDate}/>
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
                <BiEdit className={'text-warning cursor-pointer'} size={20} onClick={() => editUser(row)}/>
                <BiTrash className={'text-danger cursor-pointer'} size={20}
                         onClick={() => dispatch(deleteClient(row?.id))}/>
            </div>
        }
    ]

    const handleChange = (selectedRows) => {
        console.log(selectedRows)
        const data = []
        for (const selectedRow of selectedRows?.selectedRows) {
            data.push(selectedRow?.id)
        }
        setIdData(data)
        // setSelectColumn(selectedRows?.selectedRows)
    }

    function handleSend() {
        if (idData.length !== 0) {
            dispatch(sendSmsClients(idData)).then(unwrapResult)
                .then(() => {
                    toast.success("Mijozlarga sms jo'natildi")
                })
                .catch(() => {
                    toast.error("Jo'natishda xatolik, Iltimos qayta urinib ko'ring")
                })
        }
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
                    {/*<div*/}
                    {/*    className="">*/}
                    {/*    <a href={`${BASE_URL}/clients/file`} className={'cursor-pointer'}>*/}
                    {/*        <Download size={25}/>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    <Button onClick={() => useDownload(`clients/file`)} className="btn-icon" outline color="primary">
                        <Download size={16}/>
                    </Button>
                    <Button onClick={handleFilter} className="btn-icon" outline color="primary">
                        <Filter size={16}/>
                    </Button>
                    <Button onClick={handleSend} disabled={idData.length === 0} className="btn-icon" outline
                            color="primary">
                        <MdOutlineSendToMobile size={20}/>
                    </Button>
                    <Button className="btn-icon" onClick={toggleCreate} outline color="primary">
                        <Plus size={16}/>
                    </Button>
                </div>
            </div>
            <div>
                <TableComponent
                    progressPending={isLoading}
                    data={clients}
                    columns={basicColumns}
                    size={clients.length}
                    limit={limit}
                    sortServer
                    totalPages={pageCount}
                    currentPage={currentPage}
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    total_count={totalCount}
                />
            </div>
            <CreateUser toggleModal={toggleCreate} modal={createModal}/>
            <FilterUser handleFilter={handleFilter} open={filter}/>
        </div>
    )
}