import React, { Component } from 'react';
import * as config from './../../constants/config';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { dbProduct, dbCategory } from '../../firebase';
import { actGetProductList } from './../../actions/productAction';
import { actAddToCart } from './../../actions/cartAction';
import { actGetCategoryList } from './../../actions/categoryAction';
import ReactPaginate from 'react-paginate';
import Category from './Category';
import ProductListNew from './ProductListNew';


class Product extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: {},
			breakPaging: [],
			pageCount: 0,
			isAllProducts: true,
			idCategory: null,
		}
	}

	componentDidMount() {
		let { onSetCategory } = this.props;
		let listCategory = [];
		dbCategory.onceGetCategory().then((snapshot) => {
			snapshot.forEach(function (child) {
				// NOW THE CHILDREN PRINT IN ORDER
				listCategory.push(child.val())
			});
			onSetCategory(listCategory);
		});

		dbProduct.onceGetProducts().then((snapshot) => {
			this.resetDataPaging(snapshot.val());
		});
	}

	handlePageClick = (data) => {
		let selected = data.selected;
		let { breakPaging, isAllProducts } = this.state;
		// let { onSetProducts } = this.props;
		let keyStartAt = breakPaging[selected];

		if (isAllProducts) {
			dbProduct.onceGetPagingProducts(config.LIMIT_ITEM_PAGING, keyStartAt).then((snapshot) => {
				this.setState({
					products: snapshot.val()
				});
			});
		} else {
			let keyObject = Object.keys(this.props.products);
			let from = selected * config.LIMIT_ITEM_PAGING;
			let to = (selected * config.LIMIT_ITEM_PAGING) + config.LIMIT_ITEM_PAGING;
			let keyActive = keyObject.slice(from, to);
			let firstProduct = {};
			keyActive.map((item, index) => {
				return firstProduct[item] = this.props.products[item];
			})
			this.setState({
				products: firstProduct
			});
		}
	};


	resetDataPaging = (products) => {
		let { onSetProducts } = this.props;
		let breakPaging = [];
		let pageCount = Math.ceil(Object.keys(products).length / config.LIMIT_ITEM_PAGING);
		let keyObject = Object.keys(products);
		let { isAllProducts } = this.state;

		if (keyObject.length > 0) {
			breakPaging.push(keyObject[0]);
			for (let i = 1; i < keyObject.length; i++) {
				if (i % config.LIMIT_ITEM_PAGING === 0 && keyObject[i]) {
					breakPaging.push(keyObject[i]);
				}
			}
		}
		this.setState({
			breakPaging: breakPaging,
			pageCount: pageCount
		});
		if (isAllProducts) {
			dbProduct.onceGetPagingProducts(config.LIMIT_ITEM_PAGING, breakPaging[0]).then((snapshot) => {
				this.setState({
					products: snapshot.val()
				});
				onSetProducts(snapshot.val())
			});
		} else {
			let keyActive = keyObject.slice(0, config.LIMIT_ITEM_PAGING);
			let firstProduct = {};
			keyActive.map((item, index) => {
				return firstProduct[item] = products[item];
			})
			onSetProducts(products);
			this.setState({
				products: firstProduct
			});
		}
	}

	handleFilterByCategory = (id) => {
		dbProduct.filterProductByCategory(id).then((snapshot) => {
			this.setState({
				isAllProducts: false,
				idCategory: id
			});
			this.resetDataPaging(snapshot.val());
		})
	}

	render() {
		const { category, onAddToCart } = this.props;
		const { pageCount, idCategory, products } = this.state;
		return (
			<div className="container wrap-page box-product-list">
				<div className="row">
					<div className="col-12">
						<h3 className="box-heading text-center">DANH SÁCH SẢN PHẨM</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 col-md-3">
						<ul className="list-group category-product mb-2">
							<li className="list-group-item list-group-item-primary">Danh mục</li>
							{!!category && <Category idActive={idCategory} category={category} onFilterByCategory={this.handleFilterByCategory} />}
						</ul>
					</div>
					<div className="col-lg-9 col-md-9">
						<div className="container common-home mb-3">
							<div className="row">
								{!!products && <ProductListNew products={products} onAddToCart={onAddToCart} listProduct={true} />}
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-12">
									<ReactPaginate previousLabel={<span>&laquo;</span>}
										nextLabel={<span>&raquo;</span>}
										breakLabel={<a className="page-link">...</a>}
										breakClassName={"break-me"}
										pageCount={pageCount}
										marginPagesDisplayed={2}
										pageRangeDisplayed={2}
										onPageChange={this.handlePageClick}
										containerClassName={"pagination justify-content-end"}
										activeClassName={"active"}
										pageClassName={"page-item"}
										nextClassName={"page-item"}
										previousClassName={"page-item"}
										pageLinkClassName={"page-link"}
										nextLinkClassName={"page-link"}
										previousLinkClassName={"page-link"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.productState.productsList,
	category: state.categoryState
});

const mapDispatchToProps = (dispatch) => ({
	onSetProducts: (products) => {
		dispatch(actGetProductList(products))
	},
	onSetCategory: (category) => {
		dispatch(actGetCategoryList(category))
	},
	onAddToCart: (product) => {
		dispatch(actAddToCart(product));
	}
});


export default connect(mapStateToProps, mapDispatchToProps)(Product);
