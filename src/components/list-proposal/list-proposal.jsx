import React, { useReducer, useEffect, useState } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import xmarkSolid from "../../assets/images/xmark-solid.svg";
import clockSolid from "../../assets/images/clock-solid.svg";

const ListProposal = ({
	list,
	term,
	proposalVisible,
	handleSearch,
	handleCloseOptions,
	handleSetTerm,
	history,
	clearHistory,
}) => {
	const initialState = { selectedIndex: 0 };

	const filteredData = () => {
		return list
			.filter(({ model }) =>
				model.toLowerCase().startsWith(term.toLowerCase())
			)
			.slice(0, 10);
	};

	const checkHistory = () => {
		const newData = filteredData().map((item) => {
			if (history.length && history.includes(item.model)) {
				return { ...item, isWanted: true };
			} else {
				return { ...item, isWanted: false };
			}
		});

		return newData;
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

			if (index > -1) {
				buttons[index].focus();
			}
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
			{checkHistory().map((item, index) => {
				const { model, isWanted } = item;
				const elementClassName = isWanted
					? "list__item is-visible"
					: "list__item";
				return (
					<li
						key={index}
						onClick={() => handleOnClick(model)}
						className={elementClassName}
					>
						<button
							onClick={() => handleOnClick(model, index)}
							className="list__button"
							role="button"
							aria-pressed={index === state.selectedIndex}
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleOnClick(model, index);
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
							{model}
						</button>

						<button
							className="list__button-close"
							onClick={() => clearHistory(model)}
						>
							<img
								src={clockSolid}
								alt=""
								width={10}
								height={10}
							/>

							<img
								src={xmarkSolid}
								alt=""
								width={10}
								height={10}
							/>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default ListProposal;
