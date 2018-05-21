import React from 'react';

const Category = ({ idActive, category, onFilterByCategory }) => {
	return(
		category.map((item, index) => {
			let classString = `list-group-item list-group-item-action ${idActive === item.category_id ? 'active' : ''}`;
			return (
				<li key={item.category_id} className={classString} onClick={() => onFilterByCategory(item.category_id)}>{item.category_name}</li>
			)
		})
	)
}

export default Category;