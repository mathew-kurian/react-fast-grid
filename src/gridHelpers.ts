import createSpacing from "./createSpacing";
import createBreakPoints from "./createBreakPoints";

const breakpoints = createBreakPoints({});
const spacingFunction = createSpacing(8);

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export { breakpoints };

export function generateGrid(globalStyles: any, breakpoint: any) {
  const styles: any = {};

  GRID_SIZES.forEach(size => {
    const key = `grid-${breakpoint}-${size}`;

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
    } else if (size === "auto") {
      styles[key] = {
        flexBasis: "auto",
        flexGrow: 0,
        maxWidth: "none"
      };
    } else if (typeof size === "number") {
      // Keep 7 significant numbers.
      const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;

      // Close to the bootstrap implementation:
      // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
      styles[key] = {
        flexBasis: width,
        flexGrow: 0,
        maxWidth: width
      };
    }
  });

  // No need for a media query for the first size.
  if (breakpoint === "xs") {
    Object.assign(globalStyles, styles);
  } else {
    globalStyles[breakpoints.up(breakpoint)] = styles;
  }
}

export function getOffset(val: any, div = 1) {
  const parse = parseFloat(val);
  return `${parse / div}${String(val).replace(String(parse), "") || "px"}`;
}

export function generateGutter(breakpoint: any) {
  const styles: any = {};

  SPACINGS.forEach(spacing => {
    const themeSpacing = spacingFunction(spacing);

    if (themeSpacing === 0) {
      return;
    }

    styles[`spacing-${breakpoint}-${spacing}`] = {
      margin: `-${getOffset(themeSpacing, 2)}`,
      width: `calc(100% + ${getOffset(themeSpacing)})`,
      "& > $item": {
        padding: getOffset(themeSpacing, 2)
      }
    };
  });

  return styles;
}
