import React, {useEffect} from "react"
import {Button, Form, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader} from "reactstrap"
import {useFormik} from "formik"
import qs from "qs"
import {useHistory, useLocation} from "react-router-dom"
import Select from "react-select"
import {getClients, getUsers} from "../../redux/reducers/user"
import {useDispatch, useSelector} from "react-redux"

const FilterSales = ({
                         open,
                         handleFilter
                     }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const {
        users,
        clients
    } = useSelector(state => state.users)

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const formik = useFormik({
        initialValues: {},
        onSubmit: (val, {resetForm}) => {
            let data = {}
            if (val?.date_apply_from) {
                data = {
                    between: JSON.stringify({
                        createdAt: [val?.date_apply_from, val?.date_apply_to]
                    })
                }
            }
            history.push({
                search: qs.stringify({
                    ...query,
                    ...data,
                    filter: JSON.stringify({
                        ...val
                    })
                })
            })
            resetForm({values: ''})
            handleFilter()
        }
    })

    function clearable() {
        history.push({
            search: ""
        })
    }

    useEffect(() => {
        return () => {
            dispatch({
                type: 'app/getClients/fulfilled',
                payload: {
                    data: [],
                    currentPage: 0,
                    limit: 10,
                    pageCount: 0,
                    totalCount: 0
                }
            })
            dispatch({
                type: 'app/getUsers/fulfilled',
                payload: {
                    data: []
                }
            })
        }
    }, [])

    return (
        <Offcanvas
            direction="end"
            isOpen={open}
            toggle={handleFilter}
            style={{height: '100vh'}}
        >
            <OffcanvasHeader toggle={handleFilter}>Ma'lumotlarni filter qilish</OffcanvasHeader>
            <OffcanvasBody className="mx-0 flex-grow-0" style={{height: '100vh'}}>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-1">
                        <Label className="form-label" for="id">
                           ID
                        </Label>
                        <Input
                            type={"text"}
                            id={"id"}
                            name={"id"}
                            placeholder={"Savdo ID sini kiriting..."}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="mb-1">
                        <Label className="form-label" for="saleMainPrice">
                            Savdo summasi
                        </Label>
                        <Input
                            type={"text"}
                            id={"saleMainPrice"}
                            name={"saleMainPrice"}
                            placeholder={"Belgilangan savdo narxini kiriting..."}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="mb-1">
                        <Label className="form-label" for="saleSoldPrice">
                            Savdo summasi (chegirma)
                        </Label>
                        <Input
                            type={"text"}
                            id={"saleSoldPrice"}
                            name={"saleSoldPrice"}
                            placeholder={"Chegirmadan keyin qo'yilgan narxni kiriting..."}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="mb-1">
                        <Label className="form-label" for="saleDebt">
                            Qarz savdo
                        </Label>
                        <Select
                            id="saleDebt"
                            name="saleDebt"
                            placeholder="Qarz savdo bo'yicha..."
                            options={[
                                {
                                    value: true,
                                    label: "Ha"
                                },
                                {
                                    value: false,
                                    label: "Yo'q"
                                }
                            ]}

                            getOptionLabel={option => option.label}
                            getOptionValue={option => option.value}
                            onChange={(val) => {
                                formik.setFieldValue("saleDebt", val.value)
                            }}
                        />
                    </div>
                    {formik.values?.saleDebt && <div className="mb-1">
                        <Label className="form-label" for="clientId">
                            Qarzdor
                        </Label>
                        <Select
                            id="clientId"
                            name="clientId"
                            onFocus={() => {
                                dispatch(getClients({limit: 'all'}))
                            }}
                            placeholder="Qarzdor tanlang..."
                            options={clients}

                            getOptionLabel={option => option.clientName}
                            getOptionValue={option => option.id}
                            onChange={(val) => {
                                formik.setFieldValue("clientId", val.id)
                            }}
                        />
                    </div>}
                    <div className="mb-1">
                        <Label className="form-label" for="sellerId">
                            Sotuvchi
                        </Label>
                        <Select
                            id="sellerId"
                            name="sellerId"
                            onFocus={() => {
                                dispatch(getUsers({limit: 'all'}))
                            }}
                            placeholder="Sotuvchi tanlang..."
                            options={users}

                            getOptionLabel={option => option.sellerName}
                            getOptionValue={option => option.id}
                            onChange={(val) => {
                                formik.setFieldValue("sellerId", val.id)
                            }}
                        />
                    </div>
                    <div className={"mb-1"}>
                        <Label className="form-label" for="date_apply_from">
                            Boshlang`ich vaqt
                        </Label>
                        <Input
                            type={"date"}
                            id={"date_apply_from"}
                            name={"date_apply_from"}
                            placeholder={'Kiriting...'}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={"mb-1"}>
                        <Label className="form-label" for="date_apply_to">
                            Tugash vaqt
                        </Label>
                        <Input
                            type={"date"}
                            id={"date_apply_to"}
                            name={"date_apply_to"}
                            placeholder={'Kiriting...'}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-between gap-1">
                        <Button type={"reset"} outline color="danger" onClick={clearable}>Tozalash</Button>
                        <Button type={"submit"} color="success">Qidirish</Button>
                    </div>
                </Form>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default FilterSales