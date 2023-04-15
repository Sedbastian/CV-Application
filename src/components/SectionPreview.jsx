import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolleyball } from "@fortawesome/free-solid-svg-icons";

export default function SectionPreview({ stateName, sectionState }) {
  return (
    <div id={stateName}>
      {sectionState.map(item => {
        let fieldInfoSubinfo;
        if (item.field === "image") {
          fieldInfoSubinfo = <img src={item.info} alt="Foto" />;
        } else if (
          !item.hasOwnProperty("icon") ||
          (item.hasOwnProperty("icon") && item.icon === "")
        ) {
          if (item.field !== "Nombre completo" && item.field !== "Ocupación") {
            let subInfo = null;
            if (item.hasOwnProperty("subInfo")) {
              if (item.subInfo !== "") {
                subInfo = <div className="subInfo">{item.subInfo}</div>;
              }
            }
            fieldInfoSubinfo = (
              <div>
                <div>
                  <FontAwesomeIcon icon={faVolleyball} /> {item.field}
                </div>
                <div className="info">{item.info}</div>
                {subInfo}
              </div>
            );
          } else {
            fieldInfoSubinfo = (
              <div>
                <div className="nameOrTitle">{item.info}</div>
              </div>
            );
          }
        } else if (item.hasOwnProperty("icon") && item.icon !== "") {
          let info = null;
          if (item.field === "Email") {
            const href = `mailto:${item.info}`;
            info = (
              <a href={href} className="info">
                {item.info}
              </a>
            );
          } else if (item.field === "Sitio Web") {
            info = (
              <a href={item.subInfo} className="info">
                {item.info}
              </a>
            );
          } else if (item.field !== "Email") {
            info = <div className="info">{item.info}</div>;
          }
          fieldInfoSubinfo = (
            <div className="field">
              <FontAwesomeIcon icon={item.icon} />
              {info}
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
            {fieldInfoSubinfo}
            {fromTo}
          </div>
        );
      })}
    </div>
  );
}
