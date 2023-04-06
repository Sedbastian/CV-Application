import React, { Component } from "react";
// import "./styles/Preview.css";
import SectionPreview from "./SectionPreview";

class Preview extends Component {
	render() {
		const { personal, habilidades, educacion, idiomas, experiencia } =
			this.props.data;
		return (
			<aside id="preview" style={{ transform: "scale(0.8)" }}>
				<section className="personal">
					<SectionPreview stateName="personal" sectionState={personal} />
				</section>
				<section className="habilidades">
					<SectionPreview stateName="habilidades" sectionState={habilidades} />
				</section>
				<section className="educacion">{educacion[0].info}</section>
				<section className="idiomas">{idiomas[0].info}</section>
				<section className="experiencia">{experiencia[0].info}</section>
			</aside>
		);
	}
}

export default Preview;
