import { observer } from "mobx-react-lite";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";

interface IDetailParams {
  id: string;
}
export const ActivityForm: React.FC<
  RouteComponentProps<IDetailParams>
> = observer(({ match, history }) => {
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = React.useContext(ActivityStore);

  const [activity, setActivity] = React.useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  React.useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });

      return clearActivity;
    }
  }, [
    activity.id.length,
    clearActivity,
    initialFormState,
    loadActivity,
    match.params.id,
  ]);

  function handleSubmit() {
    // check if it's a new activity or an edited activity
    if (activity?.id.length === 0) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };

      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity!).then(() => {
        history.push(`/activities/${activity.id}`);
      });
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
});
