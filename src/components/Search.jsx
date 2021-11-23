const Search = ({ onSearch, onReset }) => {
    const onChange = (e) => {
        const value = e.target && e.target.value;

        if (value.length >= 2) {
            onSearch(value);
        } else if (value === "") {
            onReset();
        }
    }

    return (
        <form>
            <label>
                Search by name:
                <input type="text" name="search" onChange={onChange} />
            </label>
        </form>
    );
};

export default Search;