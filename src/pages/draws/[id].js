export default function Draw({ draw }) {
  return (
    <div className="drawContainer">
      <h1>{draw.title}</h1>
      <img src={draw.imageData} alt={draw.title} />
      <span>{draw.userId}</span>
    </div>
  );
}

// export async function getStaticPaths() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/draws`);
//   const drawings = await response.json();

//   const paths = drawings.map((drawing) => ({
//     params: { id: drawing._id },
//   }));

//   return { paths, fallback: false };
// }
