import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container">
      <h1>Basic Skeleton</h1>
      <p>Primary commit starter with required routes and setup.</p>
      <p>
        <Link href="/catalog">Go to catalog</Link>
      </p>
    </section>
  );
}
