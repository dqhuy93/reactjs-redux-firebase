import React from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import ProductPage from '../Product';
import ProductDetailPage from '../ProductDetail';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';

import CartPage from '../Cart';
import HomePage from '../Home';
import AccountPage from '../Account';
import NotFoundPage from '../NotFound404';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';
import './product.css';
import { NotificationContainer } from 'react-notifications';


const App = () =>
    <Router>
        <div className="app">
            <Navigation />
            <div id="page">
                <Switch>
                    <Route
                        exact path={routes.HOME}
                        component={() => <HomePage />}
                    />
                    <Route
                        exact path={routes.PRODUCT}
                        component={() => <ProductPage />}
                    />
                    <Route
                        exact path={routes.PRODUCT_DETAIL}
                        component={({ match, location }) => <ProductDetailPage match={match} location={location} />}
                    />
                    <Route
                        exact path={routes.SIGN_UP}
                        component={() => <SignUpPage />}
                    />
                    <Route
                        exact path={routes.SIGN_IN}
                        component={() => <SignInPage />}
                    />
                    <Route
                        exact path={routes.PASSWORD_FORGET}
                        component={() => <PasswordForgetPage />} />
                    <Route
                        exact path={routes.ACCOUNT}
                        component={() => <AccountPage />}
                    />
                    <Route
                        exact path={routes.CART}
                        component={() => <CartPage />}
                    />
                    <Route
                        path="*"
                        component={() => <NotFoundPage />}
                    />
                </Switch>
                <NotificationContainer />
            </div>
        </div>
    </Router>

export default withAuthentication(App);