export const breakpoints = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (styles) => `
    @media (max-width: ${breakpoints[label]}px) {
      ${styles}
    }
  `;
  return acc;
}, {});
