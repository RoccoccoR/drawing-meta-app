import React from "react";
import Masonry from "react-layout-masonry";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
  const { data, error, isLoading } = useSWR("/api/draws", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No drawings here!</div>;

  // Filter the data to include only drawings with published: true
  const publishedDrawings = data.filter(
    (drawing) => drawing.published === true
  );

  // Define the responsive columns object
  const responsiveColumns = {
    640: 1, // 1 column on screens wider than or equal to 640px
    768: 2, // 2 columns on screens wider than or equal to 768px
    1024: 3, // 3 columns on screens wider than or equal to 1024px
    1280: 5, // 5 columns on screens wider than or equal to 1280px
    1536: 6, // 6 columns on screens wider than or equal to 1536px
  };

  return (
    <section className="masonry">
      <Masonry columns={responsiveColumns} gap={16}>
        {publishedDrawings.map((drawing) => (
          <div key={drawing._id} className="masonry-item">
            <div>
              <img
                className="drawingArchiveImage"
                src={drawing.imageData}
                alt={`Drawing by ${drawing.userId}`}
              />
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
}
