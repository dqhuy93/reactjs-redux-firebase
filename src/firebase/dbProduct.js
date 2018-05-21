import { db } from './firebase';

// User API

// export const doCreateUser = (id, username, email) =>
// 	db.ref(`users/${id}`).set({
// 		username,
// 		email,
// 	});

export const onceGetProducts = () =>
	db.ref('products')
		.orderByKey()
		.once('value');

export const onceGetPagingProducts = (limit, startAt = '') =>
	db.ref('products')
		.orderByKey()
		.limitToFirst(limit)
		.startAt(startAt)
		.once('value');

export const onceGet20Products = () =>
	db.ref('products')
		.orderByKey()
		.limitToFirst(20)
		.once('value');

export const getDetailProduct = (productId) => 
	db.ref('products')
		.orderByChild("product_id").equalTo(productId)
		.once('value');



export const filterProductByCategory = (idCategory) => {
	// if (limit && startAt) {
	// 	console.log(limit, startAt)
	// 	return db.ref('products').limitToFirst(limit).startAt(startAt).orderByChild("product_brand_id").equalTo(idCategory).once('value');
	// }
	// return db.ref('products').limitToFirst(limit).startAt(startAt).orderByChild("product_brand_id").equalTo(idCategory).once('value');
	return db.ref('products').orderByChild("product_brand_id").equalTo(idCategory).once('value');
}
// Other db APIs ...
