import React from "react";

import Agenda from "../models/Agenda";
import { AppContext } from "../App";
import { useContext } from "react";
import moment from "moment";

function AgendaForm({ handleSubmit, errors, reset, register }) {
  const { setAgendas, agendas, isEditing, setIsEditing, currentAgenda } =
    useContext(AppContext);

  var currdate = new Date();
  var dd = currdate.getDate();
  var mm = currdate.getMonth() + 1;
  var yyyy = currdate.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var today = yyyy + "-" + mm + "-" + dd;

  const onSubmit = (data) => {
    if (!isEditing) {
      const id = Math.floor(Math.random() * 1000000);
      const agenda = new Agenda(
        id,
        data.title,
        data.desc,
        data.date.toISOString().slice(0, 10),
        data.time,
        false
      );
      setAgendas([...agendas, agenda]);
      reset();
    } else {
      const updatedAgenda = new Agenda(
        currentAgenda.iD,
        data.title,
        data.desc,
        moment(data.date).format("YYYY-MM-DD"),
        data.time,
        currentAgenda.completionStatus
      );
      const updatedAgendas = agendas.map((agenda) => {
        return agenda.iD === updatedAgenda.iD ? updatedAgenda : agenda;
      });
      setAgendas(updatedAgendas);
      reset();
      setIsEditing(false);
    }
  };
  return (
    <div className="w-full max-w-3xl">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="txtInput"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <p>{errors.title?.message ?? ""}</p>
        <input
          className="txtInput"
          type="text"
          placeholder="Description"
          {...register("desc")}
        />
        <p>{errors.desc?.message ?? ""}</p>
        <input
          className="txtInput"
          type="date"
          min={today}
          {...register("date")}
        />
        <p>{errors.date?.message ?? ""}</p>
        <input className="txtInput" type="time" {...register("time")} />
        <p>{errors.time?.message ?? ""}</p>
        <input
          className="btnStyle bg-green-400"
          type="submit"
          value={isEditing ? "Update" : "Add"}
        />
        {isEditing && (
          <button
            className="btnStyle bg-red-400"
            onClick={() => {
              reset();
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {}
    </div>
  );
}

export default AgendaForm;
