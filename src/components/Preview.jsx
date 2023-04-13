import React from "react";
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

export default function Preview(props) {
	const onWheel = e => {
		let topValue = parseInt(e.currentTarget.style.top, 10);
		if (Number.isNaN(topValue)) {
			topValue = 0;
		}
		topValue -= e.deltaY;
		if (topValue < 350 && topValue > -350) {
			e.currentTarget.style.top = `${topValue}px`;
		}
	};

	const onClick = e => {
		const header = document.querySelector("header");
		const main = document.querySelector("main");

		if (e.currentTarget.style.zIndex === "") {
			header.style.opacity = "0.5";
			main.style.opacity = "0.5";
			e.currentTarget.style.zIndex = "3";
			e.currentTarget.style.transform = "scale(1)";
			e.currentTarget.style.left = `-${main.offsetWidth / 2}px`;
			e.currentTarget.style.top = "300px";
		} else {
			const asidePreview = document.querySelector("aside#preview");
			header.style.opacity = "";
			main.style.opacity = "";
			asidePreview.style.zIndex = "";
			asidePreview.style.transform = "";
			asidePreview.style.left = "";
			asidePreview.style.top = "";
		}
	};

	const { personal, habilidades, educacion, idiomas, experiencia, intereses } =
		props.data;

	return (
		<div className="previewContainer">
			<aside id="preview" onWheel={onWheel} onClick={onClick}>
				<section className="personal">
					<SectionPreview stateName="personal" sectionState={personal} />
				</section>
				<section className="habilidades">
					<h2>
						<FontAwesomeIcon icon={faBrain} />
						HABILIDADES
					</h2>
					<SectionPreview stateName="habilidades" sectionState={habilidades} />
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
					<SectionPreview stateName="experiencia" sectionState={experiencia} />
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
