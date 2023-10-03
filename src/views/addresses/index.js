import React, {useEffect, useState} from 'react'
import TableComponent from "../../components/Table"
import DateFormatClock from "../../components/DateFormatClock"
import {Plus} from "react-feather"
import {Button} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"
import {BiEdit, BiTrash} from "react-icons/bi"
import {BsEye} from "react-icons/bs"
import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import CreateAddress from "./create-address"
import {deleteAddress, getAddresses, setAddress} from "../../redux/reducers/address"
import Select from "react-select"

export default function Stores() {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {
        addresses,
        currentPage,
        pageCount,
        limit,
        totalCount,
        isLoading
    } = useSelector(state => state.addresses)

    const [createModal, setCreateModal] = useState(false)
    const toggleCreate = () => setCreateModal(!createModal)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    useEffect(() => {
        if (location.search) {
            dispatch(getAddresses({...query}))
        } else {
            dispatch(getAddresses())
        }
    }, [location])

    function editAddress(currentAddress) {
        dispatch(setAddress(currentAddress))
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
            name: "Nomi",
            width: '180px',
            wrap: true,
            selector: (row) => row.adressName
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
                <BiEdit className={'text-warning cursor-pointer'} size={20} onClick={() => editAddress(row)}/>
                <BiTrash className={'text-danger cursor-pointer'} size={20}
                         onClick={() => dispatch(deleteAddress(row?.id))}/>
            </div>
        }
    ]

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Ma'lumotlar</h4>
                <div className="d-flex gap-1">
                    <Select
                        id="adressId"
                        name="adressId"
                        placeholder="Tanlang..."
                        options={[
                            {value: 10},
                            {value: 15},
                            {value: 20},
                            {value: 25}
                        ]}
                        // defaultValue={{
                        //     label: addresses.find(item => item.id === product?.adressId)?.adressName,
                        //     value: product?.adressId
                        // }}
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
                    <Button className="btn-icon" onClick={toggleCreate} outline color="primary">
                        <Plus size={16}/>
                    </Button>
                </div>
            </div>
            <div>
                <TableComponent
                    progressPending={isLoading}
                    data={addresses}
                    columns={basicColumns}
                    size={addresses.length}
                    limit={limit}
                    totalPages={pageCount}
                    currentPage={currentPage}
                    total_count={totalCount}
                />
            </div>
            <CreateAddress toggleModal={toggleCreate} modal={createModal}/>
        </div>
    )
}