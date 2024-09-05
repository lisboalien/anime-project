function SearchInput({onSearch}){
    const [search, setSearch] = useState('');
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        onSearch(search);
    }

    return (
        <div>
            <input type="text" value={search} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchInput;