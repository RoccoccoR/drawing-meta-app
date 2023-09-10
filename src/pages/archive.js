import useSWR from "swr";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
  const { data, error, isLoading } = useSWR("/api/draws", fetcher);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>no drawings here!</div>;

  // Filter the data to include only drawings with published: true
  const publishedDrawings = data.filter(
    (drawing) => drawing.published === true
  );

  return (
    <section className="archiveGrid">
      {publishedDrawings.map((drawing) => {
        return (
          <div key={drawing._id}>
            <div
            // style={{
            //   backgroundColor: "white",
            //   width: "210px",
            //   height: "297px",
            // }}
            >
              {/* <Image
                className="drawingArchiveImage"
                src={drawing.imageData}
                layout="responsive"
                width="210"
                height="297"
                min-width="74"
                min-height="105"
                alt={`Drawing by ${drawing.userId}`}
              /> */}

              <img
                className="drawingArchiveImage"
                src={drawing.imageData}
                alt={`Drawing by ${drawing.userId}`}
              />
            </div>
            {/* <h1>{drawing._id}</h1>
            <h1>{drawing.userId}</h1> */}
          </div>
        );
      })}
    </section>
  );
}
