export const Button = ({ className, children, ...props }) => (
  <button className={`rounded bg-blue-600 px-4 py-2 font-semibold ${className}`} {...props}>
    {children}
  </button>
);