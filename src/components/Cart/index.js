import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './cartItem';
import CartResult from './cartResult';
// import PaymentCart from './paymentCart';
import { actDeleteProductInCart, actUpdateProductInCart } from './../../actions/cartAction';


class CartPage extends Component {
    showItemCart = (carts) => {
        let result = <tr>
            <td colSpan="5"><div className="text-center">Không có sản phẩm nào trong giỏ hàng!</div></td>
        </tr>;

        if (carts.length > 0) {
            result = carts.map((item, index) => {
                return <CartItem
                    key={item.product.product_id}
                    indexStt={index + 1}
                    item={item}
                    onMinusProductInCart={this.props.onMinusProductInCart}
                    onPlusProductInCart={this.props.onPlusProductInCart}
                    onDeleteProductInCart={this.props.onDeleteProductInCart}
                />

            })
        }
        return result;
    }

    showResultCart = (carts) => {
        if (carts.length > 0) {
            return <CartResult carts={carts} />
        }
        return null;
    }
    
    // showPaymentCart = (carts) => {
    //     if (carts.length > 0) {
    //         return <PaymentCart />
    //     }
    //     return null;
    // }

    render() {
        let { carts } = this.props;
        return (
            <div className="container wrap-page">
                <div className="row"><div className="col-12"><h3 className="box-heading text-center">GIỎ HÀNG</h3></div></div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="bg-info">
                                    <tr>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col" width="130">Số lượng</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showItemCart(carts)}
                                    {this.showResultCart(carts)}
                                    {/* {this.showPaymentCart(carts)} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        carts: state.cartState
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actDeleteProductInCart(product));
        },
        onPlusProductInCart: (product, quantity) => {
            dispatch(actUpdateProductInCart(product, quantity));
        },
        onMinusProductInCart: (product, quantity) => {
            dispatch(actUpdateProductInCart(product, quantity));
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(CartPage);