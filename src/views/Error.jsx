import {Link} from 'react-router-dom'

import {Button} from 'reactstrap'

import {useSkin} from '@hooks/useSkin'

import '@styles/base/pages/page-misc.scss'
import React from "react"
import logo from "../assets/images/logo/logo.png"

const Error = () => {

    const {skin} = useSkin()
    // const location = useLocation()

    const illustration = skin === 'dark' ? 'error-dark.svg' : 'error.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    // useEffect(() => {
    //     if (location?.pathname === "/administrator" || location?.pathname === "/operator" || location?.pathname === "/monitoring") {
    //         // if (localStorage.getItem(ROLE)) {
    //             window.location.reload()
    //         // }
    //     }
    // }, [location])

    return (
        <div className="misc-wrapper">
            <a className="brand-logo" href="/">
                <img width={200} src={logo} alt="topilmalar-logo"/>
            </a>
            <div className="misc-inner p-2 p-sm-3">
                <div className="w-100 text-center">
                    <h2 className="mb-1">Sahifa topilmadi 🕵🏻‍♀️</h2>
                    <p className="mb-2">Kechirasiz! 😖 Siz qidirgan URL bo`yicha serverda ma`lumot topilmadi</p>
                    <Button tag={Link} to="/home" color="primary" className="btn-sm-block mb-2">
                        Asosiy sahifa
                    </Button>
                    <img className="img-fluid" src={source} alt="Not authorized page"/>
                </div>
            </div>
        </div>
    )
}
export default Error
// https://t.me/azamat_azadov