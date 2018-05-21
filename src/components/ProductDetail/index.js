import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { actSetProductDetail } from './../../actions/productAction';
import { actAddToCart } from './../../actions/cartAction';


import NumberFormat from 'react-number-format';
import * as config from './../../constants/config';
import { dbProduct } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1
        };
    }

    componentDidMount() {
        let { onSetProductDetail, match } = this.props;
        let productId = match.params.id;
        var regNumber = /^\d+$/;
        if (regNumber.test(productId)) {
            dbProduct.getDetailProduct(parseInt(productId, 10)).then((snapshot) => {
                snapshot.forEach(function (child) {
                    onSetProductDetail(child.val())
                });
            });
        }
    }


    showSlide = (images) => {
        var result = null;
        if (images && images.length) {
            result = images.map((image, index) => {
                return (
                    <div key={index}>
                        <img className="d-block w-100" src={config.PATH_IMAGE + image} alt={image} />
                    </div>
                )
            })
        }
        return result;
    }

    render() {
        let { product, onAddToCart } = this.props;
        const {
            quantity,
        } = this.state;
        var settings = {
            // customPaging: function (i) {
            //     return (
            //         <a>
            //             <img className="img-fluid" src={`${config.PATH_IMAGE}${product.product_slide[i]}`} alt={product.product_slide[i]} />
            //         </a>
            //     );
            // },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1

        };
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card-box">
                            <div className="container-fliud">
                                <div className="wrapper row">
                                    <div className="preview col-md-4">
                                        <div className="box-slide-product">
                                            <Slider {...settings}>
                                                {this.showSlide(product.product_slide)}
                                            </Slider>
                                        </div>
                                    </div>
                                    <div className="details col-md-8">
                                        <aside>
                                            <article className="card-body p-1">
                                                <h4 className="title mb-0">{product.product_name}</h4>
                                                <span className="product-id">Mã sản phẩm: {product.product_id}</span>
                                                <div className="price-detail-wrap">
                                                    <div className="price h3 text-danger">
                                                        <NumberFormat value={product.product_price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                                                    </div>
                                                </div>
                                                <dl className="item-property">
                                                    <dt>Mô tả</dt>
                                                    <dd>
                                                        <p>{product.product_description}</p>
                                                    </dd>
                                                </dl>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <dl className="param param-inline mb-0">
                                                            <dt>Số lượng: </dt>
                                                            <dd>
                                                                <input
                                                                    value={quantity}
                                                                    onChange={event => this.setState(updateByPropertyName('quantity', event.target.value))}
                                                                    id="inputQuantity"
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <a className="btn text-uppercase add-tocart-detail btn-block" onClick={() => onAddToCart(product, quantity)}> Add to cart</a>
                                                    </div>
                                                </div>
                                            </article>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    product: state.productState.productDetail,
});

const mapDispatchToProps = (dispatch) => ({
    onSetProductDetail: (product) => {
        dispatch(actSetProductDetail(product))
    },
    onAddToCart: (product, quantity) => {
        dispatch(actAddToCart(product, quantity));
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(ProductDetail);