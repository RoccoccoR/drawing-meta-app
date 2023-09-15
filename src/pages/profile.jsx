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

  if (isLoading) return <div className="centeredText">Loading...</div>;
  if (error)
    return (
      <div className="centeredText">
        No drawings here, <br></br>try to refresh!
      </div>
    );

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
    try {
      const response = await fetch(`/api/draws/${drawing._id}`, {
        method: "GET",
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Create a new canvas to draw the image
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);

          // Convert the canvas content to a data URL in JPEG format
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);

            // Create a download link for the image
            const link = document.createElement("a");
            link.href = url;
            link.download = `drawing_${drawing._id}.jpg`;
            link.click();

            // Clean up the created URLs
            URL.revokeObjectURL(url);
          }, "image/jpeg");
        };

        img.src = data.imageData; // Assuming the API response contains an 'imageData' field with the image URL
      } else {
        console.error("Failed to download drawing");
      }
    } catch (error) {
      console.error("Error downloading drawing:", error);
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
                  className="menubarItemA navBarMenu"
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setPublished(drawing);
                  }}>
                  {drawing.published ? (
                    <>
                      <img
                        className="menuIcon"
                        src="/boomerang_1fa83.png"
                        alt="Unpublish"
                      />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <img
                        className="menuIcon"
                        src="/boomerang_1fa83.png"
                        alt="Publish"
                      />
                      Publish
                    </>
                  )}
                </button>

                <button
                  className="menubarItem navBarProfile"
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    deleteDrawing(drawing._id);
                  }}>
                  <img
                    className="menuIcon"
                    src="/wastebasket_1f5d1-fe0f.png"
                    alt="clear"
                  />
                  Delete
                </button>
                {/* <button
                  className="downloadButton"
                  type="button"
                  onClick={() => downloadDrawing(drawing)}>
                  Download
                </button> */}
              </div>
            </div>
          );
        })}
      </Masonry>
      <LogInBtn />
    </section>
  );
}
