import React from "react"
import {Button, Form, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader} from "reactstrap"
import {useFormik} from "formik"
import qs from "qs"
import {useHistory, useLocation} from "react-router-dom"

const FilterPayment = ({
                           open,
                           handleFilter
                       }) => {

    const history = useHistory()
    const location = useLocation()

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
            delete val?.date_apply_from
            delete val?.date_apply_to
            history.push({
                search: qs.stringify({
                    ...query,
                    ...data,
                    search: val?.firmName,
                    filter: JSON.stringify({
                        firmINN: val?.firmINN
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
                        <Label className="form-label" for="firmName">
                            Korxona nomi
                        </Label>
                        <Input
                            type={"text"}
                            id={"firmName"}
                            name={"firmName"}
                            placeholder={"Belgilangan korxona nomini kiriting..."}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="mb-1">
                        <Label className="form-label" for="firmINN">
                            Korxona INN
                        </Label>
                        <Input
                            type={"number"}
                            id={"firmINN"}
                            name={"firmINN"}
                            placeholder={"Tegishli korxona INN kiriting..."}
                            onChange={formik.handleChange}
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

export default FilterPayment