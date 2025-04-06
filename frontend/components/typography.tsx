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

const H4 = forwardRef<HTMLHeadingElement, ComponentProps<'h4'>>(function H4(
  { className, children, ...props },
  ref
) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </h4>
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

export default { H3, H4, Muted };
