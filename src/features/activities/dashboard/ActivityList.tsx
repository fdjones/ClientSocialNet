import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";

export const ActivityList = observer(() => {
  const { activitiesByDate, deleteActivity, submitting, target } = useContext(
    ActivityStore
  );

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate?.map(
          ({ title, date, description, city, category, venue, id }) => (
            <Item key={id}>
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Meta>{date}</Item.Meta>
                <Item.Description>
                  <div>{description}</div>
                  <div>
                    {city}, {venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/activities/${id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={id}
                    loading={target === id && submitting}
                    onClick={(e) => deleteActivity(e, id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content={category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        )}
      </Item.Group>
    </Segment>
  );
});
