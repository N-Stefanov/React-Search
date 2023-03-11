import ListProposal from "../list-proposal/list-proposal";
import IcoSearch from "../../assets/images/ico-search.svg";

const Search = ({
	data,
	handleSearch,
	term,
	onSubmite,
	proposalVisible,
	handleOpenOptions,
	handleCloseOptions,
}) => {
	const handleOnChange = (event) => {
		handleSearch(event.target.value);
		handleOpenOptions();
	};

	const handleOnSubmite = (event) => {
		event.preventDefault();
		onSubmite(term);
		handleCloseOptions();
	};

	return (
		<div className="search">
			<h1>Search X</h1>

			<form
				action="?"
				method="get"
				onSubmit={(event) => handleOnSubmite(event)}
			>
				<div className="search__controls">
					<img
						src={IcoSearch}
						alt="Check"
						width={24}
						height={24}
						className="search__ico"
					/>

					<input
						type="search"
						name="q"
						id="q"
						placeholder="Search"
						className="search__field"
						value={term}
						onChange={(event) => handleOnChange(event)}
						onClick={handleOpenOptions}
					/>
				</div>
			</form>

			<ListProposal
				list={data}
				term={term}
				proposalVisible={proposalVisible}
			/>
		</div>
	);
};

export default Search;
