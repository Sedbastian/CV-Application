import React from "react";
import "./styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default function Header({ loadExample, loadBlank, print }) {
  return (
    <header>
      <h1>
        <FontAwesomeIcon icon={faBriefcase} /> CV App
      </h1>
      <button className="exampleButton" onClick={loadExample}>
        Cargar CV de Ejemplo
      </button>
      <button className="blankButton" onClick={loadBlank}>
        Borrar Todo
      </button>
      <button onClick={print} className="printButton">
        Imprimir / Exportar PDF
      </button>
    </header>
  );
}
