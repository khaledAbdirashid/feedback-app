import { createContext, useState } from "react";
import { feedbackData } from "../feedback";
import {
  Props,
  Feedback,
  FeedbackContextProps,
  FeedbackEditProps,
} from "./Feedback.model";

const FeedbackContext = createContext<FeedbackContextProps | undefined>(
  undefined
);

export const FeedbackContextProvider = ({ children }: Props) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(feedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditProps>({
    feedbackItem: null,
    edit: false,
  });

  const onAddFeedback = (newFeedback: Feedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const onDeleteFeedback = (id: string) => {
    if (window.confirm("Are sure you want to delete this item?")) {
      const newFeedbacks = feedbacks.filter((feedback) => feedback.id !== id);
      setFeedbacks(newFeedbacks);
    }
  };

  const onEditFeedback = (feedbackItem: Feedback) => {
    setFeedbackEdit({
      feedbackItem,
      edit: true,
    });
  };

  const onUpdateFeedback = (id: string, updatedFeedbackItem: Feedback) => {
    setFeedbacks(
      feedbacks.map((feedbackItem) =>
        feedbackItem.id === id
          ? { ...feedbackItem, ...updatedFeedbackItem }
          : feedbackItem
      )
    );
  };
  const value = {
    feedbackEdit,
    feedbacks,
    onAddFeedback,
    onDeleteFeedback,
    onEditFeedback,
    onUpdateFeedback,
  };
  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
