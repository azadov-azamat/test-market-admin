import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import React, {useEffect} from "react"
import {getSaleById} from "../../redux/reducers/sale"
import {Row} from "reactstrap"

export default function ViewSales() {

    const {id} = useParams()
    const dispatch = useDispatch()

    const {sale} = useSelector(state => state.sales)

    console.log(sale)

    useEffect(() => {
        dispatch(getSaleById(id))

        return () => {
            dispatch({
                type: 'sale/getSaleById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [])

    return (
        <Row md={2} xl={3} className={"row-cols-1"}>

        </Row>
    )
}