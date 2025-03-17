/**
 * Type for the return value of the usePopover hook
 */
export interface UsePopoverReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} 