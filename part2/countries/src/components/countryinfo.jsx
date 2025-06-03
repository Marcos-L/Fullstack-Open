const CountryInfo = ({info}) =>{
    if (info){
        const languages = []
        Object.keys(info.languages).forEach(key => {
            languages.push(<li key={key}>{info.languages[key]}</li>)
        });
        
        return (
            <div>
                <h2>{info.name.official}</h2>
                <h3>{info.name.common}</h3>
                <p>
                    Capital: {info.capital}<br></br>
                    Area: {info.area}
                </p>
                <h3>Languages</h3>
                {languages}
                <img src={info.flags.svg} width='25%'></img>
            </div>
        )
    }
    else {
        return null
    }
}

export default CountryInfo