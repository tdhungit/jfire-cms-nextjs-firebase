import axios, { AxiosRequestConfig } from 'axios';

export async function request({
	method,
	headers,
	data,
	url,
}: {
	method?: string;
	headers?: any;
	data?: any;
	url: string;
}) {
	try {
		let axiosOpt: AxiosRequestConfig = {
			method: method || 'get',
			url,
			headers: headers || {},
		};
		if (data) {
			if (axiosOpt.method?.toLocaleLowerCase() === 'get') {
				axiosOpt.params = data;
			} else {
				axiosOpt.data = data;
			}
		}

		const res = await axios.request(axiosOpt);
		return res.data;
	} catch (err: any) {
		throw (err.response && err.response.data) || err;
	}
}
