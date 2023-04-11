import React, { Component } from "react";
import "./styles/Preview.css";
import SectionPreview from "./SectionPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBrain,
	faGraduationCap,
	faLanguage,
	faBriefcase,
	faGuitar,
	faMountain
} from "@fortawesome/free-solid-svg-icons";

class Preview extends Component {
	onWheel = e => {
		const asidePreview = document.querySelector("aside#preview");
		let topValue = parseInt(asidePreview.style.top, 10);
		if (Number.isNaN(topValue)) {
			topValue = 0;
		}
		asidePreview.style.top = `${topValue - e.deltaY / 2}px`;
	};

	render() {
		const {
			personal,
			habilidades,
			educacion,
			idiomas,
			experiencia,
			intereses
		} = this.props.data;
		return (
			<div className="previewContainer" onWheel={this.onWheel} onClick={this.onClick}>
				<aside id="preview">
					<section className="personal">
						<SectionPreview stateName="personal" sectionState={personal} />
					</section>
					<section className="habilidades">
						<h2>
							<FontAwesomeIcon icon={faBrain} />
							HABILIDADES
						</h2>
						<SectionPreview
							stateName="habilidades"
							sectionState={habilidades}
						/>
					</section>
					<section className="educacion">
						<h2>
							<FontAwesomeIcon icon={faGraduationCap} />
							EDUCACIÓN
						</h2>
						<SectionPreview stateName="educacion" sectionState={educacion} />
					</section>
					<section className="idiomas">
						<h2>
							<FontAwesomeIcon icon={faLanguage} />
							IDIOMAS
						</h2>
						<SectionPreview stateName="idiomas" sectionState={idiomas} />
					</section>
					<section className="experiencia">
						<h2>
							<FontAwesomeIcon icon={faBriefcase} />
							EXPERIENCIA LABORAL
						</h2>
						<SectionPreview
							stateName="experiencia"
							sectionState={experiencia}
						/>
					</section>
					<section className="intereses">
						<h2>
							<FontAwesomeIcon icon={faGuitar} />
							INTERESES
							<FontAwesomeIcon icon={faMountain} />
						</h2>
						<SectionPreview stateName="intereses" sectionState={intereses} />
					</section>
				</aside>
			</div>
		);
	}
}

export default Preview;
