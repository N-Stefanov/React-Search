import ListProposal from "../list-proposal/list-proposal";

const Search = ({ data, handleSearch, term, onSubmite }) => {
	const handleOnChange = (event) => {
		handleSearch(event.target.value);
	};

	const handleOnSubmite = (event) => {
		event.preventDefault();

		onSubmite(term);
	};

	return (
		<div className="search">
			<h1>Search</h1>

			<form
				action="?"
				method="get"
				onSubmit={(event) => handleOnSubmite(event)}
			>
				<input
					type="search"
					name="q"
					id="q"
					placeholder="Search"
					className="search__field"
					value={term}
					onChange={(event) => handleOnChange(event)}
				/>
			</form>

			<ListProposal list={data} term={term} />
		</div>
	);
};

export default Search;
