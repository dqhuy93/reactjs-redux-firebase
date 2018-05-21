import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class CartResult extends Component {
    showTotalAmount = (carts) => {
        let total = 0;
        if (carts.length > 0) {
            for (let i = 0; i < carts.length; i++) {
                total += carts[i].product.product_price * carts[i].quantity;
            }
        }
        return <NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={' đ'} />;
    }
    render() {
        let { carts } = this.props;
        return (
            <tr>
                <td colSpan="2">
                    <div className="text-right">Tổng tiền</div>
                    
                </td>
                <td colSpan="3">
                    <div className="text-left"><strong>{this.showTotalAmount(carts)}</strong></div>
                </td>
            </tr>
        );
    }
}

export default CartResult;