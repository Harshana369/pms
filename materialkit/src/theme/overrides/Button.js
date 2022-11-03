// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          border: `3px solid ${theme.palette.grey[500_32]}`,
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        },
        containedPrimary: {
          border: `3px solid ${theme.palette.grey[500_32]}`,
          boxShadow: theme.customShadows.primary
        },
        containedWarning: {
          border: `4px solid ${theme.palette.grey[990]}`,
          backgroundColor: '#000f1f',
          '&:hover': {
            backgroundColor: 'none'
          }
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary
        },
        outlinedInherit: {
          border: `4px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.customShadows.secondary
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
