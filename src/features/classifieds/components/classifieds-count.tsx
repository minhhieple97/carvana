import { getCount } from '../server/db/classifieds';

export async function ClassifiedsCount() {
  const count = await getCount();

  return (
    <h2 className="text-sm md:text-base lg:text-lg font-bold min-w-fit text-gray-500">
      {count.toLocaleString()} cars in classifieds
    </h2>
  );
}
