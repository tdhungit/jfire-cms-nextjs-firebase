'use client';

import { request } from '@/utils/request';
import { PlusCircleFilled } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, List } from 'antd';
import { useRouter } from 'next/navigation';

export default function ArticlesPage() {
	const route = useRouter();

	const { data: articles, loading } = useRequest(() => request({ url: '/api/articles' }));

	return (
		<div className="container">
			<div className="flex">
				<div className="grow text-2xl font-bold">Articles</div>
				<div className="flex-none">
					<Button onClick={() => route.push('/admin/articles/form')}>
						<PlusCircleFilled />
					</Button>
				</div>
			</div>
			<div className="p-5 bg-white rounded-lg mt-2">
				{loading && <div className="w-full">loading...</div>}
				{articles && (
					<List
						itemLayout="horizontal"
						dataSource={articles}
						renderItem={(item: any, index) => (
							<List.Item key={item.id}>
								<List.Item.Meta
									title={
										<a
											href="javascript:;"
											onClick={() => route.push(`/admin/articles/form?id=${item.id}`)}
										>
											{item.name}
										</a>
									}
									description={<div dangerouslySetInnerHTML={{ __html: item.description }} />}
								/>
							</List.Item>
						)}
					/>
				)}
			</div>
		</div>
	);
}
