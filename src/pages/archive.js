import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Archive() {
  const { data, error } = useSWR("/api/draws", fetcher);
  console.log(data);

  return <>Archive Page</>;
}
