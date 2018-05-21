import React, { Component } from 'react';
import EnhancedPasswordChangeForm from './PasswordChangeForm';

import { auth } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: null,
};

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { passwordOne } = this.state;

		auth.doPasswordUpdate(passwordOne)
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
				<EnhancedPasswordChangeForm history={this.props.history} />
				{/* <form className="form-signin" onSubmit={this.onSubmit}>
					<h2 className="text-center">Đổi mật khẩu</h2>
					<div className="form-label-group">
						<input
							value={passwordOne}
							onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
							type="password"
							placeholder="New Password"
							id="inputPassword"
							className="form-control"
						/>
						<label htmlFor="inputPassword">Mật khẩu mới</label>
					</div>
					<div className="form-label-group">
						<input
							value={passwordTwo}
							onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
							type="password"
							placeholder="Confirm New Password"
							id="inputPasswordConfirm"
							className="form-control"
						/>
						<label htmlFor="inputPasswordConfirm">Nhập lại mật khẩu mới</label>
					</div>
					<button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">Đổi mật khẩu</button>
					{isInvalidEnted && <p className="message">Mật khẩu nhập lại không khớp</p>}
					{error && <p className="message">{error.message}</p>}
				</form> */}
			</div>
		);
	}
}

export default PasswordChangeForm;