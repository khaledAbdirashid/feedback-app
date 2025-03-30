import { use } from "react";
import FeedbackContext from "../context/Feedback.context";

const FeedbackStats = () => {
  const context = use(FeedbackContext);
  if (!context) return;
  const { feedbacks } = context;

  const totalReviews = feedbacks.length;
  let averageRating =
    feedbacks.length === 0
      ? 0
      : feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
        feedbacks.length;

  averageRating = parseFloat(averageRating.toFixed(1).replace(/[.,]0$/, ""));

  return (
    <div className="feedback-stats">
      <p>{totalReviews} Reviews</p>
      <p>Average:{averageRating}</p>
    </div>
  );
};

export default FeedbackStats;
