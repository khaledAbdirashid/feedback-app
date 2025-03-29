interface Props {
  children: React.ReactNode;
  reverse?: boolean;
}
const Card = ({ children, reverse }: Props) => {
  return (
    <article
      className="card"
      style={{
        backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "#fff",
        color: reverse ? "#fff" : "#000",
      }}
    >
      {children}
    </article>
  );
};

export default Card;
