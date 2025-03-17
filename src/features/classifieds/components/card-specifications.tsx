import type { CardSpecificationsProps } from '../types';

export const CardSpecifications = ({ specifications }: CardSpecificationsProps) => (
  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
    {specifications
      .filter((v) => v.value)
      .map(({ id, icon, value }) => (
        <div key={id} className="flex items-center gap-2 font-medium">
          <span className="text-primary">{icon}</span>
          <span>{value}</span>
        </div>
      ))}
  </div>
);
