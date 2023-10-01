import React from "react"
import {useSelector} from "react-redux"

export default function FoundOrganizationById({id}) {

    const {organizationList} = useSelector(state => state.admin)

    return (
        <>
            {organizationList?.map(item => (item?.id === id ? item?.name : ""))}
        </>
    )
}