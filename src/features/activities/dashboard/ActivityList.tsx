import React, { SyntheticEvent } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
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
};
