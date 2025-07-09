export const Card = ({ children, className }) => (
  <div className={`rounded-lg border shadow-sm ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);