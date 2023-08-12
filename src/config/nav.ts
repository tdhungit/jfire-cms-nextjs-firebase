import { CiOutlined } from '@ant-design/icons';

export const navItems = [
	{
		key: 'home',
		icon: CiOutlined,
		label: 'Home',
		route: '/admin',
	},
	{
		key: 'categories',
		icon: CiOutlined,
		label: 'Categories',
		route: '/admin/categories',
	},
	{
		key: 'articles',
		icon: CiOutlined,
		label: 'Articles',
		route: '/admin/articles',
	},
];
