const variants = {
  primary: 'bg-brand-orange text-white shadow-[0_10px_24px_rgba(255,106,0,.24)] active:scale-[0.98]',
  secondary: 'border border-white/12 bg-white/[0.08] text-white active:scale-[0.98] hover:border-brand-orange/40 hover:bg-brand-orange/10',
  ghost: 'text-white/80 hover:text-white hover:bg-white/[0.08] active:scale-[0.98]',
};

export default function Button({ children, className = '', variant = 'primary', as = 'button', disabled = false, ...props }) {
  const Component = as;
  const buttonProps = Component === 'button' ? { disabled } : {};
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold tracking-tight transition duration-200 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${className}`}
      {...buttonProps}
      {...props}
    >
      {children}
    </Component>
  );
}
