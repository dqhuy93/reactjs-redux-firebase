import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from './../../constants/routes';

const NotFound = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            <Link to={routes.HOME} className="btn btn-primary btn-lg">Về Trang Chủ</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default NotFound;