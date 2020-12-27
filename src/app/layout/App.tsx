import React from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route
                exact
                path="/activities"
                component={ActivityDashboard}
              ></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                exact
                key={location.key}
                path={["/create-activity", "/manage/:id"]}
                component={ActivityForm}
              ></Route>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
