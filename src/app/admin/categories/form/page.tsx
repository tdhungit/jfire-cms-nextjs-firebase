'use client';

import { request } from '@/utils/request';
import { Form, FormInstance, Input, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CategoryForm() {
	const route = useRouter();
	const searchParams = useSearchParams();
	const formRef = useRef<FormInstance>(null);

	const [title, setTitle] = useState('Add Category');

	const id = searchParams.get('id');

	useEffect(() => {
		if (id) {
			request({ url: `/api/categories?id=${id}` })
				.then((res) => {
					formRef?.current?.setFieldsValue({
						name: res.name,
						slug: res.slug,
					});
				})
				.catch((err) => {
					message.error(err.message);
				});
		}
	}, [id]);

	const onNameChange = (event: any) => {
		const name = event.target.value;
		let slug = name
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');
		formRef?.current?.setFieldValue('slug', slug);
	};

	const onFinish = async (values: any) => {
		message.loading('saving...');
		try {
			if (id) {
				await request({
					method: 'put',
					url: '/api/categories',
					data: {
						...values,
						id,
					},
				});
			} else {
				await request({
					method: 'post',
					url: '/api/categories',
					data: values,
				});
			}
			message.destroy();
			route.push('/admin/categories');
		} catch (err: any) {
			message.destroy();
			message.error(err.message);
		}
	};

	return (
		<div className="container">
			<div className="text-2xl font-bold">{title}</div>
			<div className="p-5 w-1/2">
				<Form ref={formRef} layout="vertical" onFinish={onFinish}>
					<Form.Item name="name" label="Name">
						<Input className="rounded-lg" onChange={onNameChange} />
					</Form.Item>
					<Form.Item name="slug" label="Slug">
						<Input className="rounded-lg" />
					</Form.Item>
					<Form.Item>
						<button className="rounded-lg bg-black text-white p-3 hover:bg-blue-950" type="submit">
							Save
						</button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
