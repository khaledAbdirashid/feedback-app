interface Props {
  rating: number;
  select: (rating: number) => void;
}
const FeedbackRating = ({ rating, select }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    select(Number(e.target.value));
  };
  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <li key={num}>
          <input
            checked={rating === num}
            id={`num${num}`}
            name="rating"
            onChange={handleChange}
            type="radio"
            value={num}
          />
          <label htmlFor={`num${num}`}>{num}</label>
        </li>
      ))}
    </ul>
  );
};

export default FeedbackRating;
