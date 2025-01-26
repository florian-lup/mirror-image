export interface PopoverProps {
  children?: React.ReactNode;
  content: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
} 