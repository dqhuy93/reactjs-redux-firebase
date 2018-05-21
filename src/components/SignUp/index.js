import React, { Component } from 'react';
import {
	Link,
	withRouter,
} from 'react-router-dom';
import EnhancedSignUpForm from './SignUpForm';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) =>
	<SignUpForm history={history} />

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
};

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const {
			email,
			passwordOne,
		} = this.state;

		const {
			history,
		} = this.props;

		auth.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				history.push(routes.HOME);
			})
			.catch(error => {
				this.setState(updateByPropertyName('error', error));
			});

		event.preventDefault();
	}

	render() {
		const {
			history,
		} = this.props;
		return (
			<div className="login-box">
				<EnhancedSignUpForm history={history} />
			</div>
		);
	}
}

const SignUpLink = () =>
	<p className="text-center message">
		<Link to={routes.SIGN_UP}>Đăng ký</Link>
	</p>

export default withRouter(SignUpPage);

export {
	SignUpForm,
	SignUpLink,
};