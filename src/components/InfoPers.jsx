import React, { Component } from "react";
import "./styles/InfoPers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faPhone,
	faLocationDot,
	faCakeCandles,
	faGlobe
} from "@fortawesome/free-solid-svg-icons";

class InfoPers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "Save"
		};
	}

	onSubmitInfoPers = e => {
		e.preventDefault();
		this.props.updateMethod({
			infoPers: {
				nombre: e.target.nombre.value,
				ocupacion: e.target.ocupacion.value,
				email: e.target.email.value,
				telefono: e.target.telefono.value,
				direccion: e.target.direccion.value,
				nacimiento: e.target.nacimiento.value,
				nacionalidad: e.target.nacionalidad.value
			}
		});
		this.setState({ action: "Edit" });
	};

	edit = () => {
		this.setState({ action: "Save" });
	};

	render() {
		const {
			nombre,
			ocupacion,
			email,
			telefono,
			direccion,
			nacimiento,
			nacionalidad
		} = this.props.infoPersState;

		let infoPersRender;
		if (this.state.action === "Save") {
			infoPersRender = (
				<form onSubmit={this.onSubmitInfoPers} autoComplete="on">
					<div>
						<label htmlFor="nombre">Nombre Completo</label>
						<input
							defaultValue={nombre}
							type="text"
							id="nombre"
							name="nombre"
							size="50"
							minLength="2"
							maxLength="50"
							required
						/>
					</div>
					<div>
						<label htmlFor="ocupacion">Ocupación</label>
						<input
							defaultValue={ocupacion}
							type="text"
							id="ocupacion"
							name="ocupacion"
							size="50"
							minLength="2"
							maxLength="50"
						/>
					</div>
					<div>
						<label htmlFor="email">E-Mail</label>
						<input
							defaultValue={email}
							type="email"
							id="email"
							name="email"
							size="50"
							minLength="2"
							maxLength="50"
						/>
					</div>
					<div>
						<label htmlFor="telefono">Teléfono</label>
						<input
							defaultValue={telefono}
							type="number"
							id="telefono"
							name="telefono"
							size="20"
							minLength="5"
							maxLength="20"
						/>
					</div>
					<div>
						<label htmlFor="direccion">Dirección</label>
						<input
							defaultValue={direccion}
							type="text"
							id="direccion"
							name="direccion"
							size="50"
							minLength="5"
							maxLength="50"
						/>
					</div>
					<div>
						<label htmlFor="nacimiento">Fecha de Nacimiento</label>
						<input
							defaultValue={nacimiento}
							type="date"
							id="nacimiento"
							name="nacimiento"
						/>
					</div>
					<div>
						<label htmlFor="nacionalidad">Nacionalidad</label>
						<input
							defaultValue={nacionalidad}
							type="text"
							id="nacionalidad"
							name="nacionalidad"
							size="20"
							minLength="4"
							maxLength="20"
						/>
					</div>
					<button type="submit">Guardar cambios</button>
				</form>
			);
		} else if (this.state.action === "Edit") {
			infoPersRender = (
				<div>
					<div className="nombre">{nombre}</div>
					<div className="ocupacion">{ocupacion}</div>
					<div className="email">
						<FontAwesomeIcon icon={faEnvelope} /> {email}
					</div>
					<div className="telefono">
						<FontAwesomeIcon icon={faPhone} /> {telefono}
					</div>
					<div className="direccion">
						<FontAwesomeIcon icon={faLocationDot} /> {direccion}
					</div>
					<div className="nacimiento">
						<FontAwesomeIcon icon={faCakeCandles} /> {nacimiento}
					</div>
					<div className="nacionalidad">
						<FontAwesomeIcon icon={faGlobe} /> {nacionalidad}
					</div>
					<button onClick={this.edit}>Editar</button>
				</div>
			);
		}

		return (
			<div>
				<h2>Información Personal</h2>
				{infoPersRender}
			</div>
		);
	}
}

export default InfoPers;
