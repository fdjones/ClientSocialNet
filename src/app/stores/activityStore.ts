import { IActivity } from "./../models/activity";
import { action, makeAutoObservable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

class ActivityStore {
  activityRegistry = new Map();
  activities: IActivity[] = [];
  loadingInitial = false;
  selectedActivity: IActivity | undefined;
  editMode = false;
  submitting = false;
  target = "";

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = () => {
    this.loadingInitial = true;

    agent.Activities.list()
      .then(
        action("fetchSuccess", (activities: IActivity[]) => {
          activities.forEach((activity) => {
            activity.date = activity.date.split(".")[0];
            this.activityRegistry.set(activity.id, activity);
          });
        })
      )

      .finally(
        action("finallyAction", () => {
          this.loadingInitial = false;
        })
      );
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  createActivity = (activity: IActivity) => {
    this.submitting = true;
    agent.Activities.create(activity)
      .then(
        action("createSuccess", () => {
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          this.editMode = false;
        })
      )
      .finally(
        action("createFinally", () => {
          this.submitting = false;
        })
      );
  };

  editActivity = (activity: IActivity) => {
    this.submitting = true;

    agent.Activities.update(activity)
      .then(
        action("editSuccess", () => {
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          this.editMode = false;
        })
      )
      .finally(
        action("editFinally", () => {
          this.submitting = false;
        })
      );
  };

  deleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    agent.Activities.delete(id)
      .then(
        action("deleteSuccess", () => {
          this.activityRegistry.delete(id);
        })
      )
      .finally(
        action("deleteFinally", () => {
          this.submitting = false;
        })
      );
  };

  openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  cancelFormOpen = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
