import ListProposal from "../list-proposal/list-proposal";
import IcoSearch from "../../assets/images/ico-search.svg";

const Search = ({
	data,
	handleSearch,
	term,
	handleSetTerm,
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
		handleSetTerm(term);
		handleCloseOptions();
	};

	const className = proposalVisible
		? "search__controls search__controls--is-open"
		: "search__controls";

	return (
		<div className="search">
			<h1>Search X</h1>

			<form
				action="?"
				method="get"
				onSubmit={(event) => handleOnSubmite(event)}
				autoComplete="off"
			>
				<div className={className}>
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
						autoFocus
					/>
				</div>
			</form>

			<ListProposal
				list={data}
				term={term}
				proposalVisible={proposalVisible}
				handleSearch={handleSearch}
				handleSetTerm={handleSetTerm}
				handleCloseOptions={handleCloseOptions}
			/>
		</div>
	);
};

export default Search;
