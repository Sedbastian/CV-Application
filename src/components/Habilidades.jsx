import React, { Component } from "react";
import "./styles/Habilidades.css";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {

// } from "@fortawesome/free-solid-svg-icons";

class Habilidades extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "Save"
		};
	}

	onSubmitHabilidades = e => {
		e.preventDefault();
		let stateUpdate = { habilidades: [] };
		e.target.querySelectorAll("div").forEach(div => {
			stateUpdate.habilidades.push({
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
		const arrHabs = this.props.habilidadesState;

		let habilidadesRender;
		if (this.state.action === "Save") {
			habilidadesRender = (
				<div>
					<form onSubmit={this.onSubmitHabilidades} autoComplete="on">
						{arrHabs.map((habilidad, index) => {
							const iNom = `${index}nombre`;
							const iInf = `${index}info`;
							return (
								<div key={habilidad.id}>
									<label htmlFor={iNom}>Habilidad</label>
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
							onClick={this.props.addSkillMethod}
						>
							Agregar Habilidad
						</button>
						<button type="submit">Guardar cambios</button>
					</form>
				</div>
			);
		} else if (this.state.action === "Edit") {
			habilidadesRender = (
				<div>
					{arrHabs.map((habilidad, index) => {
						const iNom = `${index}nombre`;
						const iInf = `${index}info`;
						return (
							<div key={habilidad.id} className="habilidad">
								<div className="nombre">{habilidad.nombre}</div>
								<div className="info">{habilidad.info}</div>
							</div>
						);
					})}
					<button onClick={this.edit}>Editar</button>
				</div>
			);
		}

		return (
			<div>
				<h2>Habilidades</h2>
				<div>
					<div>Habilidad</div>
					<div>Información Adicional</div>
				</div>
				{habilidadesRender}
			</div>
		);
	}
}

export default Habilidades;
