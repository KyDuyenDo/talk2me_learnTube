export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: {
      primary: string
      secondary: string
      muted: string
    }
    border: string
    accent: string
    success: string
    warning: string
    error: string
  }
  typography: {
    fontFamily: {
      primary: string
      secondary: string
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      "2xl": string
      "3xl": string
      "4xl": string
    }
    fontWeight: {
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
    }
    lineHeight: {
      tight: number
      normal: number
      relaxed: number
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    "2xl": string
    "3xl": string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  borderWidth: {
    thin: string
    normal: string
    thick: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export const lightTheme: Theme = {
  colors: {
    primary: "#3B82F6", // Light blue
    secondary: "#64748B", // Gray-blue
    background: "#FFFFFF",
    surface: "#F8FAFC", // Very light gray
    text: {
      primary: "#1B1F2E", // Custom dark text color as requested
      secondary: "#64748B",
      muted: "#94A3B8",
    },
    border: "#E2E8F0", // Light gray border
    accent: "#60A5FA", // Lighter blue accent
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      secondary: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  borderWidth: {
    thin: "1px",
    normal: "2px", // As requested
    thick: "3px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
}

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: "#60A5FA",
    secondary: "#94A3B8",
    background: "#0F172A",
    surface: "#1E293B",
    text: {
      primary: "#F1F5F9",
      secondary: "#CBD5E1",
      muted: "#64748B",
    },
    border: "#334155",
    accent: "#3B82F6",
  },
}
