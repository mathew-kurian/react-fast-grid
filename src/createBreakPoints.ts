export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type BreakpointValues = { [key in Breakpoint]: number };

type Callback = () => void;

export interface Breakpoints {
  keys: Breakpoint[];
  values: BreakpointValues;
  up: (key: Breakpoint) => string;
  down: (key: Breakpoint) => string;
  between: (start: Breakpoint, end: Breakpoint) => string;
  only: (key: Breakpoint) => string;
  width: (key: Breakpoint) => number;
}

export type BreakpointsOptions = {
  unit: string;
  step: number;
  values: BreakpointValues;
};

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(
  breakpoints: BreakpointsOptions
): Breakpoints {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm[.
    values,
    unit,
    step,
    ...other
  } = breakpoints;

  function up(key: Breakpoint): string {
    const value = typeof values[key] === "number" ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: Breakpoint): string {
    const endIndex = keys.indexOf(key) + 1;
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return up("xs");
    }

    const value: any =
      typeof upperbound === "number" && endIndex > 0 ? upperbound : key;

    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: Breakpoint, end: Breakpoint): string {
    const endIndex = keys.indexOf(end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    const lowerbound = values[start];
    const upperbound = values[keys[endIndex + 1]] - step / 100;

    return `@media (min-width:${lowerbound}${unit}) and (max-width:${upperbound}${unit})`;
  }

  function only(key: Breakpoint): string {
    return between(key, key);
  }

  function width(key: Breakpoint): number {
    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
    ...other,
  };
}
