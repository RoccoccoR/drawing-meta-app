import useSWR, { mutate } from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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

  async function setPublished(drawing) {
    try {
      const response = await fetch(
        `/api/draws/${drawing._id}`,

        {
          method: "PATCH",
          body: JSON.stringify({
            published: !drawing.published,
            userId: drawing.userId,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      mutate(`/api/draws/${session?.user.id}`);
      // push("/profile");
    } catch (error) {
      console.error("Error updating drawing:", error);
    }
  }

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
              <Image
                src={drawing.imageData}
                width="420"
                height="594"
                alt={`Drawing by ${drawing.user}`}
              />
            </div>
            <h1>{drawing._id}</h1>
            <h1>{drawing.user}</h1>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                deleteDrawing(drawing._id);
              }}>
              Delete
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setPublished(drawing);
              }}>
              {drawing.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        );
      })}
    </>
  );
}
