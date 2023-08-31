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
      <div>
        {data.map((drawing) => {
          return <h1 key={drawing._id}>{drawing._id}</h1>;
        })}
      </div>
    </>
  );
}
