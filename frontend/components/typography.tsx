import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';

const H3 = forwardRef<HTMLHeadingElement, ComponentProps<'h3'>>(function H3(
  { className, children, ...props },
  ref
) {
  return (
    <h1
      className={cn('scroll-m-20 text-2xl tracking-tight font-bold', className)}
      ref={ref}
      {...props}
    >
      {children}
    </h1>
  );
});

const Muted = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  function Muted({ className, children, ...props }, ref) {
    return (
      <p
        className={cn('text-sm text-muted-foreground', className)}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

export default { H3, Muted };
