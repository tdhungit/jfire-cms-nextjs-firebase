'use client';

import { request } from '@/utils/request';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Checkbox, Form, FormInstance, Input, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PageForm() {
	const route = useRouter();
	const searchParams = useSearchParams();
	const formRef = useRef<FormInstance>(null);

	const [code, setCode] = useState('');

	const [title, setTitle] = useState('Add Category');

	const id = searchParams.get('id');

	useEffect(() => {
		if (id) {
			request({ url: `/api/pages?id=${id}` })
				.then((res) => {
					formRef?.current?.setFieldsValue({
						title: res.title || '',
						slug: res.slug || '',
						isDefault: res.isDefault || false,
					});
					if (res.content) {
						setCode(res.content);
					}
				})
				.catch(() => {});
		}
	}, [id]);

	const onTitleChange = (event: any) => {
		const name = event.target.value;
		let slug = name
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');
		formRef?.current?.setFieldValue('slug', slug);
	};

	const onSave = async (values: any) => {
		if (!values.title || !values.slug) {
			return;
		}

		try {
			message.loading('saving...');
			if (id) {
				await request({
					method: 'put',
					url: '/api/pages',
					data: {
						...values,
						content: code,
						id,
					},
				});
			} else {
				await request({
					method: 'post',
					url: '/api/pages',
					data: {
						...values,
						content: code,
					},
				});
			}
			message.destroy();
			route.push('/admin/pages');
		} catch (err: any) {
			message.destroy();
			message.error(err.message);
		}
	};

	return (
		<div className="container">
			<div className="text-2xl font-bold">{title}</div>
			<div className="p-5 w-full">
				<Form ref={formRef} layout="vertical" onFinish={onSave}>
					<Form.Item name="title" label="Title">
						<Input onChange={onTitleChange} />
					</Form.Item>
					<Form.Item name="slug" label="Slug">
						<Input />
					</Form.Item>
					<Form.Item name="isDefault" valuePropName="checked">
						<Checkbox value={true}>Is Home Page</Checkbox>
					</Form.Item>
					<Form.Item label="HTML">
						<CodeEditor
							value={code}
							language="js"
							placeholder="Please enter JS code."
							onChange={(evn: any) => setCode(evn.target.value)}
							padding={15}
							style={{
								fontSize: 12,
								backgroundColor: '#fff',
								fontFamily:
									'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
							}}
							data-color-mode="light"
						/>
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
