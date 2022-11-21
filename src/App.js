import { useState, createContext } from "react";
import "./App.css";
import AgendaForm from "./components/AgendaForm";
import AgendaList from "./components/AgendaList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Agenda from "./models/Agenda";
import { CSVLink } from "react-csv";
import ImportAgendas from "./components/ImportAgendas";

export const AppContext = createContext();

function App() {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    desc: yup.string().required("Description is required"),
    date: yup.date().required("Select a date"),
    time: yup.string().required("Select a time"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [agendas, setAgendas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAgenda, setCurrentAgenda] = useState(new Agenda());
  const headers = [
    { label: "ID", key: "iD" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Completion Status", key: "completionStatus" },
  ];

  const csvReport = {
    filename: "Agendas.csv",
    headers: headers,
    data: agendas,
  };
  const [loadImport, setLoadImport] = useState(false);
  const handleImport = () => {
    setLoadImport(true);
  };

  return (
    <AppContext.Provider
      value={{
        agendas,
        setAgendas,
        isEditing,
        setIsEditing,
        currentAgenda,
        setCurrentAgenda,
        loadImport,
        setLoadImport,
      }}
    >
      <div className="flex flex-col items-center w-full min-h-screen p-5 bg-blue-100">
        <h1 className="text-2xl font-semibold my-5">Agenda App</h1>
        <AgendaForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          reset={reset}
        />
        <AgendaList setValue={setValue} reset={reset} />
        <div className="w-full flex justify-evenly ">
          <button className="btnStyle bg-slate-600" onClick={handleImport}>
            Import Agendas
          </button>
          <CSVLink className="btnStyle bg-slate-600" {...csvReport}>
            Export Agendas
          </CSVLink>
        </div>
        {loadImport && <ImportAgendas />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
