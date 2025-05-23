export async function ClassifiedsCount({ count }: { count: number }) {
  return (
    <h2 className="text-sm md:text-base lg:text-lg font-bold min-w-fit text-muted-foreground">
      {count.toLocaleString()} cars in classifieds
    </h2>
  );
}
