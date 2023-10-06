import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Filter, Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {BsEye} from "react-icons/bs"
import {useHistory, useLocation} from "react-router-dom"
import {deleteUser, getUsers, setUser} from "../../redux/reducers/user"
import qs from "qs"
import CreateUser from "./create-user"
import Select from "react-select"
import FilterUser from "./Filter"

export default function Users() {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        users,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.users)
    const {userData} = useSelector(state => state.auth)

    const [createModal, setCreateModal] = useState(false)
    const [filter, setFilter] = useState(false)
    const handleFilter = () => setFilter(!filter)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (location.search) {
            dispatch(getUsers({...query}))
        } else {
            dispatch(getUsers())
        }
    }, [location])

    function editUser(currentUser) {
        dispatch(setUser(currentUser))
        toggleCreate()
    }


    const basicColumns = [
        {
            width: '50px',
            wrap: true,
            cell: () => <>
                <BsEye className={'text-success cursor-pointer'} size={20}/>
            </>
        },
        {
            name: "F.I.O",
            width: '200px',
            sortable: true,
            sortField: "sellerName",
            wrap: true,
            selector: (row) => row.sellerName
        },
        {
            name: 'Telefon raqam',
            width: '200px',
            wrap: true,
            sortable: true,
            sortField: "sellerPhone",
            selector: (row) => row.sellerPhone
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
            cell: (row) => <div className={`d-flex gap-1 ${row?.id === userData?.id && "hidden"}`}>
                <BiEdit className={'text-warning cursor-pointer'} size={20} onClick={() => editUser(row)}/>
                <BiTrash className={'text-danger cursor-pointer'} size={20}
                         onClick={() => dispatch(deleteUser(row?.id))}/>
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
                    data={users}
                    columns={basicColumns}
                    size={users.length}
                    limit={limit}
                    sortServer
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateUser toggleModal={toggleCreate} modal={createModal}/>
            <FilterUser handleFilter={handleFilter} open={filter}/>
        </div>
    )
}