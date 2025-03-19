/**
 * Type for the return value of the usePopover hook
 */
export interface UsePopoverReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Type for the parameters of the usePopover hook
 */
export type UsePopoverParams = boolean; 