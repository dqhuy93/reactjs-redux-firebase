import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class CartItem extends Component {
    render() {
        var { product, quantity } = this.props.item;
        return (
            <tr>
                <td><div className="text-center"><img width="50px" src={product.product_thumbnail} alt={product.product_name} /></div></td>
                <td>{product.product_name}</td>
                <td>
                    <div className="price-item-cart">
                        <NumberFormat value={product.product_price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </div>
                </td>
                <td>
                    <div className="input-group input-group-sm group-quantity">
                        <div className="input-group-prepend">
                            <span className="input-group-text" onClick={() => this.props.onMinusProductInCart(product, quantity - 1)}>
                                -
                            </span>
                        </div>
                        <input type="text" readOnly className="form-control text-center" value={quantity} />
                        <div className="input-group-append">
                            <span className="input-group-text" onClick={() => this.props.onPlusProductInCart(product, quantity + 1)}>
                                +
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.props.onDeleteProductInCart(product)}>Xóa</button>
                </td>
            </tr>
        );
    }
}

export default CartItem;