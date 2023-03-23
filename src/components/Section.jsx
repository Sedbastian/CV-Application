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
		e.preventDefault();
		let stateUpdate = {};
		stateUpdate[this.props.stateName] = [];
		e.target.querySelectorAll("div").forEach(div => {
			stateUpdate[this.props.stateName].push({
				id: uniqid(),
				nombre: div.children[1].value,
				info: div.children[3].value
			});
		});
		this.props.updateMethod(stateUpdate);
		this.setState({ action: "Edit" });
	};

	edit = () => {
		this.setState({ action: "Save" });
	};

	render() {
		const { stateName, heading, singular, sectionState } = this.props;

		let sectionRender;
		if (this.state.action === "Save") {
			sectionRender = (
				<div>
					<form onSubmit={this.onSubmitSection} autoComplete="on">
						{sectionState.map((habilidad, index) => {
							const iNom = `${index}nombre`;
							const iInf = `${index}info`;
							return (
								<div key={habilidad.id}>
									<label htmlFor={iNom}>{singular}</label>
									<input
										type="text"
										id={iNom}
										defaultValue={habilidad.nombre}
									/>
									<label htmlFor={iInf}>
										Información Adicional
									</label>
									<input
										type="text"
										id={iInf}
										defaultValue={habilidad.info}
									/>
								</div>
							);
						})}
						<button
							type="button"
							onClick={() => {
								this.props.addItemMethod(stateName);
							}}
						>
							Agregar {singular}
						</button>
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
				<div>
					<div>{singular}</div>
					<div>Información Adicional</div>
				</div>
				{sectionRender}
			</section>
		);
	}
}

export default Section;
