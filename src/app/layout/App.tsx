import React from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";

function App() {
  const [activities, setActivities] = React.useState<IActivity[]>([]);
  const [
    selectedActivity,
    setSelectedActivity,
  ] = React.useState<IActivity | null>(null);
  const [editMode, setEditMode] = React.useState(false);

  function handleSelectActivity(id: string) {
    const activityToSelect = activities.find((activity) => activity.id === id);

    if (activityToSelect) {
      setSelectedActivity(activityToSelect);
    }

    setEditMode(false);
  }

  React.useEffect(() => {
    agent.Activities.list().then((activities) => {
      setActivities(
        activities.map((activity) => ({
          ...activity,
          // remove extra level of accuracy in datetime returned from server
          // in order to format correctly on front end
          date: activity.date.split(".")[0],
        }))
      );
    });
  }, []);

  function handleOpenCreateForm() {
    setSelectedActivity(null);
    setEditMode(true);
  }

  function handleCreateActivity(activity: IActivity) {
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  }

  function handleEditActivity(activity: IActivity) {
    agent.Activities.update(activity).then(() => {
      setActivities(
        activities.map((a) => (a.id === activity.id ? activity : a))
      );
      setSelectedActivity(activity);
      setEditMode(false);
    });
  }

  function handleDeleteActivity(id: string) {
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((act) => act.id !== id));
    });
  }

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          selectActivity={handleSelectActivity}
          activities={activities}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
