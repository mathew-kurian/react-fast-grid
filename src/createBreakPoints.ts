export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointValues = { [key in Breakpoint | number]: number };

export interface Breakpoints {
  keys: (Breakpoint | number)[];
  values: BreakpointValues;
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  only: (key: Breakpoint) => string;
  width: (key: Breakpoint) => number;
}

export type BreakpointsOptions = Partial<
  {
    unit: string;
    step: number;
  } & Breakpoints
>;

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys: (Breakpoint | number)[] = ["xs", "sm", "md", "lg", "xl"];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints: BreakpointsOptions): Breakpoints {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm[.
    values = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit = "px",
    step = 5,
    ...other
  } = breakpoints;

  function up(key: Breakpoint | number) : string {
    const value = typeof values[key] === "number" ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: Breakpoint | number) : string {
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

  function between(start: Breakpoint | number, end: Breakpoint | number) : string {
    const endIndex = keys.indexOf(end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    return (
      `@media (min-width:${
      typeof values[start] === "number" ? values[start] : start
      }${unit}) and ` +
       // @ts-ignore
      `(max-width:${(endIndex !== -1 &&
        typeof values[keys[endIndex + 1]] === "number"
        ? values[keys[endIndex + 1]]
        : end) -
      step / 100}${unit})`
    );
  }

  function only(key : Breakpoint) : string {
    return between(key, key);
  }

  function width(key : Breakpoint) : number {
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
    ...other
  };
}
