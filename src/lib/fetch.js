import { HTTP_METHOD } from "./httpMethods"

const BASE_URL = "http://localhost:3000/api/"

async function get(url, headers = {}) {
    try {
        const res = await fetch(BASE_URL + url, {
            headers,
            method: HTTP_METHOD.GET
        })
        const data = await res.json()
        
        return data
    } catch (error) {
        console.error(error)
    }
}

async function post(url, headers = {}, body = {}) {
    try {
        const res = await fetch(BASE_URL + url,
            {
                headers,
                method: HTTP_METHOD.POST,
                body: JSON.stringify(body)
            }
        )
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

async function put(url, headers = {}, body = {}) {
    try {
        const res = await fetch(BASE_URL + url,
            {
                headers,
                method: HTTP_METHOD.PUT,
                body: JSON.stringify(body)
            }
        )
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

async function del(url, headers = {}) {
    try {
        const res = await fetch(BASE_URL + url, {
            headers,
            method: HTTP_METHOD.DEL
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const api = {
    get,
    post,
    put,
    del
}