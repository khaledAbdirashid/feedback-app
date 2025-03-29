import { use } from "react";
import FeedbackContext from "../context/Feedback.context";
import FeedbackItem from "./FeedbackItem.component";
import { motion, AnimatePresence } from "framer-motion";

const FeedbackList = () => {
  const context = use(FeedbackContext);
  if (!context) return;
  const { feedbacks } = context;
  return (
    <section>
      <AnimatePresence>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem key={feedback.id} {...feedback} />
            </motion.div>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeedbackList;
