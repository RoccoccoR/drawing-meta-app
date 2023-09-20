import React, { useState } from "react";
import Masonry from "react-layout-masonry";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
  const [page, setPage] = useState(1);
  const pageSize = 100; // Number of drawings to fetch per page

  const { data, error, isLoading } = useSWR(
    `/api/draws?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="centeredText">
        <img
          className="menuIcon"
          src="/satellite-antenna_1f4e1.png"
          alt="Loading"
        />
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="centeredText">
        No drawings here, <br></br> try to refresh!
      </div>
    );

  // Filter the data to include only drawings with published: true
  const publishedDrawings = data.filter(
    (drawing) => drawing.published === true
  );

  // Reverse the order of publishedDrawings
  publishedDrawings.reverse();

  // Define the responsive columns object
  const responsiveColumns = {
    640: 1, // 1 column on screens wider than or equal to 640px
    768: 2, // 2 columns on screens wider than or equal to 768px
    1024: 3, // 3 columns on screens wider than or equal to 1024px
    1280: 5, // 5 columns on screens wider than or equal to 1280px
    1536: 6, // 6 columns on screens wider than or equal to 1536px
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function loadMore() {
    setPage(page + 1); // Increment the page number to fetch the next page of data
  }

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
      <button className="loadMoreButton" onClick={loadMore}>
        Load More
      </button>
      <button className="backToTopButton" onClick={() => scrollToTop()}>
        <img className="menuIcon" src="/top-arrow_1f51d.png" alt="" />
        Back to Top
      </button>
    </section>
  );
}
