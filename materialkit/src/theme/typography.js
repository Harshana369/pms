// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
}

const FONT_PRIMARY = 'Public Sans, sans-serif';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    color: '#c2c2c2',
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
  },
  h6: {
    color: '#c2c2c2',
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  h7: {
    color: '#000000',
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  h8: {
    color: '#ffffff', // ------------------------ red colour for test data forms errors -----------------------
    fontWeight: 200,
    lineHeight: 28 / 18,
    fontSize: pxToRem(15)
  },
  h61: {
    color: '#c2c2c2',
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  h9: {
    color: '#c2c2c2',
    fontWeight: 500,
    lineHeight: 20 / 15,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  subtitle2: {
    color: '#c2c2c2', // ---------------- used for Data base tables
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  subtitle9: {
    color: '#c2c2c2', // ---------------- used for Data base Forms
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  subtitle8: {
    color: '#c2c2c2', // ---------------- used for Mobitel Data base insight Daily on Air Sites Chart
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(12)
  },
  subtitle7: {
    color: '#c2c2c2', // ---------------- used for Data base tables
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(13)
  },
  subtitle6: {
    color: '#a8a8a8', // ---------------- used for Data base tables
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(13)
  },
  subtitle5: {
    color: '#a8a8a8', // ---------------- used for Data base tables
    fontWeight: 10,
    lineHeight: 22 / 14,
    fontSize: pxToRem(13)
  },
  subtitle3: {
    color: '#c2c2c2',
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  subtitle4: {
    color: '#000000',
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  body1: {
    color: '#c2c2c2',
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  bodyblack: {
    color: '#000000',
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  body3: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    color: '#000000'
  },
  caption: {
    color: '#c2c2c2',
    lineHeight: 1.5,
    fontSize: pxToRem(12)
  },
  caption1: {
    color: '#038cfc',
    lineHeight: 1.5,
    fontSize: pxToRem(15)
  },
  overline: {
    color: '#c2c2c2',
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  }
};

export default typography;
