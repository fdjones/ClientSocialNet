import { IActivity } from "./../models/activity";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  activities: IActivity[] = [];
  loadingInitial = false;
  selectedActivity: IActivity | undefined;
  editMode = false;

  constructor() {
    // Don't need decorators now, just this call
    makeAutoObservable(this);
  }

  loadActivities = () => {
    this.loadingInitial = true;

    agent.Activities.list()
      .then((activities) => {
        this.activities = activities.map((activity) => ({
          ...activity,
          // remove extra level of accuracy in datetime returned from server
          // in order to format correctly on front end
          date: activity.date.split(".")[0],
        }));
      })
      .finally(() => {
        this.loadingInitial = false;
      });
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(
      (activity) => activity.id === id
    );

    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
