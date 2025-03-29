import { useState, use, useEffect } from "react";
import FeedbackRating from "./FeedbackRating.component";
import { v4 as uuidv4 } from "uuid";
import Card from "./shared/Card.component";
import Button from "./shared/Button.component";
import FeedbackContext from "../context/Feedback.context";

const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [rating, setRating] = useState(1);

  const context = use(FeedbackContext);
  if (!context) {
    throw new Error(
      "FeedbackContext must be used within a FeedbackContextProvider"
    );
  }
  const { onAddFeedback, feedbackEdit, onUpdateFeedback } = context;

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(true);
      setComment(feedbackEdit.feedbackItem?.comment!);
      setRating(feedbackEdit.feedbackItem?.rating!);
    }
  }, [feedbackEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value;
    setComment(newComment);

    if (newComment.trim() === "") {
      setMessage("");
      setBtnDisabled(true);
    } else if (newComment.length <= 10) {
      setMessage("Review cannot be less than ten characters");
      setBtnDisabled(true);
    } else {
      setMessage("");
      setBtnDisabled(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || comment.length <= 10) return;
    const newFeedback = {
      id: uuidv4(),
      comment,
      rating,
    };
    if (feedbackEdit.edit === true) {
      onUpdateFeedback(feedbackEdit.feedbackItem?.id!, newFeedback);
    } else {
      onAddFeedback(newFeedback);
    }
    setRating(1);
    setComment("");
    setBtnDisabled(true);
  };
  return (
    <Card>
      <FeedbackRating rating={rating} select={setRating} />
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          placeholder="write a review"
          onChange={handleChange}
          value={comment}
          name="review"
        />
        <Button
          type="submit"
          className={`btn btn-${btnDisabled ? "primary" : "secondary"} `}
        >
          Send
        </Button>
      </form>
      {message && <div className="message">{message}</div>}
    </Card>
  );
};

export default FeedbackForm;
