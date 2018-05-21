import React from 'react';
import yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { auth } from '../../firebase';
import { NotificationManager } from 'react-notifications';

const ForgetForm = props => {
    const {
        touched,
        errors,
        isSubmitting,
    } = props;

    return (
        <Form className="form-signin">
            <h2 className="text-center">Quên mật khẩu</h2>
            <div className="form-label-group">
                <Field
                    type="text"
                    name="txtEmail"
                    placeholder="Email"
                    id="inputEmail"
                    className={errors.txtEmail && touched.txtEmail ? ('text-input error form-control') : ('form-control text-input')}
                />
                <label htmlFor="inputEmail">Email</label>
            </div>
            {errors.txtEmail && touched.txtEmail && (<div className="alert alert-danger">{errors.txtEmail}</div>)}
            <div className="field">
                <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary btn-block">Lấy lại mật khẩu</button>
            </div>
            {errors && errors.message && <div className="mt-2 mb-0 alert alert-danger">{errors.message}</div>}
        </Form>
    );
}

const EnhancedForgetForm = withFormik({
    mapPropsToValues: () => ({
        txtEmail: '',
    }),
    validationSchema: yup.object().shape({
        txtEmail: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập địa chỉ email')
    }),

    handleSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
        const email = values.txtEmail;
        setSubmitting(false);
        auth.doPasswordReset(email)
            .then((result) => {
                resetForm({
                    txtEmail: ''
                });
                NotificationManager.info(`Mật khẩu mới đã được gửi tới ${email}`,'', 10000);
            })
            .catch(error => {
                setErrors(error);
            });
    },

    displayName: 'ForgetForm', // helps with React DevTools
})(ForgetForm);


export default EnhancedForgetForm;