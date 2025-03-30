import { use } from "react";
import FeedbackContext from "../context/Feedback.context";
import FeedbackItem from "./FeedbackItem.component";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./shared/Spinner.component";

const FeedbackList = () => {
  const context = use(FeedbackContext);
  if (!context) return;
  const { feedbacks, isLoading } = context;

  return (
    <section>
      {isLoading && <Spinner />}
      <AnimatePresence>
        {feedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem {...feedback} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default FeedbackList;
