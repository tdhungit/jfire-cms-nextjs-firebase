'use client';

import MediaComponent from '@/components/media/Media';
import MediaModal from '@/components/media/MediaModal';
import { request } from '@/utils/request';
import { Editor } from '@tinymce/tinymce-react';
import { useRequest } from 'ahooks';
import { Button, Form, FormInstance, Input, Modal, Select, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ArticleFormPage() {
	const [title, setTitle] = useState('Create Article');

	const [categories, setCategories] = useState([]);

	const [chooseThumbnail, setChooseThumbnail] = useState(false);
	const [choosePhoto, setChoosePhoto] = useState(false);

	const route = useRouter();
	const searchParams = useSearchParams();

	const formRef = useRef<FormInstance>(null);
	const descRef = useRef<any>(null);
	const contentRef = useRef<any>(null);

	const [modal, contextHolder] = Modal.useModal();

	const id = searchParams.get('id');

	const { data: rawCategories } = useRequest(() => request({ url: '/api/categories' }));
	useEffect(() => {
		if (rawCategories) {
			let cats: any = [];
			rawCategories.map((item: any) => {
				cats.push({
					value: item.id,
					label: item.name,
				});
			});
			setCategories(cats);
		}
	}, [rawCategories]);

	useEffect(() => {
		if (id) {
			request({ url: `/api/articles?id=${id}` })
				.then((res: any) => {
					setTitle(`Edit Article: ${res.name}`);
					formRef?.current?.setFieldsValue({
						name: res.name,
						slug: res.slug,
						categories: res.categories || [],
					});
					descRef?.current.setContent(res.description);
					contentRef?.current.setContent(res.content);
				})
				.catch(() => {});
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
		const data = {
			...values,
			description: descRef?.current?.getContent(),
			content: contentRef?.current?.getContent(),
		};
		message.loading('saving...');
		try {
			if (id) {
				await request({ method: 'put', url: '/api/articles', data: { ...data, id } });
			} else {
				await request({ method: 'post', url: '/api/articles', data });
			}
			message.destroy();
			route.push('/admin/articles');
		} catch (err: any) {
			message.destroy();
			message.error(err.message);
		}
	};

	return (
		<div className="container">
			<h1>{title}</h1>
			<Form ref={formRef} layout="vertical" onFinish={onFinish}>
				<Form.Item name="name" label="Title">
					<Input onChange={onNameChange} />
				</Form.Item>
				<Form.Item name="slug" label="Slug">
					<Input />
				</Form.Item>
				<Form.Item name="categories" label="Categories">
					<Select
						mode="tags"
						style={{ width: '100%' }}
						placeholder="Categories"
						options={categories}
					/>
				</Form.Item>
				<Form.Item name="thumbnail" label="Thumbnail">
					<Input />
				</Form.Item>
				<div className="mb-4 -mt-4">
					<Button type="primary" onClick={() => setChooseThumbnail(true)}>
						Choose
					</Button>
				</div>
				<Form.Item name="photo" label="Photo">
					<Input />
				</Form.Item>
				<div className="mb-4 -mt-4">
					<Button type="primary" onClick={() => setChoosePhoto(true)}>
						Choose
					</Button>
				</div>
				<Form.Item name="description" label="Description">
					<Editor
						tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
						init={{ height: 300, menubar: false }}
						onInit={(evt, editor: any) => (descRef.current = editor)}
					/>
				</Form.Item>
				<Form.Item name="content" label="Content">
					<Editor
						tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
						init={{
							height: 600,
							menubar: false,
							toolbar: `
								undo redo | blocks | 
								bold italic backcolor | alignleft aligncenter 
								alignright alignjustify | bullist numlist outdent indent | 
								link image | removeformat
							`,
							file_picker_callback: (cb, value, meta) => {
								modal.info({
									title: 'Select Image',
									content: (
										<MediaComponent
											onSelected={(item: any) => {
												cb(item.url);
											}}
										/>
									),
									width: 1000,
								});
							},
						}}
						plugins="link image"
						onInit={(evt, editor: any) => (contentRef.current = editor)}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form.Item>
			</Form>

			<MediaModal
				open={chooseThumbnail}
				isOpen={setChooseThumbnail}
				onFinish={(value) => {
					formRef?.current?.setFieldValue('thumbnail', value.url);
					setChooseThumbnail(false);
				}}
			/>

			<MediaModal
				open={choosePhoto}
				isOpen={setChoosePhoto}
				onFinish={(value) => {
					formRef?.current?.setFieldValue('photo', value.url);
					setChoosePhoto(false);
				}}
			/>

			{contextHolder}
		</div>
	);
}
