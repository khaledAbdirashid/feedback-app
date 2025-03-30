import { createContext, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditProps>({
    feedbackItem: null,
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback from API
  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback?_sort=rating&_order=desc");
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const onAddFeedback = async (newFeedback: Feedback) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      });

      if (!response.ok) throw new Error("Failed to add feedback");

      const data = await response.json();
      setFeedbacks((prevFeedbacks) => [data, ...prevFeedbacks]); // ✅ Using function to avoid stale state
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };


  const onDeleteFeedback = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/api/feedback/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete feedback");

        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback.id !== id)
        );
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };

  
  const onEditFeedback = (feedbackItem: Feedback) => {
    setFeedbackEdit({
      feedbackItem,
      edit: true,
    });
  };

 
  const onUpdateFeedback = async (
    id: string,
    updatedFeedbackItem: Feedback
  ) => {
    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeedbackItem),
      });

      if (!response.ok) throw new Error("Failed to update feedback");

      const updatedFeedback = await response.json();
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback.id === id ? updatedFeedback : feedback
        )
      );
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const value = {
    feedbackEdit,
    feedbacks,
    onAddFeedback,
    onDeleteFeedback,
    onEditFeedback,
    onUpdateFeedback,
    isLoading,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
