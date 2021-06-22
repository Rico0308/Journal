import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import Swal from 'sweetalert2';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Nombre Requerido';
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Email Requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email Invalido';
    }

    if (!values.password) {
        errors.password = 'Contraseña Requerida';
    } else if (values.password.length < 8) {
        errors.password = 'La Contraseña debe tener mínimo 8 caracteres';
    }

    if (!values.password2) {
        errors.password2 = 'Confirmación Requerida';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'La Contraseña no coincide';
    }

    return errors;
};

export const RegisterScreen = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password2: '',
        },
        //Validación con Yup
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Nombre Requerido'),
            email: Yup.string().email('Email Inválido').required('Email Requerido'),
            password: Yup.string().min(8, 'Minimo 8 caracteres').required('Contraseña Requerida'),
            // //Una forma de Validar si la Contraseña coincide
            // password2: Yup.string().required('Contraseña Requerida').test('match',
            //     'La Contraseña no coincide',
            //     function (password2, password) {
            //         return password2 === password
            //     }),
            //Otra forma de Validar si la Contraseña coincide
            password2: Yup.string().required('Confirmación Requerida').oneOf([Yup.ref('password')], 'La Contraseña no coincide'),
        }),
        onSubmit: values => {
            dispatch(startRegisterWithEmailPasswordName(values.email, values.password, values.name));

            Swal.fire(
                'Excelente!',
                'Registro realizado con éxito!',
                'success'
            )
        },
        //Validacion con Formik
        // validate,
        // onSubmit: values => {
        //     dispatch(startRegisterWithEmailPasswordName(values.email, values.password, values.name));

        //     Swal.fire(
        //         'Excelente!',
        //         'Registro realizado con éxito!',
        //         'success'
        //     )

        // },
    });

    const dispatch = useDispatch();
    // const { msgError } = useSelector(state => state.ui);

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={formik.handleSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {/* {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                } */}


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />

                {formik.errors.name ? <div className="auth__alert-error">{formik.errors.name}</div> : null}

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                {formik.errors.email ? <div className="auth__alert-error">{formik.errors.email}</div> : null}

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                {formik.errors.password ? <div className="auth__alert-error">{formik.errors.password}</div> : null}

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                />

                {formik.errors.password2 ? <div className="auth__alert-error">{formik.errors.password2}</div> : null}

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    onClick={formik.handleReset}
                >
                    Limpiar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
