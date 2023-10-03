import React from "react"
import {Button, Form, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader} from "reactstrap"
import {useFormik} from "formik"
import qs from "qs"
import {useHistory, useLocation} from "react-router-dom"

const FilterProduct = ({
                    open,
                    handleFilter,
    storeId
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
                    search: val?.productName
                })
            })
            resetForm({values: ''})
            handleFilter()
        }
    })

    function clearable() {
        history.push({
            search: qs.stringify({
                filter: {storeId}
            })
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
                        <Label className='form-label' for='productName'>
                            Nomi/Modeli
                        </Label>
                        <Input
                            type={"text"}
                            id={"productName"}
                            name={"productName"}
                            placeholder={"Nomi yoki modeli bo'yiha qidiruv..."}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {/*<div className='mb-1'>*/}
                    {/*    <Label className='form-label' for='activity_type'>*/}
                    {/*        Arizachi turi*/}
                    {/*    </Label>*/}
                    {/*    <ReactSelect*/}
                    {/*        isClearable={true}*/}
                    {/*        name="person_type"*/}
                    {/*        className='react-select'*/}
                    {/*        classNamePrefix='select'*/}
                    {/*        placeholder={"Tanlang..."}*/}
                    {/*        getOptionLabel={(option) => option.label}*/}
                    {/*        getOptionValue={(option) => option.value}*/}
                    {/*        options={[*/}
                    {/*            {label: 'Jismoniy Shaxs', value: 'PHYSICAL_PERSON'},*/}
                    {/*            {label: 'Yuridik Shaxs', value: 'LEGAL_ENTITY'}*/}
                    {/*        ]}*/}
                    {/*        onChange={(option) => {*/}
                    {/*            formik.setFieldValue("person_type", option?.value)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className='mb-1'>*/}
                    {/*    <Label className='form-label' for='status'>*/}
                    {/*        Ashyo holati*/}
                    {/*    </Label>*/}
                    {/*    <ReactSelect*/}
                    {/*        id={"status"}*/}
                    {/*        isClearable={true}*/}
                    {/*        name="status"*/}
                    {/*        className='react-select'*/}
                    {/*        classNamePrefix='select'*/}
                    {/*        placeholder={"Tanlang..."}*/}
                    {/*        getOptionLabel={(option) => option.label}*/}
                    {/*        getOptionValue={(option) => option.value}*/}
                    {/*        options={[*/}
                    {/*            {label: 'Topilma', value: FOUND},*/}
                    {/*            {label: 'Egasiga topshirilgan', value: 'FOUND_GIVEN_OWNER'},*/}
                    {/*            {label: 'Topib olgan shaxsga qaytarildi', value: 'FOUND_OBJ_GIVEN_FOUNDER'},*/}
                    {/*            {label: 'Tegishli tashkilotga yuborilgan', value: 'FOUND_SEND_DOC_TO_GIVEN_ENTITY'},*/}
                    {/*            {label: 'Auksionga joylangan', value: PUT_AUCTION},*/}
                    {/*            {label: 'Auksionda sotilgan', value: SOLD_AUCTION},*/}
                    {/*            {label: 'Arxivga yuborilgan', value: 'FOUND_SEND_DOC_TO_ARCHIVE'},*/}
                    {/*            {label: 'Hujjat yo`q qilingan', value: 'FOUND_SEND_DOC_TO_DESTROY_AFTER_EXPERTIZE'},*/}
                    {/*            {label: 'Davlat mulkiga o`tkazilgan', value: 'FOUND_OBJ_STATE_PROPERTY'},*/}
                    {/*            {label: 'Topilgan shaxsni xabardor qilish', value: 'FOUND_OBJ_INFORM_FOUNDER'}*/}
                    {/*        ]}*/}
                    {/*        onChange={(option) => {*/}
                    {/*            formik.setFieldValue("status", option?.value)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className='mb-1'>*/}
                    {/*    <Label className='form-label' for='type'>*/}
                    {/*        Ashyo turi*/}
                    {/*    </Label>*/}
                    {/*    <ReactSelect*/}
                    {/*        id={"type"}*/}
                    {/*        isClearable={true}*/}
                    {/*        name="type"*/}
                    {/*        className='react-select'*/}
                    {/*        classNamePrefix='select'*/}
                    {/*        placeholder={"Tanlang..."}*/}
                    {/*        getOptionLabel={(option) => option.label}*/}
                    {/*        getOptionValue={(option) => option.value}*/}
                    {/*        options={[*/}
                    {/*            {label: 'Hujjat', value: 'DOCUMENT'},*/}
                    {/*            {label: 'Buyum', value: 'THING'}*/}
                    {/*        ]}*/}
                    {/*        onChange={(option) => {*/}
                    {/*            formik.setFieldValue("type", option?.value)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className='mb-1'>*/}
                    {/*    <Label className='form-label' for='sub_type_id'>*/}
                    {/*        Ashyo tipi*/}
                    {/*    </Label>*/}
                    {/*    <ReactSelect*/}
                    {/*        id={"sub_type_id"}*/}
                    {/*        isClearable={true}*/}
                    {/*        name="sub_type_id"*/}
                    {/*        className='react-select'*/}
                    {/*        classNamePrefix='select'*/}
                    {/*        options={materialSubType?.filter(item => item.type === formik.values?.type)}*/}
                    {/*        getOptionLabel={(option) => option.name_uz}*/}
                    {/*        getOptionValue={(option) => option.id}*/}
                    {/*        onChange={(option) => {*/}
                    {/*            formik.setFieldValue("sub_type_id", option?.id)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className='mb-1'>*/}
                    {/*    <Label className='form-label' for='region_code'>*/}
                    {/*        Viloyatni tanlang*/}
                    {/*    </Label>*/}
                    {/*    <ReactSelect*/}
                    {/*        id={"region_code"}*/}
                    {/*        options={regions}*/}
                    {/*        isClearable={true}*/}
                    {/*        name="region_code"*/}
                    {/*        className='react-select'*/}
                    {/*        classNamePrefix='select'*/}
                    {/*        getOptionLabel={option => option.name_uz}*/}
                    {/*        getOptionValue={option => option.code}*/}
                    {/*        onFocus={() => dispatch(soato.getRegionsList())}*/}
                    {/*        onChange={(option) => {*/}
                    {/*            formik.setFieldValue("region_code", option?.code)*/}
                    {/*            if (option?.code !== undefined) {*/}
                    {/*                dispatch(soato.getSubRegionsListByRegionId(option?.code))*/}
                    {/*            } else {*/}
                    {/*                dispatch({type: "soato/getSubRegionListByRegionId/fulfilled", payload: []})*/}
                    {/*            }*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className='mb-1'>*/}
                    {/*    <Label className='form-label' for='district_code'>*/}
                    {/*        Tumanni tanlang*/}
                    {/*    </Label>*/}
                    {/*    <ReactSelect*/}
                    {/*        id={"district_code"}*/}
                    {/*        isDisabled={subRegion?.length === 0}*/}
                    {/*        isClearable={true}*/}
                    {/*        onChange={(option) => {*/}
                    {/*            formik.setFieldValue("district_code", option?.code)*/}
                    {/*        }}*/}
                    {/*        options={subRegion}*/}
                    {/*        getOptionLabel={option => option.name_uz}*/}
                    {/*        getOptionValue={option => option.code}*/}
                    {/*        name="register_type"*/}
                    {/*        className='react-select'*/}
                    {/*        classNamePrefix='select'*/}
                    {/*    />*/}

                    {/*</div>*/}
                    {/*<div className={"mb-1"}>*/}
                    {/*    <Label className='form-label' for='date_apply_from'>*/}
                    {/*        Boshlang`ich vaqt*/}
                    {/*    </Label>*/}
                    {/*    <Input*/}
                    {/*        type={"date"}*/}
                    {/*        id={"date_apply_from"}*/}
                    {/*        name={"date_apply_from"}*/}
                    {/*        placeholder={'Kiriting...'}*/}
                    {/*        onChange={formik.handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className={"mb-1"}>*/}
                    {/*    <Label className='form-label' for='date_apply_to'>*/}
                    {/*        Tugash vaqt*/}
                    {/*    </Label>*/}
                    {/*    <Input*/}
                    {/*        type={"date"}*/}
                    {/*        id={"date_apply_to"}*/}
                    {/*        name={"date_apply_to"}*/}
                    {/*        placeholder={'Kiriting...'}*/}
                    {/*        onChange={formik.handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="d-flex justify-content-between gap-1">
                        <Button type={"reset"} outline color="danger" onClick={clearable}>Tozalash</Button>
                        <Button type={"submit"} color="success">Qidirish</Button>
                    </div>
                </Form>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default FilterProduct