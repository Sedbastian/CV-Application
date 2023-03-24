import React, { Component } from "react";
import "./App.css";
import uniqid from "uniqid";
import Section from "./components/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
	constructor() {
		super();
		this.state = {
			infoPers: {
				nombre: "",
				ocupacion: "",
				email: "",
				telefono: "",
				direccion: "",
				nacimiento: "",
				nacionalidad: ""
			},
			habilidades: [
				{ id: uniqid(), nombre: "una", info: "selha" },
				{ id: uniqid(), nombre: "dosa", info: "polio" },
				{ id: uniqid(), nombre: "terca", info: "mili" }
			],
			idiomas: [{ id: uniqid(), nombre: "iadsdei", info: "blopa" }],
			experiencia: [{ id: uniqid(), nombre: "daiichi", info: "sohji" }],
			personal: [
				{ id: uniqid(), nombre: "nombre", info: "" },
				{ id: uniqid(), nombre: "ocupacion", info: "" },
				{ id: uniqid(), nombre: "email", info: "" },
				{ id: uniqid(), nombre: "telefono", info: "" },
				{ id: uniqid(), nombre: "direccion", info: "" },
				{ id: uniqid(), nombre: "nacimiento", info: "" },
				{ id: uniqid(), nombre: "nacionalidad", info: "" }
			]
		};
	}

	updateInfo = obj => {
		const key0 = Object.keys(obj)[0];
		const changeObj = {};
		changeObj[key0] = obj[key0];
		this.setState(changeObj);
	};

	addItem = stateName => {
		let addObj = {};
		addObj[stateName] = this.state[stateName].concat({
			id: uniqid(),
			nombre: "",
			info: ""
		});
		this.setState(addObj);
	};

	render() {
		return (
			<main className="app">
				<h1><FontAwesomeIcon icon={faBriefcase}/> CV App</h1>
				<Section
					stateName="personal"
					heading="Información Personal"
					singular="null"
					editableFields="false"
					updateMethod={this.updateInfo}
					addItemMethod="null"
					sectionState={this.state.personal}
				/>
				<Section
					stateName="habilidades"
					heading="Habilidades"
					singular="Habilidad"
					editableFields="true"
					updateMethod={this.updateInfo}
					addItemMethod={this.addItem}
					sectionState={this.state.habilidades}
				/>
				<Section
					stateName="idiomas"
					heading="Idiomas"
					singular="Idioma"
					editableFields="true"
					updateMethod={this.updateInfo}
					addItemMethod={this.addItem}
					sectionState={this.state.idiomas}
				/>
				<Section
					stateName="experiencia"
					heading="Experiencia Laboral"
					singular="Experiencia Laboral"
					editableFields="true"
					updateMethod={this.updateInfo}
					addItemMethod={this.addItem}
					sectionState={this.state.experiencia}
				/>
			</main>
		);
	}
}

export default App;
