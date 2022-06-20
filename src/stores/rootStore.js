import React from "react";
import { makeObservable, observable, computed, action } from "mobx";
import { v4 as uuid } from "uuid";
import orderBy from "lodash.orderby";
import escaperegexp from "lodash.escaperegexp";

export default class Store {
  constructor(data) {
    this.jobs = data.jobs;

    makeObservable(this, {
      jobs: observable,
      activeJob: observable,
      activeNotes: observable,
      activeNotesJobId: observable,
      isNotesEdited: observable,
      sortDirection: observable,
      searchQuery: observable,
      showJobDetails: action,
      hideJobDetails: action,
      saveJobChanges: action,
      updateActiveJobStatus: action,
      showNotes: action,
      hideNotes: action,
      deleteNote: action,
      updateNote: action,
      addNewNote: action,
      setSearchQuery: action,
      saveNotesChanges: action,
      sortJobsByDate: action,
      activeJobIndex: computed,
      saveJobChangesButtonDisabled: computed,
      saveNotesChangesButtonDisabled: computed,
      filtredJobs: computed,
      hasFiltredJobs: computed,
    });
  }

  //observables
  activeJob = null;
  activeNotes = null;
  activeNotesJobId = null;
  isNotesEdited = false;
  sortDirection = "desc";
  sortField = "createdTimestamp";
  searchQuery = "";

  //actions

  showJobDetails = (job) => {
    this.activeJob = { ...job };
  };

  hideJobDetails = () => {
    this.activeJob = null;
  };

  updateActiveJobStatus = (status) => {
    this.activeJob.status = status;
  };

  saveJobChanges = () => {
    this.jobs[this.activeJobIndex] = { ...this.activeJob };
    this.hideJobDetails();
  };

  showNotes = (notes, jobId) => {
    this.activeNotes = [
      ...notes.map((note) => {
        return { ...note };
      }),
    ];
    this.activeNotesJobId = jobId;
  };

  hideNotes = () => {
    this.activeNotes = null;
    this.activeNotesJobId = null;
    this.isNotesEdited = false;
  };

  deleteNote = (uuid) => {
    this.isNotesEdited = true;

    const index = this.activeNotes.findIndex((note) => {
      return note.uuid === uuid;
    });
    this.activeNotes.splice(index, 1);
  };

  updateNote = (uuid, description) => {
    this.isNotesEdited = true;

    const index = this.activeNotes.findIndex((note) => {
      return note.uuid === uuid;
    });
    const updatedNote = this.activeNotes[index];
    if (updatedNote.isNew) {
      delete updatedNote.isNew;
    }

    this.activeNotes[index].description = description;
  };

  addNewNote = () => {
    this.isNotesEdited = true;
    this.activeNotes.push({
      uuid: uuid(),
      description: "",
      isNew: true,
      createdTimestamp: Math.floor(Date.now() / 1000),
    });
  };

  saveNotesChanges = () => {
    const jobIndex = this.jobs.findIndex(
      (job) => job.jobId === this.activeNotesJobId
    );
    this.jobs[jobIndex].notes = [...this.activeNotes];
    this.hideNotes();
  };

  sortJobsByDate = (sortDirection) => {
    this.sortDirection = sortDirection;
  };

  setSearchQuery = (searchQuery) => {
    this.searchQuery = searchQuery;
  };

  //computed props
  get activeJobIndex() {
    return this.activeJob
      ? this.jobs.findIndex((job) => job.uuid === this.activeJob.uuid)
      : null;
  }

  get saveJobChangesButtonDisabled() {
    return this.activeJob
      ? this.activeJob.status === this.jobs[this.activeJobIndex].status
      : true;
  }

  get saveNotesChangesButtonDisabled() {
    return !this.isNotesEdited;
  }

  get sortedJobs() {
    return orderBy(this.jobs, ["createdTimestamp"], this.sortDirection);
  }

  get filtredJobs() {
    if (!this.searchQuery) return this.sortedJobs;

    const searchExpression = new RegExp(escaperegexp(this.searchQuery), "i");

    const jobIdFilter = (job) => {
      return job.jobId.search(searchExpression) !== -1;
    };

    return this.sortedJobs.filter(jobIdFilter);
  }

  get hasFiltredJobs() {
    return this.filtredJobs.length > 0;
  }
}

//Store utils
const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);
