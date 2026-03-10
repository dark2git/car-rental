type Props = {
  params: Promise<{ id: string }>;
};

export default async function CatalogItemPage({ params }: Props) {
  const { id } = await params;

  return (
    <section className="container">
      <h1>Vehicle Details</h1>
      <p>ID: {id}</p>
    </section>
  );
}
