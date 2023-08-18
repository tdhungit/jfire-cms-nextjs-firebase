'use client';

import { request } from '@/utils/request';
import { Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function Login() {
	const route = useRouter();

	const onFinish = async (values: any) => {
		const { email, password } = values;
		if (!email || !password) {
			message.error('Please input email and password');
			return;
		}

		message.destroy();
		message.loading('Logining...');
		try {
			const user = await request({
				method: 'post',
				url: '/api/users/login',
				data: values,
			});
			message.destroy();
			route.push('/admin');
		} catch (err: any) {
			message.destroy();
			message.error(err.message);
		}
	};

	return (
		<div className="container mx-auto p-4 text-gray-900 min-h-screen bg-white">
			<h1 className="text-2xl text-center pt-4 pb-4">Login</h1>
			<div className="flex justify-center">
				<div className="box-border border-2 w-[40%] p-4 rounded-md">
					<Form onFinish={onFinish} layout="vertical">
						<Form.Item name="email" label="Email">
							<Input className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item name="password" label="Password">
							<Input type="password" className="form-input rounded-md w-full" />
						</Form.Item>
						<Form.Item>
							<button
								className="w-full rounded-lg bg-black text-white p-2 hover:bg-blue-950"
								type="submit"
							>
								Login
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
