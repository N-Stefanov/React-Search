const ListProposal = ({ list, term }) => {
	return (
		<ul className="list-proposal">
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
