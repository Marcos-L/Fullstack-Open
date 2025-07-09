import axios from 'axios'
const backend = '/api/blog'
const login = '/api/login'

let token = null

const setToken = (new_token) =>{
    token = `Bearer ${new_token}`
}

const getDB = () => {
    const request = axios.get(backend)
    return request.then(response => response.data)
}

const addToDB = (object)=>{
    const config = {
        headers: {Authorization:token}
    }
    const request = axios.post(backend, object, config)
    return request.then(response => response.data)
}

const delFromDB = (id)=>{
    const config = {
        headers: {Authorization:token}
    }
    const request = axios.delete(backend+'/'+id, config)
    return request.then(response => response.data)
}

const modDb = (id, object)=>{
    const request = axios.put(backend+'/'+id,object)
    return request.then(response => response.data)
}

const loginUser = (object) => {
    const request = axios.post(login, object)
    return request.then(response => response.data)
}

export default {
    getDB,
    addToDB,
    delFromDB,
    modDb,
    loginUser,
    setToken
}