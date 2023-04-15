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
    let sectionUpdate = {};
    sectionUpdate[stateName] = [];
    e.target.querySelectorAll("form>div").forEach((div, index) => {
      let field = "";
      let info = "";
      let subInfo = "";
      let from = "";
      let to = "";

      const fieldElem = div.querySelector(".field");
      const infoElem = div.querySelector(".info");
      const subInfoElem = div.querySelector(".subInfo");
      const fromElem = div.querySelector(".from");
      const toElem = div.querySelector(".to");

      switch (fieldElem.tagName) {
        case "DIV":
          field = fieldElem.textContent;
          break;
        case "INPUT":
          const type = fieldElem.attributes.type.nodeValue;
          if (type === "text") {
            field = fieldElem.value;
          } else if (type === "file") {
            field = "image";
          }
          break;
        default:
          field = fieldElem.textContent;
          break;
      }

      switch (infoElem.tagName) {
        case "INPUT":
        case "TEXTAREA":
          info = infoElem.value;
          break;
        case "IMG":
          info = infoElem.src;
          break;
        default:
          info = infoElem.value;
      }

      let objToPush = {
        id: uniqid(),
        field: field,
        info: info
      };

      // subInfoElem either input[type="text"] or textarea
      if (subInfoElem) {
        subInfo = subInfoElem.value;
        objToPush = { ...objToPush, subInfo: subInfo };
      }

      if (fromElem && toElem) {
        from = fromElem.value;
        to = toElem.value;
        objToPush = { ...objToPush, from: from, to: to };
      }

      if (sectionState[index].hasOwnProperty("icon")) {
        if (sectionState[index].icon && sectionState[index].icon !== "") {
          objToPush = { ...objToPush, icon: sectionState[index].icon };
        }
      }

      if (
        field !== "" ||
        info !== "" ||
        subInfo !== "" ||
        from !== "" ||
        to !== ""
      ) {
        sectionUpdate[stateName].push(objToPush);
      }
    });
    updateMethod(sectionUpdate);
    setAction("Edit");
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
  } else if (singular === "null") {
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
      <form onSubmit={onSubmitSection} className={formClass}>
        {sectionState.map((item, index) => {
          let fieldRender;
          let infoSubinfoRender = null;

          let notEditableClass = null;
          if (item.field === "image") {
            notEditableClass = `notEditable${index}`;
            fieldRender = (
              <input
                ref={fileInput}
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                className="field"
                onChange={e =>
                  updatePhotoMethod(URL.createObjectURL(e.target.files[0]))
                }
              />
            );
            infoSubinfoRender = (
              <img
                src={sectionState[2].info}
                className="info"
                alt="Foto"
                onClick={() => fileInput.current.click()}
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
                  updatePhotoMethod(URL.createObjectURL(fileObj));
                }}
              />
            );
          } else if (editableFields === "true") {
            fieldRender = (
              <input type="text" defaultValue={item.field} className="field" />
            );
            infoSubinfoRender = (
              <Fragment>
                <textarea defaultValue={item.info} className="info"></textarea>
                {subInfo === "true" ? (
                  <textarea
                    defaultValue={item.subInfo}
                    className="subInfo"
                    rows="5"
                  ></textarea>
                ) : null}
              </Fragment>
            );
          } else if (editableFields === "false") {
            notEditableClass = `notEditable${index}`;
            fieldRender = <div className="field">{item.field}</div>;
            if (item.field === "Sitio Web") {
              notEditableClass = `notEditable${index} website`;
              infoSubinfoRender = (
                <div className="webInfo">
                  <div>Nombre</div>
                  <input
                    type="text"
                    defaultValue={item.info}
                    className="info"
                  />
                  <div>Dirección</div>
                  <input
                    type="text"
                    defaultValue={item.subInfo}
                    className="subInfo"
                  />
                </div>
              );
            } else {
              infoSubinfoRender = (
                <input type="text" defaultValue={item.info} className="info" />
              );
            }
          }

          let fromToRender = null;
          if (fromToFields === "true") {
            const fromId = `${stateName}${index}from`;
            const toId = `${stateName}${index}to`;
            fromToRender = (
              <div className="fromTo">
                <label htmlFor={fromId}>Desde</label>
                <input
                  type="text"
                  id={fromId}
                  defaultValue={item.from}
                  className="from"
                />
                <label htmlFor={toId}>Hasta</label>
                <input
                  type="text"
                  id={toId}
                  defaultValue={item.to}
                  className="to"
                />
              </div>
            );
          }
          return (
            <div key={item.id} className={notEditableClass}>
              {fieldRender}
              {infoSubinfoRender}
              {fromToRender}
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
        <button onClick={() => setAction("Save")}>
          <FontAwesomeIcon icon={faPenToSquare} className="icon" />
          <div>Editar</div>
        </button>
      </Fragment>
    );
  }

  const sectionClass = `${stateName} ${action} subInfo-${subInfo} fromTos-${fromToFields}`;

  return (
    <section className={sectionClass}>
      <h2>{heading}</h2>
      {singularOtherInfo}
      {sectionRender}
    </section>
  );
}
