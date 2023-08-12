'use client';

import { navItems } from '@/config/nav';
import { request } from '@/utils/request';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const route = useRouter();

	const [collapsed, setCollapsed] = useState(false);

	const { data: user, loading } = useRequest(() => {
		return request({
			url: '/api/users/me',
		});
	});

	const selectMenu = ({ key }: any) => {
		const item = navItems.find((x) => x.key === key);
		if (item && item.route) {
			route.push(item.route);
		}
	};

	if (loading) {
		return <div className="h-screen w-ful text-center">loading...</div>;
	}

	if (!user || !user.id) {
		return (
			<div className="h-screen w-ful text-center">
				Permission denied.
				<div>
					<a href="/login">click here</a> to login
				</div>
			</div>
		);
	}

	return (
		<Layout className="min-h-screen">
			<Layout.Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['home']}
					items={navItems.map((item, index) => ({
						key: item.key,
						icon: React.createElement(item.icon),
						label: item.label,
					}))}
					onSelect={selectMenu}
				/>
			</Layout.Sider>
			<Layout>
				<Layout.Header
					style={{ padding: 0, background: colorBgContainer, height: 44, lineHeight: '44px' }}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '12px',
							width: 44,
							height: 44,
						}}
					/>
				</Layout.Header>
				<Layout.Content className="p-2 text-black">{children}</Layout.Content>
				<Layout.Footer></Layout.Footer>
			</Layout>
		</Layout>
	);
}
