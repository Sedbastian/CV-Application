import React, { Fragment, useState, useRef } from "react";
import "./styles/Section.css";
import uniqid from "uniqid";
import SectionPreview from "./SectionPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faPlus,
	faPenToSquare
} from "@fortawesome/free-solid-svg-icons";

export default function Section({
	stateName,
	heading,
	singular,
	editableFields,
	updateMethod,
	updatePhotoMethod,
	addItemMethod,
	subInfo,
	fromToFields,
	sectionState
}) {
	const [action, setAction] = useState("Save");
	const fileInput = useRef(null);

	function onSubmitSection(e) {
		e.preventDefault();
		let stateUpdate = {};
		stateUpdate[stateName] = [];
		e.target.querySelectorAll("form>div").forEach((div, index) => {
			let field;
			let info;
			let icon;
			if (stateName === "personal" && index === 2) {
				field = "image";
				info = div.children[1].src;
			} else if (!(stateName === "personal" && index === 2)) {
				info = div.children[1].value;
				if (editableFields === "true") {
					field = div.children[0].value;
				} else if (editableFields === "false") {
					field = div.children[0].textContent;
					if (sectionState[index].hasOwnProperty("icon")) {
						icon = sectionState[index].icon;
					}
				}
			}

			let objToPush = {
				id: uniqid(),
				field: field,
				info: info
			};

			if (icon) {
				objToPush = { ...objToPush, icon: icon };
			}

			const textareaOfSubInfo = div.querySelector("textarea.subInfo");
			if (textareaOfSubInfo) {
				objToPush = { ...objToPush, subInfo: textareaOfSubInfo.value };
			}

			if (fromToFields === "false") {
				if (field !== "" || info !== "") {
					stateUpdate[stateName].push(objToPush);
				}
			} else if (fromToFields === "true") {
				const from = div.querySelector("#from").value;
				const to = div.querySelector("#to").value;
				if (field !== "" || info !== "" || from !== "" || to !== "") {
					stateUpdate[stateName].push({ ...objToPush, from: from, to: to });
				}
			}
		});
		updateMethod(stateUpdate);
		setAction("Edit");
	}

	function edit() {
		setAction("Save");
	}

	function fileUploaded(file) {
		updatePhotoMethod(URL.createObjectURL(file));
	}

	function onPhotoClick() {
		fileInput.current.click();
	}

	let singularOtherInfo;
	if (singular !== "null" && action === "Save") {
		let otherInfo = <div>Información Adicional</div>;
		let interval = null;
		if (fromToFields === "true") {
			interval = <div>Período</div>;
		}
		singularOtherInfo = (
			<div className="singInfoInter">
				<div>{singular}</div>
				{otherInfo}
				{interval}
			</div>
		);
	} else if (singular === "null" || action === "Edit") {
		singularOtherInfo = null;
	}

	let sectionRender;
	if (action === "Save") {
		let addItemButton = null;
		if (addItemMethod !== "null") {
			addItemButton = (
				<button
					type="button"
					onClick={() => {
						addItemMethod(stateName, subInfo === "true");
					}}
				>
					<FontAwesomeIcon icon={faPlus} className="icon" />
					<div>Agregar {singular}</div>
				</button>
			);
		}
		const formClass = `editableFields-${editableFields}`;
		sectionRender = (
			<form onSubmit={onSubmitSection} autoComplete="on" className={formClass}>
				{sectionState.map((item, index) => {
					let subInfoTextarea = null;
					if (subInfo === "true") {
						subInfoTextarea = (
							<textarea
								defaultValue={item.subInfo}
								className="subInfo"
								rows="5"
							></textarea>
						);
					}
					let inputInfo = null;
					if (stateName === "personal") {
						inputInfo = <input type="text" defaultValue={item.info} />;
					} else {
						inputInfo = (
							<Fragment>
								<textarea defaultValue={item.info}></textarea>
								{subInfoTextarea}
							</Fragment>
						);
					}

					let inputOrDiv;
					let notEditableClass = null;
					if (item.field === "image") {
						notEditableClass = `notEditable${index}`;
						inputOrDiv = (
							<input
								ref={fileInput}
								type="file"
								id="fileInput"
								accept="image/*"
								style={{ display: "none" }}
								onChange={e => fileUploaded(e.target.files[0])}
							/>
						);
						inputInfo = (
							<img
								src={sectionState[2].info}
								alt="Foto"
								onClick={onPhotoClick}
								onDragEnter={e => {
									e.stopPropagation();
									e.preventDefault();
								}}
								onDragOver={e => {
									e.stopPropagation();
									e.preventDefault();
								}}
								onDrop={e => {
									e.stopPropagation();
									e.preventDefault();
									const fileObj = e.dataTransfer.files[0];
									fileUploaded(fileObj);
								}}
							/>
						);
					} else if (editableFields === "true") {
						inputOrDiv = <input type="text" defaultValue={item.field} />;
					} else if (editableFields === "false") {
						notEditableClass = `notEditable${index}`;
						inputOrDiv = <div>{item.field}</div>;
					}
					let fromToInputs = null;
					if (fromToFields === "true") {
						fromToInputs = (
							<div className="fromTo">
								<label htmlFor="from">Desde</label>
								<input type="text" id="from" defaultValue={item.from} />
								<label htmlFor="to">Hasta</label>
								<input type="text" id="to" defaultValue={item.to} />
							</div>
						);
					}
					return (
						<div key={item.id} className={notEditableClass}>
							{inputOrDiv}
							{inputInfo}
							{fromToInputs}
						</div>
					);
				})}

				{addItemButton}
				<button type="submit">
					<FontAwesomeIcon icon={faCheck} className="icon" />
					<div className="pipe">&nbsp;</div>
					<div>Guardar</div>
				</button>
			</form>
		);
	} else if (action === "Edit") {
		sectionRender = (
			<Fragment>
				<SectionPreview stateName={stateName} sectionState={sectionState} />
				<button onClick={edit}>
					<FontAwesomeIcon icon={faPenToSquare} className="icon" />
					<div>Editar</div>
				</button>
			</Fragment>
		);
	}

	let subInfoClass = "subInfo-false";
	if (subInfo === "true") {
		subInfoClass = "subInfo-true";
	}
	
	const sectionClass = `${stateName} ${action} ${subInfoClass} fromTos-${fromToFields}`;

	return (
		<section className={sectionClass}>
			<h2>{heading}</h2>
			{singularOtherInfo}
			{sectionRender}
		</section>
	);
}
