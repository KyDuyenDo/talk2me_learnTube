import type { Theme } from "./theme"

export class StyleManager {
  private currentTheme: Theme
  private styleElement: HTMLStyleElement | null = null

  constructor(theme: Theme) {
    this.currentTheme = theme
    this.initializeStyles()
  }

  private initializeStyles() {
    // Create or update CSS custom properties
    this.styleElement = document.createElement("style")
    this.styleElement.id = "dynamic-theme-styles"
    document.head.appendChild(this.styleElement)
    this.updateCSSVariables()
  }

  private updateCSSVariables() {
    if (!this.styleElement) return

    const cssVariables = `
      :root {
        /* Colors */
        --color-primary: ${this.currentTheme.colors.primary};
        --color-secondary: ${this.currentTheme.colors.secondary};
        --color-background: ${this.currentTheme.colors.background};
        --color-surface: ${this.currentTheme.colors.surface};
        --color-text-primary: ${this.currentTheme.colors.text.primary};
        --color-text-secondary: ${this.currentTheme.colors.text.secondary};
        --color-text-muted: ${this.currentTheme.colors.text.muted};
        --color-border: ${this.currentTheme.colors.border};
        --color-accent: ${this.currentTheme.colors.accent};
        --color-success: ${this.currentTheme.colors.success};
        --color-warning: ${this.currentTheme.colors.warning};
        --color-error: ${this.currentTheme.colors.error};

        /* Typography */
        --font-family-primary: ${this.currentTheme.typography.fontFamily.primary};
        --font-family-secondary: ${this.currentTheme.typography.fontFamily.secondary};
        --font-size-xs: ${this.currentTheme.typography.fontSize.xs};
        --font-size-sm: ${this.currentTheme.typography.fontSize.sm};
        --font-size-base: ${this.currentTheme.typography.fontSize.base};
        --font-size-lg: ${this.currentTheme.typography.fontSize.lg};
        --font-size-xl: ${this.currentTheme.typography.fontSize.xl};
        --font-size-2xl: ${this.currentTheme.typography.fontSize["2xl"]};
        --font-size-3xl: ${this.currentTheme.typography.fontSize["3xl"]};
        --font-size-4xl: ${this.currentTheme.typography.fontSize["4xl"]};

        /* Spacing */
        --spacing-xs: ${this.currentTheme.spacing.xs};
        --spacing-sm: ${this.currentTheme.spacing.sm};
        --spacing-md: ${this.currentTheme.spacing.md};
        --spacing-lg: ${this.currentTheme.spacing.lg};
        --spacing-xl: ${this.currentTheme.spacing.xl};
        --spacing-2xl: ${this.currentTheme.spacing["2xl"]};
        --spacing-3xl: ${this.currentTheme.spacing["3xl"]};

        /* Border */
        --border-radius-sm: ${this.currentTheme.borderRadius.sm};
        --border-radius-md: ${this.currentTheme.borderRadius.md};
        --border-radius-lg: ${this.currentTheme.borderRadius.lg};
        --border-radius-xl: ${this.currentTheme.borderRadius.xl};
        --border-radius-full: ${this.currentTheme.borderRadius.full};
        --border-width-thin: ${this.currentTheme.borderWidth.thin};
        --border-width-normal: ${this.currentTheme.borderWidth.normal};
        --border-width-thick: ${this.currentTheme.borderWidth.thick};

        /* Shadows */
        --shadow-sm: ${this.currentTheme.shadows.sm};
        --shadow-md: ${this.currentTheme.shadows.md};
        --shadow-lg: ${this.currentTheme.shadows.lg};
        --shadow-xl: ${this.currentTheme.shadows.xl};
      }
    `

    this.styleElement.textContent = cssVariables
  }

  switchTheme(newTheme: Theme) {
    this.currentTheme = newTheme
    this.updateCSSVariables()
  }

  getCurrentTheme(): Theme {
    return this.currentTheme
  }

  // Utility methods for getting theme values
  getColor(colorPath: string): string {
    const paths = colorPath.split(".")
    let value: any = this.currentTheme.colors

    for (const path of paths) {
      value = value[path]
      if (value === undefined) return ""
    }

    return value
  }

  getSpacing(size: keyof Theme["spacing"]): string {
    return this.currentTheme.spacing[size]
  }

  getFontSize(size: keyof Theme["typography"]["fontSize"]): string {
    return this.currentTheme.typography.fontSize[size]
  }
}

// CSS class generators
export const createButtonClasses = (variant: "primary" | "secondary" | "outline" = "primary") => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90 focus:ring-[var(--color-primary)]",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--border-width-normal)] border-[var(--color-border)] hover:bg-[var(--color-border)] focus:ring-[var(--color-primary)]",
    outline:
      "border-[var(--border-width-normal)] border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]",
  }

  return `${baseClasses} ${variantClasses[variant]}`
}

export const createCardClasses = () => {
  return "bg-[var(--color-background)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-lg shadow-[var(--shadow-sm)] p-[var(--spacing-lg)]"
}

export const createInputClasses = () => {
  return "w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
}
