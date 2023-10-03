import React from "react"
import {Button, Form, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader} from "reactstrap"
import {useFormik} from "formik"
import qs from "qs"
import {useHistory, useLocation} from "react-router-dom"

const FilterUser = ({
                    open,
                    handleFilter
                }) => {

    const history = useHistory()
    const location = useLocation()

    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const formik = useFormik({
        initialValues: {},
        onSubmit: (val, {resetForm}) => {
            history.push({
                search: qs.stringify({
                    ...query,
                    search: val?.sellerName
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
                    <div className='mb-1'>
                        <Label className='form-label' for='sellerName'>
                            Ismi
                        </Label>
                        <Input
                            type={"text"}
                            id={"sellerName"}
                            name={"sellerName"}
                            placeholder={"Ismi bo'yiha qidiruv..."}
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

export default FilterUser