// ** React Imports
import {useHistory} from 'react-router-dom'

// ** Icons Imports
// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import {Button, Card, CardBody, CardText, CardTitle, Form, Input, Label} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import {INPUT_MSG, TOKEN} from "../../utility/Utils"
import {useFormik} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import {unwrapResult} from "@reduxjs/toolkit"
import {login} from "../../redux/reducers/auth"
import {toast} from "react-toastify"
import {useEffect} from "react"

const LoginBasic = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {userData} = useSelector(state => state.users)

    const token = localStorage.getItem(TOKEN) || ''

    const ValidateSchema = Yup.object().shape({
        sellerPhone: Yup.string().required(INPUT_MSG),
        sellerPassword: Yup.string().required(INPUT_MSG)
    })

    useEffect(() => {
        if (token !== '') {

        }
    }, [userData])

    const formik = useFormik({
        validationSchema: ValidateSchema,
        initialValues: {
            sellerPassword: '',
            sellerPhone: ''
        },
        onSubmit: (val) => {
            console.log(val)
            dispatch(login(val)).then(unwrapResult).then(function (e) {
                if (e.data?.seller?.sellerRole === "admin") {
                    history.push(`/administrator/users`)
                } else {
                    toast.error("Kirish mumkin emas!")
                }
            })
        }
    })

    return (
        <div className="auth-wrapper auth-basic px-2">
            <div className="auth-inner my-2">
                <Card className="mb-0">
                    <CardBody>
                        <CardTitle tag="h4" className="mb-1">
                            Добро пожаловать! 👋
                        </CardTitle>
                        <CardText className="mb-2">
                            Пожалуйста, войдите в свою учетную запись и начните приключение
                        </CardText>
                        <Form className="auth-login-form mt-2"
                              onSubmit={formik.handleSubmit}>
                            <div className="mb-1">
                                <Label className="form-label" for="login-sellerPhone">
                                    Телефон номер
                                </Label>
                                <Input type="text" onChange={formik.handleChange} name={"sellerPhone"}
                                       id="login-sellerPhone"
                                       placeholder="+998912345678"
                                       autoFocus/>
                            </div>
                            <div className="mb-1">
                                <div className="d-flex justify-content-between">
                                    <Label className="form-label" for="login-password">
                                        Пароль
                                    </Label>
                                    {/*<Link to="/forgot-password">*/}
                                    {/*    <small>Забыли пароль?</small>*/}
                                    {/*</Link>*/}
                                </div>
                                <InputPasswordToggle onChange={formik.handleChange} name={'sellerPassword'}
                                                     className="input-group-merge"
                                                     id="login-password"/>
                            </div>
                            <Button color="primary" className={"w-100"} type={"submit"}
                                    disabled={!formik.isValid || !formik.dirty}>
                                Войти
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default LoginBasic
