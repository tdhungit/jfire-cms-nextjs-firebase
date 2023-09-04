'use client';

import { request } from '@/utils/request';
import { message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CrawlPage() {
	const route = useRouter();
	const searchParams = useSearchParams();

	const [loading, setLoading] = useState(true);

	const page = searchParams.get('page');

	useEffect(() => {
		if (page) {
			if (page === 'vne') {
				setLoading(true);
				message.loading('loading...');
				request({
					method: 'post',
					url: `/api/crawl`,
					data: {
						page,
					},
				}).then(() => {
					message.destroy();
					setLoading(false);
				});
			}
		}
	}, [page]);

	return (
		<div className="container">
			<div className="w-full">{loading && <h3>Loading...</h3>}</div>
		</div>
	);
}
