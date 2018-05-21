import { db } from './firebase';

export const onceGetCategory = () =>
	db.ref('category')
		.orderByChild("category_id")
		.once('value');

