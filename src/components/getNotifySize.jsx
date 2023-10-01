import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import * as notify from "../redux/reducers/operator/notify"

export default function GetNotifySize() {

    const dispatch = useDispatch()
    const {notifySize} = useSelector(state => state.notify)

    useEffect(() => {
        dispatch(notify.getNotifyList({}))
    }, [])

    return notifySize
}