import { useState } from 'react'

export default function SearchBar({onSearch}){
    const[searchItem, setItem] = useState('');
    
    function handleSearch() {
        onSearch(searchItem);
    }

    return(
        <div className='searchBar'>
            <label>Search: </label>
            <input value={searchItem} onChange={(e) => setItem(e.target.value)} type='text'></input>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}