import React, { useReducer, useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";

const ListProposal = ({
	list,
	term,
	proposalVisible,
	handleSearch,
	handleCloseOptions,
	handleSetTerm,
}) => {
	const initialState = { selectedIndex: 0 };

	const filteredData = () => {
		return list
			.filter(
				({ model }) =>
					model.toLowerCase().indexOf(term.toLowerCase()) > -1
			)
			.slice(0, 10);
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "arrowUp":
				return {
					selectedIndex:
						state.selectedIndex !== 0
							? state.selectedIndex - 1
							: filteredData().length - 1,
				};
			case "arrowDown":
				return {
					selectedIndex:
						state.selectedIndex !== filteredData().length - 1
							? state.selectedIndex + 1
							: 0,
				};
			case "select":
				return { selectedIndex: action.payload };
			default:
				throw new Error();
		}
	};

	const arrowUpPressed = useKeyPress("ArrowUp");
	const arrowDownPressed = useKeyPress("ArrowDown");
	const [state, dispatch] = useReducer(reducer, initialState);

	const className = proposalVisible
		? "list-proposal list-proposal--is-open"
		: "list-proposal";

	const handleOnClick = (term, index) => {
		handleSearch(term);
		handleSetTerm(term);
		handleCloseOptions();

		dispatch({ type: "select", payload: index });
	};

	const handleSetFocus = (index) => {
		const listOfButtons = document.querySelector(".list-proposal");

		if (listOfButtons.classList.contains("list-proposal--is-open")) {
			const buttons = listOfButtons.querySelectorAll("button");

			buttons[index].focus();
		}
	};

	useEffect(() => {
		if (arrowUpPressed) {
			dispatch({ type: "arrowUp" });
		}
	}, [arrowUpPressed]);

	useEffect(() => {
		if (arrowDownPressed) {
			dispatch({ type: "arrowDown" });
			handleSetFocus(state.selectedIndex);
		}
	}, [arrowDownPressed]);

	useEffect(() => {
		handleSetFocus(state.selectedIndex);
	}, [arrowDownPressed]);

	useEffect(() => {
		handleSetFocus(state.selectedIndex);
	}, [arrowUpPressed]);

	return (
		<ul className={className}>
			{filteredData().map((item, index) => {
				return (
					<li
						key={index}
						onClick={() => handleOnClick(item.model)}
						className="list__item"
					>
						<button
							onClick={() => handleOnClick(item.model, index)}
							className="list__button"
							role="button"
							aria-pressed={index === state.selectedIndex}
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleOnClick(item.model, index);
									e.target.blur();
								}

								if (
									e.key === "Backspace" ||
									e.key === "Delete"
								) {
									document
										.querySelector(".search__field")
										.focus();
								}
							}}
						>
							{item.model}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default ListProposal;
