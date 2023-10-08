import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {Card, CardBody} from "reactstrap"
import {getFirmById} from "../../redux/reducers/firms"
import Currencies from "../currencies"

export default function ViewFirm() {

    const {id} = useParams()
    const dispatch = useDispatch()

    const {firm} = useSelector(state => state.firms)

    useEffect(() => {
        dispatch(getFirmById(id))
    }, [id])

    useEffect(() => {
        return () => {
            dispatch({
                type: 'firm/getFirmById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [])

    return (
        <div>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-center">
                        <span><b>{firm?.firmName} / {firm?.firmINN}</b> ga tegishli hisobot</span>
                    </div>
                </CardBody>
            </Card>
            <Currencies firmId={id}/>
        </div>
    )
}