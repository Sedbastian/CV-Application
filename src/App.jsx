import React, { Component, Fragment } from "react";
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
				{
					id: uniqid(),
					field: "Nombre completo",
					info: "Sebastián Ignacio Luciani"
				},
				{
					id: uniqid(),
					field: "Ocupación",
					info: "Desarrollador Web Full Stack"
				},
				{ id: uniqid(), field: "image", info: "" },
				{
					id: uniqid(),
					field: "Email",
					info: "SebastianIgnacioLuciani@gmail.com",
					icon: faEnvelope
				},
				{
					id: uniqid(),
					field: "Teléfono",
					info: "3827-40-3838",
					icon: faPhone
				},
				{
					id: uniqid(),
					field: "Dirección",
					info: "Santa Vera Cruz, Departamento Castro Barros, La Rioja",
					icon: faLocationDot
				},
				{
					id: uniqid(),
					field: "Fecha de Nacimiento",
					info: "4 de Mayo de 1982",
					icon: faCakeCandles
				},
				{
					id: uniqid(),
					field: "Nacionalidad",
					info: "Argentino",
					icon: faGlobe
				}
			],
			habilidades: [
				{
					id: uniqid(),
					field: "FrontEnd",
					info: "HTML, CSS, JavaScript, CSS en JS, Webpack, React, SVGs"
				},
				{
					id: uniqid(),
					field: "BackEnd",
					info: "NodeJS, Express, SaaS, Firebase"
				},
				{
					id: uniqid(),
					field: "Herramientas",
					info: "Git, VSCode, ESLint, Prettier"
				},
				{
					id: uniqid(),
					field: "Linux",
					info: "Ubuntu, Kali, Debian, Bash"
				},
				{
					id: uniqid(),
					field: "Diseño Gráfico",
					info: "GIMP, InkScape"
				}
			],
			idiomas: [
				{
					id: uniqid(),
					field: "Inglés Avanzado",
					info: "2001: Super Intensive Course. PLI English School in Toronto, Canada.\n2000: First Certificate, University of Cambridge."
				},
				{
					id: uniqid(),
					field: "Inglés Intermedio",
					info: "1990 a 1999: Estudios de Inglés.\nEgresado Instituto Argentino de Profesores de Inglés (IADEI)."
				}
			],
			experiencia: [
				{
					id: uniqid(),
					field: "Diseñador de circuitos impresos",
					info: "Dai-Ichi Circuitos S.A.  -  Fábrica de circuitos impresos (PCB) para electrónica.",
					subInfo:
						"Empresa con más de 30 años de experiencia en la fabricación y diseño de circuitos impresos.\nInvestigación y desarrollo en productos innovadores diseñados para cada proyecto.",
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

	addItem = (stateName, hasSubInfo) => {
		let addObj = {};
		const item = {
			id: uniqid(),
			field: "",
			info: ""
		};
		if (hasSubInfo) {
			item.subInfo = "";
		}
		addObj[stateName] = this.state[stateName].concat(item);
		this.setState(addObj);
	};

	render() {
		return (
			<Fragment>
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
						addItemMethod="null"
						subInfo="false"
						fromToFields="false"
						sectionState={this.state.personal}
					/>
					<Section
						stateName="habilidades"
						heading="Habilidades"
						singular="Habilidad"
						editableFields="true"
						updateMethod={this.updateInfo}
						addItemMethod={this.addItem}
						subInfo="false"
						fromToFields="false"
						sectionState={this.state.habilidades}
					/>
					<Section
						stateName="idiomas"
						heading="Idiomas"
						singular="Idioma"
						editableFields="true"
						updateMethod={this.updateInfo}
						addItemMethod={this.addItem}
						subInfo="false"
						fromToFields="false"
						sectionState={this.state.idiomas}
					/>
					<Section
						stateName="experiencia"
						heading="Experiencia Laboral"
						singular="Cargo"
						editableFields="true"
						updateMethod={this.updateInfo}
						addItemMethod={this.addItem}
						subInfo="true"
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
			</Fragment>
		);
	}
}

export default App;
