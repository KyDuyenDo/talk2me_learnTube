const Button = ({
    children,
    onClick,
    variant = "default",
    size = "default",
    className = "",
}: {
    children: React.ReactNode
    onClick?: () => void
    variant?: "default" | "outline"
    size?: "default" | "sm"
    className?: string
}) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    const variantClasses =
        variant === "outline"
            ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
    const sizeClasses = size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 py-2"

    return (
        <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;