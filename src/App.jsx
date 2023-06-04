import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { blankCV, exampleCV } from "./components/defaultCVs";
import Header from "./components/Header";
import Section from "./components/Section";
import Preview from "./components/Preview";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function App() {
  let initialCV = null;
  const savedCVjson = localStorage.getItem("CV");
  if (savedCVjson) {
    const savedCV = JSON.parse(savedCVjson);
    for (const key of Object.keys(savedCV)) {
      savedCV[key].forEach(element => (element.id = uniqid()));
    }
    initialCV = savedCV;
  } else {
    initialCV = blankCV;
  }

  const [cv, setCv] = useState(initialCV);

  useEffect(() => {
    localStorage.setItem("CV", JSON.stringify(cv));
  }, [cv]);

  function updateInfo(obj) {
    const cvCopy = { ...cv };
    const key0 = Object.keys(obj)[0];
    cvCopy[key0] = obj[key0];
    setCv(cvCopy);
  }

  function updatePhoto(url) {
    let cvCopy = { ...cv };
    cvCopy.personal[2].info = url;
    setCv(cvCopy);
  }

  function addItem(stateName, hasSubInfo) {
    let cvCopy = { ...cv };
    const item = {
      id: uniqid(),
      field: "",
      info: ""
    };
    if (hasSubInfo) {
      item.subInfo = "";
    }
    cvCopy[stateName].push(item);
    setCv(cvCopy);
  }

  function loadExample() {
    setCv(exampleCV);
  }

  function loadBlank() {
    setCv(blankCV);
  }

  function print() {
    const styles = document.querySelectorAll("style");
    let allStyles = "";
    styles.forEach(style => {
      allStyles += `<style>${style.innerHTML}</style>`;
    });
    const linkedStylesElement = document.querySelector(
      'link[rel="stylesheet"]'
    );
    let linkStyles;
    if (linkedStylesElement && linkedStylesElement.hasOwnProperty("href")) {
      linkStyles = `<link href="${linkedStylesElement.href}" rel="stylesheet">`;
    }

    const preview = document.getElementById("preview").innerHTML;
    const newWindow = window.open("", "");
    if (linkStyles) {
      newWindow.document.write(
        `<html style="overflow: auto"><head><title>CV - ${cv.personal[0].info}</title>${allStyles}${linkStyles}</head>`
      );
    } else {
      newWindow.document.write(
        `<html style="overflow: auto"><head><title>CV - ${cv.personal[0].info}</title>${allStyles}</head>`
      );
    }

    newWindow.document.write(`<body><div id="preview">`);
    newWindow.document.write(preview);
    newWindow.document.write("</div></body></html>");
    setTimeout(() => {
      newWindow.document.close();
      newWindow.print();
    }, 300);
  }

  return (
    <Fragment>
      <Header loadExample={loadExample} loadBlank={loadBlank} print={print} />
      <main>
        <Section
          stateName="personal"
          heading="Información Personal"
          editableFields={false}
          updateMethod={updateInfo}
          updatePhotoMethod={updatePhoto}
          sectionState={cv.personal}
        />
        <Section
          stateName="habilidades"
          heading="Habilidades"
          singular="Habilidad"
          updateMethod={updateInfo}
          addItemMethod={addItem}
          sectionState={cv.habilidades}
        />
        <Section
          stateName="educacion"
          heading="Educación"
          singular="Carrera"
          updateMethod={updateInfo}
          addItemMethod={addItem}
          subInfo={true}
          fromToFields={true}
          sectionState={cv.educacion}
        />
        <Section
          stateName="idiomas"
          heading="Idiomas"
          singular="Idioma"
          updateMethod={updateInfo}
          addItemMethod={addItem}
          subInfo={true}
          fromToFields={true}
          sectionState={cv.idiomas}
        />
        <Section
          stateName="experiencia"
          heading="Experiencia Laboral"
          singular="Cargo | Empresa"
          updateMethod={updateInfo}
          addItemMethod={addItem}
          subInfo={true}
          fromToFields={true}
          sectionState={cv.experiencia}
        />
        <Section
          stateName="intereses"
          heading="Intereses"
          singular="Interés"
          updateMethod={updateInfo}
          addItemMethod={addItem}
          sectionState={cv.intereses}
        />
      </main>
      <Preview data={cv} />
      <footer className="footerTag">
        <a href="https://github.com/Sedbastian">
          Sedbastian <FontAwesomeIcon icon={faGithub} />
        </a>
        &nbsp;2023
      </footer>
    </Fragment>
  );
}
