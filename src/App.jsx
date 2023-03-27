import React, { Component } from "react";
import "./App.css";
import uniqid from "uniqid";
import Section from "./components/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBriefcase,
	faEnvelope,
	faPhone,
	faLocationDot,
	faCakeCandles,
	faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

class App extends Component {
	constructor() {
		super();
		this.state = {
			personal: [
				{ id: uniqid(), field: "Nombre completo", info: "" },
				{ id: uniqid(), field: "Ocupación", info: "" },
				{ id: uniqid(), field: "image", info: "" },
				{ id: uniqid(), field: "Email", info: "" },
				{ id: uniqid(), field: "Teléfono", info: "" },
				{ id: uniqid(), field: "Dirección", info: "" },
				{ id: uniqid(), field: "Fecha de Nacimiento", info: "" },
				{ id: uniqid(), field: "Nacionalidad", info: "" }
			],
			habilidades: [
				{ id: uniqid(), field: "una", info: "selha" },
				{ id: uniqid(), field: "dosa", info: "polio" },
				{ id: uniqid(), field: "terca", info: "mili" }
			],
			idiomas: [{ id: uniqid(), field: "iadsdei", info: "blopa" }],
			experiencia: [
				{
					id: uniqid(),
					field: "daiichi",
					info: "sohji",
					from: "2002",
					to: "2009"
				}
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
			field: "",
			info: ""
		});
		this.setState(addObj);
	};

	iconsPersonal = {
		email: faEnvelope,
		telefono: faPhone,
		direccion: faLocationDot,
		nacimiento: faCakeCandles,
		nacionalidad: faGlobe
	};

	render() {
		return (
			<div className="app">
				<header>
					<h1>
						<FontAwesomeIcon icon={faBriefcase} /> CV App
					</h1>
				</header>
				<main>
					<Section
						stateName="personal"
						heading="Información Personal"
						singular="null"
						editableFields="false"
						updateMethod={this.updateInfo}
						icons={this.iconsPersonal}
						addItemMethod="null"
						fromToFields="false"
						sectionState={this.state.personal}
					/>
					<Section
						stateName="habilidades"
						heading="Habilidades"
						singular="Habilidad"
						editableFields="true"
						updateMethod={this.updateInfo}
						icons="null"
						addItemMethod={this.addItem}
						fromToFields="false"
						sectionState={this.state.habilidades}
					/>
					<Section
						stateName="idiomas"
						heading="Idiomas"
						singular="Idioma"
						editableFields="true"
						updateMethod={this.updateInfo}
						icons="null"
						addItemMethod={this.addItem}
						fromToFields="false"
						sectionState={this.state.idiomas}
					/>
					<Section
						stateName="experiencia"
						heading="Experiencia Laboral"
						singular="Experiencia Laboral"
						editableFields="true"
						updateMethod={this.updateInfo}
						icons="null"
						addItemMethod={this.addItem}
						fromToFields="true"
						sectionState={this.state.experiencia}
					/>
				</main>
				<footer className="footerTag">
					<a href="https://github.com/Sedbastian">
						Sedbastian <FontAwesomeIcon icon={faGithub} />
					</a>
					&nbsp;2023
				</footer>
			</div>
		);
	}
}

export default App;
