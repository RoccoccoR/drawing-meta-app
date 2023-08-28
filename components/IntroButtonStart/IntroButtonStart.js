export default function IntroButtonStart({ onClick }) {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <button className="introButtonStart" onClick={handleClick}>
      START
    </button>
  );
}
