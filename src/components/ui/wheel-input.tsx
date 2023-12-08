import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const RADIUS = 60;
const ITEM_HEIGHT = 48;
const ANGLE_BY_ITEM = 45;
const ANGLE_FACTOR = 45;
const DISPLACEMENT_FACTOR = 1.2;

interface WheelInputContextContent {
  delta: number;
  onTouchStart: (e: React.TouchEvent<HTMLUListElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLUListElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLUListElement>) => void;
  registerItem: (index: number, value: string | number) => void;
}

const WheelInputContext = createContext<WheelInputContextContent | null>(null);

export interface WheelInputProps<TValue extends string | number = string | number> {
  children?: React.ReactNode;
  value?: number;
  onChange?: (value: TValue) => void;
}

export function WheelInput<TValue extends string | number = string | number>({
  children,
  value,
  onChange,
}: WheelInputProps<TValue>) {
  const [delta, setDelta] = useState(0);
  const [itemValues, setItemValues] = useState<(string | number)[]>([]);

  const startDelta = useRef<number | null>(null);
  const startClientY = useRef<number | null>(null);

  useEffect(() => {
    if (value === undefined) return;
    const index = itemValues.indexOf(value);
    if (index === -1) return;
    setDelta(-index * ITEM_HEIGHT);
  }, [value, itemValues]);

  const handleRegisterItem = (index: number, value: string | number) => {
    setItemValues((itemValues) => {
      const newItemValues = [...itemValues];
      newItemValues[index] = value;
      return newItemValues;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    startDelta.current = delta;
    startClientY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    if (startDelta.current === null || startClientY.current === null) return;
    const delta =
      startDelta.current + (startClientY.current - e.touches[0].clientY) * DISPLACEMENT_FACTOR;
    setDelta(delta);
  };

  const handleTouchEnd = () => {
    startDelta.current = null;
    startClientY.current = null;
    const newIndex = -Math.round(delta / ITEM_HEIGHT);
    setDelta(-newIndex * ITEM_HEIGHT);
    const newValue = itemValues[newIndex];
    onChange?.(newValue as TValue);
  };

  return (
    <WheelInputContext.Provider
      value={{
        delta,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        registerItem: handleRegisterItem,
      }}
    >
      {children}
    </WheelInputContext.Provider>
  );
}

const useWheelInput = () => {
  const context = useContext(WheelInputContext);
  if (!context) {
    throw new Error('useWheelInput must be used within a WheelInput');
  }
  return context;
};

export interface WheelInputContentProps extends React.ComponentPropsWithoutRef<'ul'> {}

export function WheelInputContent({ className, children, ...props }: WheelInputContentProps) {
  const { onTouchStart, onTouchMove, onTouchEnd } = useWheelInput();
  return (
    <ul
      {...props}
      className={cn(
        'relative h-32 w-full overflow-hidden border first-of-type:rounded-l-xl last-of-type:rounded-r-xl',
        className,
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </ul>
  );
}

export interface WheelInputItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: number | string;
}

export function WheelInputItem({ value, className, children, ...props }: WheelInputItemProps) {
  const { delta, registerItem } = useWheelInput();

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const index = useMemo(() => {
    if (ref === null) return null;
    const parent = ref.parentElement;
    if (parent === null) return null;
    const siblings = parent?.parentElement?.children;
    if (siblings === undefined) return null;
    return Array.from(siblings).indexOf(parent);
  }, [ref]);

  useEffect(() => {
    if (index === null) return;
    registerItem(index, value);
  }, [index, value]);

  useEffect(() => {
    if (ref === null || index === null) return;
    const relativeDelta = delta / ITEM_HEIGHT;
    const angle = clamp(-90, relativeDelta * ANGLE_FACTOR + index * ANGLE_BY_ITEM, 90);
    ref.style.setProperty('transform', `rotateX(${angle}deg) translate3d(0px, 0px, ${RADIUS}px)`);
  }, [ref, index, delta]);

  return (
    <li className="absolute left-0 top-1/2 w-full -translate-y-1/2" style={{ height: ITEM_HEIGHT }}>
      <div
        className={cn(
          'absolute left-0 top-0 flex w-full items-center justify-center transition-transform duration-75 [transform-style:_preserve-3d;]',
          className,
        )}
        {...props}
        style={{ height: ITEM_HEIGHT }}
        ref={setRef}
      >
        {children || value}
      </div>
    </li>
  );
}

function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
