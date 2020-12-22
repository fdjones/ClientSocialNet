import React from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(({ data }) => {
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
        {activities?.map((activity: any) => (
          <List.Item key={activity.id}>{activity.name}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
