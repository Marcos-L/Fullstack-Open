import { useState, useEffect } from 'react'
import services from './services/countryservices'

import SearchBar from './components/searchbar'
import CountryList from './components/countrylist'
import CountryInfo from './components/countryinfo'

const App = () => {
  //States
  const [countryList, setCountryList] = useState(null)
  const [country, setCountry] = useState('')
  const [selectedCountry, setSelected] = useState(null)
  const [countryInfo, setInfo] = useState(null)
  const [commonName, setNameType] = useState(true)

  //Effects
  useEffect(()=>{services.getDB().then(db => setCountryList(db))}, [])
  useEffect(()=>{if(selectedCountry){services.selectCountry(selectedCountry).then(
    countryDB => {
      setInfo(countryDB)
    }
  )}}, [selectedCountry])

  //Functions
  function handleCountryChange(event){
    var country_name = event.target.value
    country_name = country_name.replace(/[^A-Za-z\- ]+/,'')
    setCountry(country_name)
    setInfo(null)
  }

  function handleNameType(event){
    setNameType(!commonName)
  }


  //Code
  const countriesToShow = countryList ? countryList.filter(elem=>{
    if (commonName){
      return elem.name.common.toLowerCase().search(country.toLowerCase())+1
    }
    else{
      return elem.name.official.toLowerCase().search(country.toLowerCase())+1
    }
  }) : null

  return (
    <div>
      <h1>Country Database</h1>
      <SearchBar onChange={handleCountryChange} value={country} handleType={handleNameType}/>
      <CountryList list={countriesToShow} nameType={commonName} onSelect={setSelected}/>
      <CountryInfo info={countryInfo}/>
    </div>
  )
}

export default App