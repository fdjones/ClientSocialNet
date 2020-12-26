import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";

interface IProps {
  selectedActivity: IActivity | undefined;
}

export const ActivityForm: React.FC<IProps> = observer(
  ({ selectedActivity }) => {
    const {
      createActivity,
      editActivity,
      submitting,
      cancelFormOpen,
    } = React.useContext(ActivityStore);

    function initialiseForm() {
      if (selectedActivity) {
        return selectedActivity;
      }

      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }

    const [activity, setActivity] = React.useState<IActivity>(initialiseForm());

    function handleSubmit() {
      // check if it's a new activity or an edited activity
      if (activity.id.length === 0) {
        createActivity({
          ...activity,
          id: uuid(),
        });
      } else {
        editActivity(activity);
      }
    }

    function handleInputChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      setActivity({ ...activity, [event.target.name]: event.target.value });
    }

    return (
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            value={activity.title}
          />
          <Form.TextArea
            onChange={handleInputChange}
            rows={2}
            placeholder="Description"
            value={activity.description}
            name="description"
          />
          <Form.Input
            onChange={handleInputChange}
            name="category"
            placeholder="Category"
            value={activity.category}
          />
          <Form.Input
            onChange={handleInputChange}
            name="date"
            type="datetime-local"
            placeholder="Date"
            value={activity.date}
          />
          <Form.Input
            onChange={handleInputChange}
            name="city"
            placeholder="City"
            value={activity.city}
          />
          <Form.Input
            onChange={handleInputChange}
            name="venue"
            placeholder="Venue"
            value={activity.venue}
          />
          <Button
            loading={submitting}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            onClick={cancelFormOpen}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    );
  }
);
