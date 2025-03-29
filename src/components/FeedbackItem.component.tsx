import { FaEdit, FaTimes } from "react-icons/fa";
import Button from "./shared/Button.component";
import Card from "./shared/Card.component";
import { use } from "react";
import FeedbackContext from "../context/Feedback.context";

interface Props {
  id: string;
  comment: string;
  rating: number;
}

const FeedbackItem = ({ id, rating, comment }: Props) => {
  const context = use(FeedbackContext);
  if (!context) return;
  const { onDeleteFeedback, onEditFeedback } = context;

  return (
    <Card>
      <div className="num-display">{rating}</div>
      <Button className="close" onClick={() => onDeleteFeedback(id)}>
        <FaTimes color="purple" />
      </Button>
      <Button
        className="edit"
        onClick={() => onEditFeedback({ id, rating, comment })}
      >
        <FaEdit color="purple" />
      </Button>
      <article className="text-display">{comment}</article>
    </Card>
  );
};

export default FeedbackItem;
