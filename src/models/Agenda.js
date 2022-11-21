class Agenda {
  constructor(iD, title, description, date, time, completionStatus) {
    this.iD = iD;
    this.title = title;
    this.description = description;
    this.time = time;
    this.date = date;
    this.completionStatus = completionStatus;
  }
  complete() {
    this.completionStatus = true;
    return this;
  }
}

export default Agenda;
