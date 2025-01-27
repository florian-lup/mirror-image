import Link from 'next/link';
import { ComponentProps } from 'react';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  isIconButton?: boolean;
};

type ButtonProps = BaseProps & Omit<ComponentProps<'button'>, 'className'>;
type LinkProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type NavButtonProps = ButtonProps | LinkProps;

const baseStyles = "bg-neutral-800/40 relative overflow-hidden transition-colors duration-200 hover:bg-neutral-700/40 border border-neutral-700/50 flex items-center justify-center";

export const NavButton = ({ children, className = '', isIconButton, ...props }: NavButtonProps) => {
  const combinedClassName = `${baseStyles} ${isIconButton ? 'w-10 h-10 rounded-full' : 'h-9 px-4 rounded-full'} ${className}`;
  const content = isIconButton ? children : (
    <span className="text-sm font-medium text-neutral-400 relative z-10">{children}</span>
  );

  if ('href' in props) {
    return (
      <Link 
        className={combinedClassName}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={combinedClassName}
      {...props}
    >
      {content}
    </button>
  );
}; 