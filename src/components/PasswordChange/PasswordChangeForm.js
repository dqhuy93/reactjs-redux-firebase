import React from 'react';
import yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { auth } from '../../firebase';
import { NotificationManager } from 'react-notifications';

const PasswordChangeForm = props => {
    const {
        touched,
        errors,
        isSubmitting,
    } = props;

    return (
        <Form className="form-signin">
            <h2 className="text-center">Đổi mật khẩu</h2>
            <div className="form-label-group">
                <Field
                    type="password"
                    name="txtPassword"
                    placeholder="Password"
                    id="inputPassword"
                    className={errors.txtPassword && touched.txtPassword ? ('text-input error form-control') : ('form-control text-input')}
                />
                <label htmlFor="inputPassword">Mật khẩu</label>
            </div>
            {errors.txtPassword && touched.txtPassword && (<div className="alert alert-danger">{errors.txtPassword}</div>)}
            <div className="form-label-group">
                <Field
                    type="password"
                    name="txtConfirmPassword"
                    placeholder="Confirm Password"
                    id="inputConfirmPassword"
                    className={errors.txtConfirmPassword && touched.txtConfirmPassword ? ('text-input error form-control') : ('form-control text-input')}
                />
                <label htmlFor="inputConfirmPassword">Nhập lại</label>
            </div>
            {errors.txtConfirmPassword && touched.txtConfirmPassword && (<div className="alert alert-danger">{errors.txtConfirmPassword}</div>)}

            <div className="field">
                <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary btn-block">Cập nhật</button>
            </div>
            {errors && errors.message && <div className="mt-2 mb-0 alert alert-danger">{errors.message}</div>}
        </Form>
    );
}

function equalTo(ref, msg) {
    return yup.mixed().test({
        name: 'equalTo',
        exclusive: false,
        message: msg || "${path} must be the same as ${reference}", // eslint-disable-line
        params: {
            reference: ref.path,
        },
        test: function (value) {
            return value === this.resolve(ref);
        },
    });
}

yup.addMethod(yup.string, 'equalTo', equalTo);

const EnhancedPasswordChangeForm = withFormik({
    mapPropsToValues: () => ({
        txtPassword: '',
        txtConfirmPassword: '',
    }),
    validationSchema: yup.object().shape({
        txtPassword: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu ít nhất 6 ký tự'),
        txtConfirmPassword: yup.string().equalTo(yup.ref('txtPassword'), 'Mật khẩu nhập lại không chính xác').required('Trường bắt buộc nhập')
    }),

    handleSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
        let txtPassword = values.txtPassword;
        setSubmitting(false);

        auth.doPasswordUpdate(txtPassword)
            .then(() => {
                NotificationManager.success('Đổi mật khẩu thành công!');
                resetForm({
                    txtPassword: '',
                    txtConfirmPassword: '',
                });
            })
            .catch(error => {
                setErrors(error);
            });
    },

    displayName: 'PasswordChangeForm', // helps with React DevTools
})(PasswordChangeForm);


export default EnhancedPasswordChangeForm;