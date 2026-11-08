import * as React from "react";

export interface UseFaqAccordionOptions {
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  itemIds?: string[];
}

export interface UseFaqAccordionReturn {
  openIds: Set<string>;
  isOpen: (id: string) => boolean;
  toggleItem: (id: string) => void;
  openAll: () => void;
  closeAll: () => void;
}

/**
 * useFaqAccordion Custom Hook
 * Mengelola state ekspansi accordion secara terisolasi dari rendering visual
 * sesuai Single Responsibility Principle.
 */
export function useFaqAccordion({
  allowMultiple = false,
  defaultOpenIndexes = [],
  itemIds = [],
}: UseFaqAccordionOptions = {}): UseFaqAccordionReturn {
  const [openIds, setOpenIds] = React.useState<Set<string>>(() => {
    const initial = new Set<string>();
    defaultOpenIndexes.forEach((idx) => {
      if (itemIds[idx]) {
        initial.add(itemIds[idx]);
      }
    });
    return initial;
  });

  const isOpen = React.useCallback(
    (id: string) => openIds.has(id),
    [openIds]
  );

  const toggleItem = React.useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const openAll = React.useCallback(() => {
    if (allowMultiple) {
      setOpenIds(new Set(itemIds));
    }
  }, [allowMultiple, itemIds]);

  const closeAll = React.useCallback(() => {
    setOpenIds(new Set());
  }, []);

  return {
    openIds,
    isOpen,
    toggleItem,
    openAll,
    closeAll,
  };
}
