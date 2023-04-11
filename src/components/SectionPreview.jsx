import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolleyball } from "@fortawesome/free-solid-svg-icons";
import astronaut from "./user-astronaut-solid.svg";

class SectionPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "Save",
			personalImage: astronaut
		};
	}

	render() {
		const { stateName, sectionState } = this.props;
		return (
			<div id={stateName}>
				{sectionState.map(item => {
					let divOrIconOrImg;
					if (item.field === "image") {
						divOrIconOrImg = <img src={item.info} alt="Foto" />;
					} else if (
						!item.hasOwnProperty("icon") ||
						(item.hasOwnProperty("icon") && item.icon === "")
					) {
						if (
							item.field !== "Nombre completo" &&
							item.field !== "Ocupación"
						) {
							let subInfo = null;
							if (item.hasOwnProperty("subInfo")) {
								if (item.subInfo !== "") {
									subInfo = <div className="subInfo">{item.subInfo}</div>;
								}
							}
							divOrIconOrImg = (
								<div>
									<div>
										<FontAwesomeIcon icon={faVolleyball} /> {item.field}
									</div>
									<div className="info">{item.info}</div>
									{subInfo}
								</div>
							);
						} else {
							divOrIconOrImg = (
								<div>
									<div className="nameOrTitle">{item.info}</div>
								</div>
							);
						}
					} else if (item.hasOwnProperty("icon") && item.icon !== "") {
						divOrIconOrImg = (
							<div className="field">
								<FontAwesomeIcon icon={item.icon} />
								<div className="info">{item.info}</div>
							</div>
						);
					}

					let fromTo = null;
					if (item.hasOwnProperty("from") || item.hasOwnProperty("to")) {
						fromTo = (
							<div className="fromTo">
								<div>{item.from}</div>
								<div>-</div>
								<div>{item.to}</div>
							</div>
						);
					}

					return (
						<div key={item.id} className="item">
							{divOrIconOrImg}
							{fromTo}
						</div>
					);
				})}
			</div>
		);
	}
}

export default SectionPreview;
