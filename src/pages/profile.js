import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Profile() {
  const { data, error, isLoading } = useSWR("/api/draws", fetcher);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>no drawings here!</div>;
  return (
    <>
      {data.map((drawing) => {
        return (
          <div key={drawing._id}>
            <div
              style={{
                backgroundColor: "white",
                width: "420px",
                height: "594px",
              }}>
              <img
                src={drawing.imageData}
                width="420"
                height="594"
                alt={`Drawing by ${drawing.user}`}
              />
            </div>
            <h1>{drawing._id}</h1>
            <h1>{drawing.user}</h1>
          </div>
        );
      })}
    </>
  );
}
