const Articles = ({ data }) => {
	return (
		<div className="articles">
			{data.map((item, index) => {
				const { model, year, vin, make } = item;
				return (
					<div className="article" key={index}>
						<h6>
							<a href="#">{model}</a>
						</h6>

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
