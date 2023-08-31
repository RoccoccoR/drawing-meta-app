import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
  const { data, error } = useSWR("/api/draws", fetcher);
  console.log("This is data:", data);

  return (
    <>
      Archive Page
      <div>
        {data.map((drawing) => {
          return <h1>{drawing._id}</h1>;
        })}
      </div>
    </>
  );
}
