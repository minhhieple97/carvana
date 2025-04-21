import { DragOverlay, type DropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core';

import type { PropsWithChildren } from 'react';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export const SortableOverlay = ({ children }: PropsWithChildren) => (
  <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
);
