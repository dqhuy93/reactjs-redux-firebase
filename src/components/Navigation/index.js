import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = ({ authUser, carts }) =>
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
		<div className="container">
			<Link className="navbar-brand" to='/'>DEMO</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarResponsive">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to={routes.PRODUCT}>Sản phẩm</Link>
					</li>
				</ul>
				{authUser
					? <NavigationAuth carts={carts} />
					: <NavigationNonAuth carts={carts} />
				}
			</div>
		</div>
	</nav>

const countItemInCart = (carts) => {
	var result = 0;
	if (carts.length) {
		carts.map((cart, index) => {
			return result += cart.quantity;
		})
	}
	return result;
}


const NavigationAuth = ({carts}) =>
	<ul className="navbar-nav ml-auto">
		<li className="nav-item dropdown">
			<Link className="nav-link" to={routes.CART}><span className="oi oi-cart"></span> {countItemInCart(carts)} sản phẩm</Link>
		</li>
		{/* Dropdown item */}
		<SignOutButton />
	</ul>

const NavigationNonAuth = ({carts}) =>
	<ul className="navbar-nav ml-auto">
		<li className="nav-item dropdown">
			<Link className="nav-link" to={routes.CART}><span className="oi oi-cart"></span> {countItemInCart(carts)} sản phẩm</Link>
		</li>
		<li className="nav-item">
			<Link className="nav-link" to={routes.SIGN_IN}>Đăng nhập</Link>
		</li>
	</ul>

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
	carts: state.cartState
});

export default connect(mapStateToProps)(Navigation);
