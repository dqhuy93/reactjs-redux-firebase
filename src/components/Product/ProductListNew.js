import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const ProductListNew = ({ products, onAddToCart, listProduct }) =>
    Object.keys(products).map((key) => {
        let linkToDetail = `/product-detail/${products[key].product_id}`;
        let classCol = listProduct === true ? 'product-layout col-lg-4 col-md-6 col-sm-6 col-xs-12' : 'product-layout col-lg-3 col-md-4 col-sm-6 col-xs-12';
        return (
            <div key={key} className={classCol}>
                <div className="product-thumb transition options">
                    {(products[key].product_id % 2 === 0) ? <div className="sale"><span>Sale</span></div> : ''}
                    <div className="image">
                        <Link to={linkToDetail}>
                            <img className="card-img-top" src={products[key].product_thumbnail} alt={products[key].product_name} />
                        </Link>
                    </div>
                    <div className="caption">
                        <div className="name">
                            <Link to={linkToDetail}>{products[key].product_name}</Link>
                        </div>
                        <span className="badge badge-secondary mt-1">{products[key].product_brand_name}</span>
                    </div>
                    <div className="clearfix">
                        <div className="price">
                            <span className="price-old">
                                <NumberFormat value={products[key].product_price + 50000} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </span>
                            <span className="price-new">
                                <NumberFormat value={products[key].product_price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                            </span>
                        </div>
                        <div className="cart-button">
                            <button className="btn btn-warning btn-block btn-sm btn-buy-style" onClick={() => onAddToCart(products[key])}>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    })

export default ProductListNew;