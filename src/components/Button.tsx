import React from 'react';
interface IButtonProps {
  action?: () => void;
  onClick?: () => void;
  className: string;
  ariaLabel: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & IButtonProps
> = ({ action, className, ariaLabel, children, ...props }) => {
  return (
    <button
      onMouseDown={action}
      className={`button ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
