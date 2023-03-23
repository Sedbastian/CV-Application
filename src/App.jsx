import React, { Component } from "react";
import "./App.css";
import uniqid from "uniqid";
import InfoPers from "./components/InfoPers";
import Habilidades from "./components/Habilidades";
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
			]
		};
	}

	updateInfo = obj => {
		const key0 = Object.keys(obj)[0];
		const changeObj = {};
		changeObj[key0] = obj[key0];
		this.setState(changeObj);
	};

	addSkill = () => {
		this.setState({
			habilidades: this.state.habilidades.concat({
				id: uniqid(),
				nombre: "",
				info: ""
			})
		});
	};

	render() {
		return (
			<div className="app">
				<h1>CV App</h1>
				<InfoPers
					updateMethod={this.updateInfo}
					infoPersState={this.state.infoPers}
				/>
				<Habilidades
					updateMethod={this.updateInfo}
					addSkillMethod={this.addSkill}
					habilidadesState={this.state.habilidades}
				/>
			</div>
		);
	}
}

export default App;
