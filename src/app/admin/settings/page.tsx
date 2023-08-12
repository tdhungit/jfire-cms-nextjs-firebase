'use client';

import { request } from '@/utils/request';
import { useRequest } from 'ahooks';
import { Form, FormInstance, Input, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default function Settings() {
	const formRef = useRef<FormInstance>(null);

	const [settings, setSettings] = useState<any>({});

	const { data: rawSettings } = useRequest(() => {
		return request({ url: '/api/settings?category=System' });
	});

	useEffect(() => {
		if (rawSettings) {
			let records: any = {};
			rawSettings.forEach((row: any) => {
				records[row.name] = row.value;
			});
			setSettings(records);
		}
	}, [rawSettings]);

	useEffect(() => {
		formRef?.current?.setFieldsValue(settings);
	}, [settings]);

	const onFinish = async (values: any) => {
		message.loading('saving...');
		try {
			await request({
				method: 'post',
				data: values,
				url: '/api/settings',
			});
		} catch (err: any) {
			message.destroy();
			message.error(err.message);
		}
	};

	return (
		<div className="container">
			<div className="text-2xl font-bold">Settings</div>
			<div className="p-5 w-1/2">
				<Form ref={formRef} layout="vertical" onFinish={onFinish}>
					<Form.Item name="url" label="URL">
						<Input className="rounded-lg" />
					</Form.Item>
					<Form.Item name="title" label="Title">
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
