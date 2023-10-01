import { Offcanvas, OffcanvasHeader, OffcanvasBody, Label, Input, Form, Button, Row, Col } from "reactstrap"
import { useLocation, useHistory } from "react-router-dom"
import ReactSelect from "react-select"
import qs from 'qs'
import PropTypes from "prop-types"
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {useFormik} from "formik"

const Filter = ({ open, toggle, fields, dispatchUrl }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    // const defaultValue = qs.parse(location.search, { ignoreQueryPrefix: true })
    console.log(location.search, qs)
    useEffect(() => {
        dispatch(dispatchUrl)
    }, [])
    const formik = useFormik({
        initialValues: {},
        onSubmit: (val) => {
            history.push({
                search: qs.stringify({
                    ...val
                })
            })
        }
    })
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const formData = new FormData(event.target)
    //     const asString = new URLSearchParams(formData).toString()
    //     const query = qs.parse(asString, { ignoreQueryPrefix: true })
    //     Object.keys(query).forEach(key => {
    //         if (query[key] === '' || query[key] === null || query[key] === undefined) {
    //             delete query[key]
    //         }
    //     })
    //     const queryUrl = qs.stringify(query)
    //     history.push(`${location.pathname}?${queryUrl}`)
    //     // toggle()
    // }

    function clearable() {
        history.push({
            search: ''
        })
        toggle()
    }

    console.log(fields)
    return (
        <Offcanvas
            direction='end'
            isOpen={open}
            toggle={toggle}
        >
            <OffcanvasHeader toggle={toggle}>Ma'lumotlarni filter qilish</OffcanvasHeader>
            <OffcanvasBody>
                <Form onSubmit={formik.handleSubmit}>
                    {
                        fields?.map((field, index) => (
                            <>
                                {
                                    {
                                        INPUT: (
                                            <div key={index} className='mb-1'>
                                                <Label className='form-label' for={field?.props?.name}>
                                                    {field?.label}
                                                </Label>
                                                <Input
                                                    id={field?.props?.name}
                                                    type={field?.props?.type}
                                                    name={field?.props?.name}
                                                    placeholder={field?.props?.placeholder}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                        ),
                                        SELECT: (
                                            <div key={index} className='mb-1'>
                                                <Label className='form-label' for={field?.props?.name}>
                                                    {field?.label}
                                                </Label>
                                                <ReactSelect
                                                    id={field?.props?.name}
                                                    name={field?.props?.name}
                                                    isClearable={true}
                                                    className='react-select'
                                                    classNamePrefix='select'
                                                    placeholder={field?.props?.placeholder}
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                    options={field?.props?.options}
                                                    onChange={(option) => {
                                                        formik.setFieldValue(field?.props?.name, option?.value)
                                                    }}
                                                />
                                            </div>
                                        ),
                                        CHECKBOX: (
                                            <div key={index} className='mb-1'>
                                                <Label className='form-label' for={field?.props?.name}>
                                                    {field?.label}
                                                </Label>
                                                <Row xl={2}>
                                                    {
                                                        field?.options?.map((option, i) => (
                                                            <Col key={i} className="mb-1">
                                                                <Input type="checkbox" id={option?.value} name={option?.value} value={true} />
                                                                <label for={option?.value} className="ml-1">{option?.label}</label>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </div>
                                        ),
                                        RADIO: (
                                            <div key={index} className='mb-1'>
                                                <Label className='form-label' for={field?.props?.name}>
                                                    {field?.label}
                                                </Label>
                                                <Row xl={2}>
                                                    {
                                                        field?.options?.map((option, i) => (
                                                            <Col key={i} className="mb-1">
                                                                <Input type="radio" id={option?.value} {...field?.props} value={option?.value} />
                                                                <label for={option?.value} className="ml-1">{option?.label}</label>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </div>
                                        )
                                    }[field.field_type]
                                }
                            </>
                        ))
                    }
                    <div className="d-flex justify-content-between gap-1">
                        <Button type={"reset"} outline color="danger" onClick={clearable}>Tozalash</Button>
                        <Button type={"submit"} color="success">Qidirish</Button>
                    </div>
                </Form>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default Filter

Filter.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired
}