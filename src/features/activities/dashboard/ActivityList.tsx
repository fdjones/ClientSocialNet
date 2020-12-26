import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";

interface IProps {
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = observer(
  ({ deleteActivity, submitting, target }) => {
    const { activities, selectActivity } = useContext(ActivityStore);

    return (
      <Segment clearing>
        <Item.Group divided>
          {activities?.map(
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
                      onClick={() => selectActivity(id)}
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
  }
);
