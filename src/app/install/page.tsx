'use client';
import { request } from '@/utils/request';
import { Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function Install() {
	const route = useRouter();

	const onFinish = async (values: any) => {
		if (
			!values.url ||
			!values.title ||
			!values.email ||
			!values.password ||
			!values.confirmPassword
		) {
			return;
		}

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
			message.error('Invalid email');
			return;
		}

		if (values.password !== values.confirmPassword) {
			message.error('Invalid password');
			return;
		}

		message.loading('Installing...');
		try {
			const res: any = await request({
				method: 'post',
				url: '/api/install',
				data: values,
			});
			message.destroy();
			route.push('/login');
		} catch (err: any) {
			console.log(err);
			message.destroy();
			message.error(err.message);
		}
	};

	return (
		<div className="container mx-auto p-4 text-gray-900 min-h-screen bg-white">
			<h1 className="text-2xl text-center pt-4 pb-4">Install JFire-CMS</h1>
			<div className="flex justify-center">
				<div className="box-border border-2 w-[45%] p-4 rounded-md">
					<Form onFinish={onFinish} layout="vertical">
						<Form.Item name="url" label="URL">
							<Input className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item name="title" label="Title">
							<Input className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item name="email" label="Email">
							<Input className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item name="password" label="Password">
							<Input type="password" className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item name="confirmPassword" label="Confirm Password">
							<Input type="password" className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item>
							<button
								className="w-full rounded-lg bg-black text-white p-2 hover:bg-blue-950"
								type="submit"
							>
								Save
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
