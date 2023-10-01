import {Link} from 'react-router-dom'

import {Button} from 'reactstrap'

import {useSkin} from '@hooks/useSkin'

import '@styles/base/pages/page-misc.scss'
// import logo from "../assets/images/logo/logo.png"
const NotAuthorized = () => {

    const {skin} = useSkin()

    const illustration = skin === 'dark' ? 'not-authorized-dark.svg' : 'not-authorized.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    return (
        <div className='misc-wrapper'>
            <Link className='brand-logo d-flex align-items-center' to='/'>
                {/*<img src={logo} alt="" width={75}/>*/}
                <h2 className='brand-text text-primary ms-1'>Lochin</h2>
            </Link>
            <div className='misc-inner p-2 p-sm-3'>
                <div className='w-100 text-center'>
                    <h2 className='mb-1'>Siz avtorizatsiyadan o`tmagansiz! 🔐</h2>
                    {/*<p className='mb-2'>*/}
                    {/*    Ishlab chiqilgan tizim <a href="https://id.egov.uz/uz">id.egov.uz</a> portali orqali ro`yhatdan o`tmaganlar uchun yopiq hisoblanadi*/}
                    {/*</p>*/}
                    <Button tag={Link} to={"/home"} color='primary' className='btn-sm-block mb-1'>
                        Ortga qaytish
                    </Button>
                    <img className='img-fluid' src={source} alt='Not authorized page'/>
                </div>
            </div>
        </div>
    )
}
export default NotAuthorized