import React, { Component } from "react";
import "./App.css";
import uniqid from "uniqid";
import InfoPers from "./components/InfoPers";
import Section from "./components/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

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
			experiencia: [{ id: uniqid(), nombre: "daiichi", info: "sohji" }]
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
				<h1>CV App</h1>
				<InfoPers
					updateMethod={this.updateInfo}
					infoPersState={this.state.infoPers}
				/>
				<Section
					stateName="habilidades"
					heading="Habilidades"
					singular="Habilidad"
					updateMethod={this.updateInfo}
					addItemMethod={this.addItem}
					sectionState={this.state.habilidades}
				/>
				<Section
					stateName="idiomas"
					heading="Idiomas"
					singular="Idioma"
					updateMethod={this.updateInfo}
					addItemMethod={this.addItem}
					sectionState={this.state.idiomas}
				/>
				<Section
					stateName="experiencia"
					heading="Experiencia Laboral"
					singular="Experiencia Laboral"
					updateMethod={this.updateInfo}
					addItemMethod={this.addItem}
					sectionState={this.state.experiencia}
				/>
			</main>
		);
	}
}

export default App;
