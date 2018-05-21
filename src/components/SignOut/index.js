import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from './../../constants/routes';
import { auth } from '../../firebase';

const SignOutButton = ({ authUser }) =>
	<li className="nav-item dropdown">
		<a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			Xin chào {authUser.email}
		</a>
		<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
			<Link to={routes.ACCOUNT} className="dropdown-item">Đổi mật khẩu</Link>
			<a className="dropdown-item" onClick={auth.doSignOut}>Đăng xuất</a>
		</div>
	</li>

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(SignOutButton);
