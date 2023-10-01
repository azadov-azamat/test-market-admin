// ** React Imports
import {Link} from 'react-router-dom'

// ** Custom Components
// ** Utils
// import { isUserLoggedIn } from '@utils'
// ** Third Party Components
import {Power, Settings, User} from 'react-feather'

// ** Reactstrap Imports
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'

// ** Default Avatar Image
// import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import {handleLogout} from "../../../../redux/reducers/auth"
import {useDispatch} from "react-redux"
import {TOKEN} from "../../../../utility/Utils"

const UserDropdown = () => {
    // ** State
    // const [userData] = useState(null)
    const dispatch = useDispatch()
    // const userData = JSON.parse(localStorage.getItem(USER_DATA))
    // const token/ = localStorage.getItem(TOKEN)

    // useEffect(() => {
    //     if (token !== null && userData === null) {
    //         localStorage.setItem(USER_DATA, JSON.stringify(jwt(token)?.user_info))
    //     }
    // }, [token, userData])
    //** ComponentDidMount
    // useEffect(() => {
    //   if (isUserLoggedIn() !== null) {
    //     setUserData(JSON.parse(localStorage.getItem('userData')))
    //   }
    // }, [])

    //** Vars
    // const userAvatar = (userData && userData.avatar) || defaultAvatar

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={e => e.preventDefault()}>
                <div className="user-nav text-center d-flex flex-column align-items-center">
                    {/*<p className='user-name fw-bolder'>{userData?.name}</p>*/}
                    {/*<b className='user-status'>{userData?.organization?.name}</b>*/}
                    {/*<span className='user-status'>{userData?.role?.name}</span>*/}
                </div>
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem tag="a" href="/pages/profile" onClick={e => e.preventDefault()}>
                    <User size={14} className="me-75"/>
                    <span className="align-middle">Profil</span>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem tag="a" href="/pages/account-settings" onClick={e => e.preventDefault()}>
                    <Settings size={14} className="me-75"/>
                    <span className="align-middle">Sozlash</span>
                </DropdownItem>
                <DropdownItem tag={Link} to={"/home"} onClick={() => dispatch(handleLogout())}>
                    <Power size={14} className="me-75"/>
                    <span className="align-middle">Chiqish</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
