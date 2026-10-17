type Listener = () => void;

let isCtaVisible = false;
const listeners = new Set<Listener>();

export const floatingCtaStore = {
  getSnapshot: (): boolean => isCtaVisible,
  getServerSnapshot: (): boolean => false,
  setVisible: (visible: boolean): void => {
    if (isCtaVisible !== visible) {
      isCtaVisible = visible;
      listeners.forEach((listener) => listener());
    }
  },
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
