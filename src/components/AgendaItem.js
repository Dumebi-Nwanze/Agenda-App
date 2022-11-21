import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
function AgendaItem({ agenda, setValue, reset }) {
  const { agendas, setAgendas, isEditing, setIsEditing, setCurrentAgenda } =
    useContext(AppContext);
  const completeAgenda = () => {
    const completedAgenda = agenda.complete();
    const updatedAgendas = agendas.map((agenda) => {
      return agenda.iD === completedAgenda.iD ? completedAgenda : agenda;
    });
    setAgendas(updatedAgendas);
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setValue("title", agenda.title);
      setValue("desc", agenda.description);
      setValue("date", agenda.date);
      setValue("time", agenda.time);
      setCurrentAgenda(agenda);
    }
  };
  return (
    <div className="flex justify-between items-center p-2.5 bg-white rounded-l-2xl">
      <div className="flex flex-col space-y-2">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            {agenda.date} || {agenda.time}
          </p>
        </div>
        <p className="font-semibold text-2xl">{agenda.title}</p>
        <p className="font-semibold">{agenda.description}</p>
      </div>
      <div className="space-x-2">
        {!agenda.completionStatus && (
          <button
            className="btnSmall bg-green-600"
            onClick={() => {
              completeAgenda();
            }}
          >
            Done
          </button>
        )}

        <button className="btnSmall bg-rose-600" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="btnSmall bg-red-600"
          onClick={() => {
            setAgendas(agendas.filter((ag) => ag !== agenda));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AgendaItem;
