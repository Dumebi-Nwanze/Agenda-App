import React from "react";

import { AppContext } from "../App";
import { useContext } from "react";
import AgendaItem from "./AgendaItem";

function AgendaList({ setValue, reset }) {
  const { agendas } = useContext(AppContext);
  return (
    <div className="w-full max-h-36 max-w-3xl my-2.5 overflow-hidden overflow-y-scroll">
      {agendas.map((agenda) => (
        <AgendaItem
          key={agenda.iD}
          agenda={agenda}
          setValue={setValue}
          reset={reset}
        />
      ))}
    </div>
  );
}

export default AgendaList;
