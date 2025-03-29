export interface Feedback {
  id: string;
  comment: string;
  rating: number;
}

export interface FeedbackContextProps {
  feedbacks: Feedback[];
  onAddFeedback: (newFeedback: Feedback) => void;
  onDeleteFeedback: (id: string) => void;
  onEditFeedback: (feedbackItem: Feedback) => void;
  onUpdateFeedback: (id: string, updatedFeedbackItem: Feedback) => void;
  feedbackEdit: { feedbackItem: Feedback | null; edit: boolean };
}

export interface Props {
  children: React.ReactNode;
}

export interface FeedbackEditProps {
  feedbackItem: Feedback | null;
  edit: boolean;
}
