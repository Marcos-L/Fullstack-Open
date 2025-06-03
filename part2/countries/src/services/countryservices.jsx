import axios from 'axios'
const mainTable = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const countryTable = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getDB = () => {
    const request = axios.get(mainTable)
    return request.then(response => response.data)
}

const selectCountry = (name)=>{
    const request = axios.get(countryTable+name)
    return request.then(response => response.data)
}

export default {
    getDB,
    selectCountry,
}