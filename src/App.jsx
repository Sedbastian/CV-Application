import React, { Component, Fragment } from "react";
import "./App.css";
import uniqid from "uniqid";
import Section from "./components/Section";
import Preview from "./components/Preview";
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
import astronaut from "./components/user-astronaut-solid.svg";

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
				{ id: uniqid(), field: "image", info: astronaut },
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
			educacion: [
				{
					id: uniqid(),
					field: "Ingeniería en Electrónica y en Telecomunicaciones",
					info: "Universidad Católica Argentina",
					subInfo:
						"Cursada finalizada y aprobada\n35 materias aprobadas\nPromedio general: 7.34 / 6 finales pendientes",
					from: "2003",
					to: "2009"
				},
				{
					id: uniqid(),
					field: "Desarrollador Web Full Stack",
					info: "The Odin Project",
					subInfo: "",
					from: "2022",
					to: "2023"
				}
			],
			idiomas: [
				{
					id: uniqid(),
					field: "Inglés Avanzado",
					info: "PLI English School in Toronto, Canada",
					subInfo: "Super Intensive Course",
					from: "2000",
					to: "2001"
				},
				{
					id: uniqid(),
					field: "Inglés Avanzado",
					info: "University of Cambridge",
					subInfo: "First Certificate",
					from: "1999",
					to: "2000"
				},
				{
					id: uniqid(),
					field: "Inglés Intermedio",
					info: "Egresado Instituto Argentino de Profesores de Inglés (IADEI).",
					subInfo: "Estudios de Inglés",
					from: "1990",
					to: "1999"
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
			],
			intereses: [
				{
					id: uniqid(),
					field: "Ajedrez",
					info: "Competencias online en LiChess.org"
				},
				{
					id: uniqid(),
					field: "Música",
					info: "Guitarra"
				},
				{
					id: uniqid(),
					field: "Carpintería",
					info: "Muebles rústicos"
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

	print = e => {
		const styles = document.querySelectorAll("style");
		// console.log(styles[styles.length - 1].innerHTML);
		let allStyles = "";
		styles.forEach(style => {
			allStyles += `<style>${style.innerHTML}</style>`;
		});
		const preview = document.getElementById("preview").innerHTML;
		const newWindow = window.open("", "", "height=500, width=500");
		newWindow.document.write(`<html><head> ${allStyles} </head>`);
		newWindow.document.write('<body><div id="preview">');
		newWindow.document.write(preview);
		newWindow.document.write("</div></body></html>");
		// newWindow.document.close();
		// newWindow.print();
	};

	render() {
		return (
			<Fragment>
				<header>
					<h1>
						<FontAwesomeIcon icon={faBriefcase} /> CV App
					</h1>
					<button onClick={this.print} id="printButton">
						Abrir vista previa para Imprimir / Exportar PDF
					</button>
				</header>
				<main>
					<Section
						stateName="personal"
						heading="Información Personal"
						singular="null"
						editableFields="false"
						updateMethod={this.updateInfo}
						updatePreviewMethod={this.updatePreview}
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
						updatePreviewMethod={this.updatePreview}
						addItemMethod={this.addItem}
						subInfo="false"
						fromToFields="false"
						sectionState={this.state.habilidades}
					/>
					<Section
						stateName="educacion"
						heading="Educación"
						singular="Carrera"
						editableFields="true"
						updateMethod={this.updateInfo}
						updatePreviewMethod={this.updatePreview}
						addItemMethod={this.addItem}
						subInfo="true"
						fromToFields="true"
						sectionState={this.state.educacion}
					/>
					<Section
						stateName="idiomas"
						heading="Idiomas"
						singular="Idioma"
						editableFields="true"
						updateMethod={this.updateInfo}
						updatePreviewMethod={this.updatePreview}
						addItemMethod={this.addItem}
						subInfo="true"
						fromToFields="true"
						sectionState={this.state.idiomas}
					/>
					<Section
						stateName="experiencia"
						heading="Experiencia Laboral"
						singular="Cargo"
						editableFields="true"
						updateMethod={this.updateInfo}
						updatePreviewMethod={this.updatePreview}
						addItemMethod={this.addItem}
						subInfo="true"
						fromToFields="true"
						sectionState={this.state.experiencia}
					/>
					<Section
						stateName="intereses"
						heading="Intereses"
						singular="null"
						editableFields="true"
						updateMethod={this.updateInfo}
						updatePreviewMethod={this.updatePreview}
						addItemMethod={this.addItem}
						subInfo="false"
						fromToFields="false"
						sectionState={this.state.intereses}
					/>
				</main>
				<Preview data={this.state} />
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
