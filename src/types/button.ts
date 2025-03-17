import { ComponentProps } from 'react';

export type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<'button'>, 'className'>;

export type BaseLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
}; 