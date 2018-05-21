import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EnhancedForgetForm from './ForgetForm';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () =>
	<div className="container">
		<div className="row">
			<div className="col-12">
				<PasswordForgetForm />
			</div>
		</div>
	</div>

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	email: '',
	error: null,
};

class PasswordForgetForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}
	

	onSubmit = (event) => {
		const { email } = this.state;

		auth.doPasswordReset(email)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
			})
			.catch(error => {
				this.setState(updateByPropertyName('error', error));
			});

		event.preventDefault();
	}

	render() {
		return (
			<div className="login-box">
				<EnhancedForgetForm />
			</div>
		);
	}
}

const PasswordForgetLink = () =>
	<p className="text-center message">
		<Link to={routes.PASSWORD_FORGET}>Quên mật khẩu?</Link>
	</p>

export default PasswordForgetPage;

export {
	PasswordForgetForm,
	PasswordForgetLink,
};
