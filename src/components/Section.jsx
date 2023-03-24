import React, { Component } from "react";
import "./styles/Section.css";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {

// } from "@fortawesome/free-solid-svg-icons";

class Section extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "Save"
		};
	}

	onSubmitSection = e => {
		const { stateName, editableFields, updateMethod } = this.props;
		e.preventDefault();
		let stateUpdate = {};
		stateUpdate[stateName] = [];
		e.target.querySelectorAll("form>div").forEach(div => {
			let nombre;
			if (editableFields === "true") {
				nombre = div.children[0].value;
			} else if (editableFields === "false") {
				nombre = div.children[0].textContent;
			}
			stateUpdate[stateName].push({
				id: uniqid(),
				nombre: nombre,
				info: div.children[1].value
			});
		});
		updateMethod(stateUpdate);
		this.setState({ action: "Edit" });
	};

	edit = () => {
		this.setState({ action: "Save" });
	};

	render() {
		const {
			stateName,
			heading,
			singular,
			editableFields,
			addItemMethod,
			sectionState
		} = this.props;

		let singularOtherInfo = null;
		if (singular !== "null") {
			singularOtherInfo = (
				<div>
					<div>{singular}</div>
					<div>Información Adicional</div>
				</div>
			);
		}

		let sectionRender;
		if (this.state.action === "Save") {
			let addItemButton = null;
			if (addItemMethod !== "null") {
				addItemButton = (
					<button
						type="button"
						onClick={() => {
							addItemMethod(stateName);
						}}
					>
						Agregar {singular}
					</button>
				);
			}
			sectionRender = (
				<div>
					<form onSubmit={this.onSubmitSection} autoComplete="on">
						{sectionState.map((item, index) => {
							let inputOrDiv;
							if (editableFields === "true") {
								inputOrDiv = (
									<input
										type="text"
										defaultValue={item.nombre}
									/>
								);
							} else if (editableFields === "false") {
								inputOrDiv = <div>{item.nombre}</div>;
							}
							return (
								<div key={item.id}>
									{inputOrDiv}
									<input
										type="text"
										defaultValue={item.info}
									/>
								</div>
							);
						})}
						{addItemButton}
						<button type="submit">Guardar cambios</button>
					</form>
				</div>
			);
		} else if (this.state.action === "Edit") {
			sectionRender = (
				<div>
					{sectionState.map(item => {
						return (
							<div key={item.id} className="item">
								<div className="nombre">{item.nombre}</div>
								<div className="info">{item.info}</div>
							</div>
						);
					})}
					<button onClick={this.edit}>Editar</button>
				</div>
			);
		}

		return (
			<section>
				<h2>{heading}</h2>
				{singularOtherInfo}
				{sectionRender}
			</section>
		);
	}
}

export default Section;
