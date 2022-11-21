import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";

function ImportAgendas() {
  const { setAgendas, agendas, setLoadImport } = useContext(AppContext);
  const [csvFile, setCsvFile] = useState();
  const toCamel = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };
  const parseCsv = (str, delim = ",") => {
    const headers = str
      .slice(0, str.indexOf("\n"))
      .split(delim)
      .map((header) => {
        return header.replace(/^"(.+(?="$))"$/, "$1");
      })
      .map((header) => toCamel(header));
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const importedAgendas = rows.map((row) => {
      const values = row.split(delim).map((value) => {
        return value.replace(/^"(.+(?="$))"$/, "$1");
      });

      const agendaObject = headers.reduce((agenda, header, index) => {
        agenda[header] = values[index];
        return agenda;
      }, {});
      return agendaObject;
    });
    if (agendas.length === 0) {
      setAgendas(importedAgendas);
    } else {
      const currAgendas = agendas;
      const newArray = currAgendas.concat(importedAgendas);
      setAgendas(newArray);
    }

    setLoadImport(false);
  };
  const importCsv = () => {
    const file = csvFile;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      parseCsv(text);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <form>
        <input
          className="btnStyle bg-green-300"
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
          }}
        />
        <br />
        <div className="flex justify-evenly">
          <button
            className="btnStyle bg-slate-500"
            onClick={(e) => {
              e.preventDefault();
              if (csvFile) {
                importCsv();
              }
            }}
          >
            Import
          </button>
          <button
            className="btnStyle bg-red-500"
            onClick={() => {
              setLoadImport(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImportAgendas;
