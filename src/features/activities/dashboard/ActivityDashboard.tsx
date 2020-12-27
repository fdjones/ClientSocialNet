import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { ActivityList } from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityDashboard = () => {
  const activityStore = useContext(ActivityStore);

  React.useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
