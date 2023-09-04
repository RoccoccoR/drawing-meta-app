import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
  const { data, error, isLoading } = useSWR("/api/draws", fetcher);
  console.log("This is data:", data);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>no drawings here!</div>;
  return (
    <>
      Archive Page
      {data.map((drawing) => {
        return (
          <div key={drawing._id}>
            <h1>{drawing.imageData}</h1>
            <h1>{drawing._id}</h1>
            <h1>{drawing.user}</h1>
          </div>
        );
      })}
    </>
  );
}
