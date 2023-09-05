import useSWR from "swr";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
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
                width: "210px",
                height: "297px",
              }}>
              <Image
                src={drawing.imageData}
                width="210"
                height="297"
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
