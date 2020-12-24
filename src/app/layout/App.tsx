import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

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
  }

  React.useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(({ data }) => {
        setActivities(data);
      });
  }, []);

  function handleOpenCreateForm() {
    setSelectedActivity(null);
    setEditMode(true);
  }

  function handleCreateActivity(activity: IActivity) {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  function handleEditActivity(activity: IActivity) {
    setActivities(activities.map((a) => (a.id === activity.id ? activity : a)));
    setSelectedActivity(activity);
    setEditMode(false);
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
        />
      </Container>
    </>
  );
}

export default App;
