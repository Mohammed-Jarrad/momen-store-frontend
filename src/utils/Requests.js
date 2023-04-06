export let baseURL = import.meta.env.VITE_API_KEY

class Requests {
	async GetRequest(path) {
		return await fetch(`${baseURL}${path}`, {
			method: "GET",

			headers: {
				"content-type": "application/json",
				"x-auth-token": localStorage.token,
			},
		})
	}

	async PostRequest(path, body) {
		return await fetch(`${baseURL}${path}`, {
			method: "POST",

			headers: {
				"content-type": "application/json",
				"x-auth-token": localStorage.token,
			},

			body: body,
		})
	}

	async PutRequest(path, body) {
		return await fetch(`${baseURL}${path}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				"x-auth-token": localStorage.token,
			},
			body,
		})
	}

	async DeleteRequest(path) {
		return await fetch(`${baseURL}${path}`, {
			method: "DELETE",

			headers: {
				"content-type": "application/json",
				"x-auth-token": localStorage.token,
			},
		})
	}
}

export default Requests
