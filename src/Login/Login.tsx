import React, {useEffect} from 'react';
import s from './style.module.css';
import {Field, Form, Formik} from "formik";
import {login, logout, requestProfile} from "../Store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Store/redux-store";
// @ts-ignore
import {useHistory} from "react-router-dom";

export type FormType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useDispatch()
    const authMe: boolean = useSelector((state: AppStateType) => state.auth.isAuth)
    const profile: string = useSelector((state: AppStateType) => state.auth.profile.login)
    const history = useHistory()

    const submit = (values: FormType) => {
        dispatch(login(values))
    }

    const logOut = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if(!authMe){
            dispatch(requestProfile())
        }
    }, [authMe])

    useEffect(() => {
        if(authMe === true){
            history.push('/lists')
        }
    }, [])

    const backLists = () => {
        history.push('/lists')
    }

    return <div className={s.loginBar}>
        <div className={s.logo} onClick={backLists}>
            <h1 className={s.logoTitle}>TODO</h1>
        </div>
        <div >
            {authMe ? <div className={s.loginForm}>
                    <p className={s.login}>{profile}</p>
                <button className={s.logout} onClick={logOut}>Logout</button>
            </div> :
                <LoginForm submit={submit}/> }
        </div>
    </div>
}


type LoginFormPropsType = {
    submit: (values: FormType) => void
}

const LoginForm = ({submit}: LoginFormPropsType) => {
    const validate = (values: any) => {
        const errors: any = {};
        if(!values.email){
            errors.email = 'Required';
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Invalid email address';
        }
        if(!values.password){
            errors.password = 'Required';
        }
        return errors;
    }

    return <div className={s.loginForm}>
        <div className={s.authSign}>Authorization</div>
        <div className={s.auth}>
            <Formik
                enableReinitialize
                initialValues={{email: '', password: '', rememberMe: false} as FormType}
                onSubmit={values => submit(values)}
                validate={values => validate(values)}
            >
                {({   isSubmitting,
                      errors,
                      handleBlur,
                      handleChange
                }) => (
                    <Form>
                        <div className={s.loginInputs}>
                            <div>
                                <Field
                                    placeholder="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur} type="text"
                                    name="email"
                                />
                                {errors.email ? <div className={s.errorsTab}>{errors.email}</div> : null}
                            </div>
                            <div>
                                <Field
                                    placeholder="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    name="password"
                                />
                                {errors.password ? <div className={s.errorsTab}>{errors.password}</div> : null}
                            </div>
                            <Field
                                type="checkbox"
                                name="rememberMe"
                            />
                            <button type="submit">
                            Auth
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>

}