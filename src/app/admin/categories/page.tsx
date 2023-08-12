'use client';

import { request } from '@/utils/request';
import { PlusCircleFilled } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, List } from 'antd';
import { useRouter } from 'next/navigation';

export default function Categories() {
	const route = useRouter();

	const { data, loading } = useRequest(() => {
		return request({ url: '/api/categories' });
	});

	return (
		<div className="container">
			<div className="flex">
				<div className="grow text-2xl font-bold">Categories</div>
				<div className="flex-none">
					<Button onClick={() => route.push('/admin/categories/form')}>
						<PlusCircleFilled />
					</Button>
				</div>
			</div>
			<div className="p-5 bg-white rounded-lg mt-2">
				{loading && <div className="w-full">loading...</div>}
				{data && (
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={(item: any, index) => (
							<List.Item key={item.id}>
								<List.Item.Meta
									title={
										<a
											href="javascript:;"
											onClick={() => route.push(`/admin/categories/form?id=${item.id}`)}
										>
											{item.name}
										</a>
									}
									description={item.slug}
								/>
							</List.Item>
						)}
					/>
				)}
			</div>
		</div>
	);
}
