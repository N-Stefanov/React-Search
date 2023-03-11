const ListProposal = ({ list, term, proposalVisible }) => {
	const className = proposalVisible
		? "list-proposal list-proposal--is-open"
		: "list-proposal";

	return (
		<ul className={className}>
			{list
				.filter(
					({ model }) =>
						model.toLowerCase().indexOf(term.toLowerCase()) > -1
				)
				.slice(0, 10)
				.map((item, index) => {
					return <li key={index}>{item.model}</li>;
				})}
		</ul>
	);
};

export default ListProposal;
