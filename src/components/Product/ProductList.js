import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const ProductList = ({ products, onAddToCart }) =>
    <div className="row">
        {
            Object.keys(products).map((key) => {
                let styleImg = {
                    backgroundImage: 'url(' + products[key].product_thumbnail + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'contain'
                };
                let linkToDetail = `/product-detail/${products[key].product_id}`
                return (
                    <div key={key} className="col-lg-4 col-md-6 mb-4 product-item">
                        <div className="card h-100">
                            {/* <a className="overflow-img">
								<img className="card-img-top" src={products[key].product_thumbnail} alt={products[key].product_name} />
							</a> */}
                            <div className="overflow-img" style={styleImg}></div>
                            <div className="card-body">
                                <h4 className="card-title name">
                                    <Link to={linkToDetail}>{products[key].product_name}</Link>
                                </h4>
                                <span className="badge badge-secondary">{products[key].product_brand_name}</span>
                                <h5 className="mt-1">
                                    <NumberFormat value={products[key].product_price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                                </h5>
                                <p className="card-text">{products[key].product_description}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-outline-primary btn-block btn-sm" onClick={() => onAddToCart(products[key])}>Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>

export default ProductList;