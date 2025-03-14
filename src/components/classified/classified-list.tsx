import ClassifiedCard from './classified-card';
import { ClassifiedsListProps } from './types';

export default function ClassifiedsList({ classifieds }: ClassifiedsListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {classifieds.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} />
      ))}
    </div>
  );
}
