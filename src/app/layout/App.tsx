import React from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/activity";

function App() {
  const [activities, setActivities] = React.useState<IActivity[]>([]);

  React.useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(({ data }) => {
        setActivities(data);
      });
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="plug" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities?.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
