import axios from 'axios'
const backend = '/api/persons'

const getDB = () => {
    const request = axios.get(backend)
    return request.then(response => response.data)
}

const addToDB = (object)=>{
    const request = axios.post(backend,object)
    return request.then(response => response.data)
}

const delFromDB = (id)=>{
    const request = axios.delete(backend+'/'+id)
    return request.then(response => response.data)
}

const modDb = (id, object)=>{
    const request = axios.put(backend+'/'+id,object)
    return request.then(response => response.data)
}

export default {
    getDB,
    addToDB,
    delFromDB,
    modDb
}