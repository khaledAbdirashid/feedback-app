import FeedbackHeader from "../components/Feedbackheader.component";
import FeedbackList from "../components/FeedbackList.component";
import FeedbackStats from "../components/Feedbackstats.component";
import FeedbackForm from "../components/Feedbackform.component";
import AboutIconLink from "../components/AboutLink.component";

function Home() {
  return (
    <>
      <FeedbackHeader />
      <div className="container">
        <FeedbackForm />
        <FeedbackStats />
        <FeedbackList />
      </div>
      <AboutIconLink />
    </>
  );
}

export default Home;
