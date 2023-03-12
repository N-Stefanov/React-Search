const Articles = ({ data }) => {
	const resultsNumber = data.length;

	return (
		<div className="articles">
			<p>About {resultsNumber} results</p>

			{data.map((item, index) => {
				const { model, year, vin, make } = item;
				return (
					<div className="article" key={index}>
						<h6>
							<a href="#">{model}</a>
						</h6>

						<ul>
							<li>Year {year}</li>

							<li>Vin {vin} </li>

							<li>Make {make} </li>
						</ul>
					</div>
				);
			})}
		</div>
	);
};

export default Articles;
