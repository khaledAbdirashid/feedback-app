import { Link } from "react-router-dom";

const About = () => {
  return (
    <article className="about">
      <h1>About this project</h1>
      <p>This is a React app to leave feedback for a product or services</p>
      <p>Version:1.0.0</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </article>
  );
};

export default About;
