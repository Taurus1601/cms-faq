import Image from "next/image";

export default function Home({ params, searchParams }) {
  const newParam = searchParams.new;
  return (
    <>
      <h1>
        hello {params.id}
        {newParam}
      </h1>
    </>
  );
}