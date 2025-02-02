import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <div className="container flex flex-col text-black text-3xl m-10  items-center gap-10 justify-center min-h-screen py-2">
        <h1>Welcome to the FAQ page!</h1>
        <p>
          This is the FAQ page. Here, you can find answers to frequently asked
          questions.
        </p>
        <div className="flex gap-4">
          <Link href="/admin">
            <Button className="">Admin Panel</Button>
          </Link>
          <Link href="/faq">
            <Button>FAQ</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
