import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
    <SignInForm history={history} />

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="login-box">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="text-center">Đăng nhập</h2>
                    <div className="form-label-group">
                        <input
                            value={email}
                            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                            id="inputEmail"
                            type="text"
                            placeholder="Email Address"
                            className="form-control"
                        />
                        <label htmlFor="inputEmail">Email</label>
                    </div>

                    <div className="form-label-group">
                        <input
                            value={password}
                            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            className="form-control"
                        />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">Đăng nhập</button>
                    {error && <div className="mt-2 mb-0 alert alert-danger">{error.message}</div>}
                    <PasswordForgetLink />
                    <SignUpLink />
                    
                </form>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};
