import CountryItem from "./countryitem"

const CountryList = ({list, nameType, onSelect}) =>{
    if (!list || list.length>10){return null}
    if (list.length){
        const country_list = []
        list.forEach(element => {
            const name = nameType ? element.name.common : element.name.official
            country_list.push(<CountryItem key={element.name.official} name={name} onClick={()=>onSelect(element.name.common)}/>)
        });
        return(
            <div>
                <h2>Country List</h2>
                <ul>{country_list}</ul>
            </div>
        )
    }
    else {
        return <p>No results found.</p>
    }
}

export default CountryList