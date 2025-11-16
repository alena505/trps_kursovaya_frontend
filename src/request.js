import axios from 'axios'

const backUrl = 'https://localhost:7055/api/'

export function backRequest(action, payload, callback) {
	axios
		.post(`${backUrl}${action}`, payload)
		.then(res => {
			console.log(`Retrieved data for action === '${action}':`)
			console.log(res.data)
			callback(res.data)
		})
		.catch(err => {
			console.log(`Error retrieved for action === '${action}':`)
			console.error(err)
			alert(err?.response?.data?.errorMsg ?? err?.message)
		})
}
