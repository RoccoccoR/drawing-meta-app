import useSWR, { mutate } from "swr";
import Masonry from "react-layout-masonry";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LogInBtn from "../../components/LogInBtn/LogInBtn";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Profile() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/draws/${session?.user.id}`,
    fetcher
  );
  mutate(`/api/draws/${session?.user.id}`);

  const router = useRouter();
  const { push } = router;

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>no drawings here!</div>;

  async function deleteDrawing(id) {
    try {
      await fetch(`/api/draws/${id}`, {
        method: "DELETE",
      });

      mutate(`/api/draws/${session?.user.id}`);
    } catch (error) {
      console.error("Error deleting drawing:", error);
    }
  }

  async function downloadDrawing(drawing) {
    // complete this function so that it downloads the drawing as a JPEG
    // Hint: you can use the code from the tool page to download the drawing as a JPEG
    // Hint: you can use the code from the archive page to get the drawing data

    try {
      await fetch(`/api/draws/${id}`, {
        method: "GET",
      });

      mutate(`/api/draws/${session?.user.id}`);
    } catch (error) {
      console.error("Error download drawing:", error);
    }
  }

  async function setPublished(drawing) {
    try {
      const response = await fetch(`/api/draws/${drawing._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          published: !drawing.published,
          userId: drawing.userId,
        }),
        headers: { "Content-Type": "application/json" },
      });

      mutate(`/api/draws/${session?.user.id}`);
      // push("/profile");
    } catch (error) {
      console.error("Error updating drawing:", error);
    }
  }

  // Reverse the data array to display drawings in reverse order
  const reversedData = [...data].reverse();

  // Define the responsive columns object
  const responsiveColumns = {
    640: 1, // 1 column on screens wider than or equal to 640px
    768: 2, // 2 columns on screens wider than or equal to 768px
    1024: 3, // 3 columns on screens wider than or equal to 1024px
    1280: 4, // 5 columns on screens wider than or equal to 1280px
  };

  return (
    <section className="masonry">
      <Masonry columns={responsiveColumns} gap={16}>
        {reversedData.map((drawing) => {
          return (
            <div key={drawing._id}>
              <div
              // style={{
              //   backgroundColor: "white",
              //   width: "420px",
              //   height: "594px",
              // }}
              >
                {/* <Image
                src={drawing.imageData}
                width="420"
                height="594"
                alt={`Drawing by ${drawing.user}`}
              /> */}
                <img
                  className="drawingProfileImage"
                  src={drawing.imageData}
                  alt={`Drawing by ${drawing.userId}`}
                />
              </div>
              {/* <h1>{drawing._id}</h1>
            <h1>{drawing.user}</h1> */}
              <div className="toolButtonsContainerProfile">
                <button
                  className="publishButton"
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setPublished(drawing);
                  }}>
                  {drawing.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="deleteButton"
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    deleteDrawing(drawing._id);
                  }}>
                  Delete
                </button>
                <button
                  className="downloadButton"
                  type="button"
                  onClick={() => downloadDrawing(drawing)}>
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </Masonry>
      <LogInBtn />
    </section>
  );
}