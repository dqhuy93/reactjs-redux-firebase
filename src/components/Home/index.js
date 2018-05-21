import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actAddToCart } from './../../actions/cartAction';
import { actGetProductHome, actSetProductDetail } from './../../actions/productAction';
import ProductListNew from './../Product/ProductListNew';
import { dbProduct } from '../../firebase';

class HomePage extends Component {
	componentDidMount() {
		const { onSetProducts } = this.props;
		dbProduct.onceGet20Products().then((snapshot) => {
			onSetProducts(snapshot.val())
		});
	}

	render() {
		const { products, onAddToCart } = this.props;
		return (
			<div className="container common-home">
				<div className="row">
					<div className="col-12">
						<h3 className="box-heading text-center">SẢN PHẨM MỚI</h3>
					</div>
				</div>
				<div className="row">
					{!!products && <ProductListNew products={products} onAddToCart={onAddToCart} />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.productState.productsHome,
});

const mapDispatchToProps = (dispatch) => ({
	onSetProducts: (products) => {
		dispatch(actGetProductHome(products))
	},
	onSetProductDetail: (product) => {
		dispatch(actSetProductDetail(product))
	},
	onAddToCart: (product) => {
		dispatch(actAddToCart(product));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
