const Articles = ({ data }) => {
	return (
		<div className="articles">
			{data.map((item, index) => {
				const { model, year, vin, make } = item;
				return (
					<div className="article" key={index}>
						<h3>
							<a href="#">{model}</a>
						</h3>

						<p>
							{year}

							{vin}

							{make}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Articles;
