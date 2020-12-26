import React, { SyntheticEvent, useContext } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = React.useState<IActivity[]>([]);
  const [
    selectedActivity,
    setSelectedActivity,
  ] = React.useState<IActivity | null>(null);
  const [editMode, setEditMode] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [target, setTarget] = React.useState("");

  React.useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleOpenCreateForm() {
    setSelectedActivity(null);
    setEditMode(true);
  }

  function handleCreateActivity(activity: IActivity) {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  function handleEditActivity(activity: IActivity) {
    setSubmitting(true);

    agent.Activities.update(activity)
      .then(() => {
        setActivities(
          activities.map((a) => (a.id === activity.id ? activity : a))
        );
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  function handleDeleteActivity(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities(activities.filter((act) => act.id !== id));
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          setSelectedActivity={setSelectedActivity}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

export default observer(App);
