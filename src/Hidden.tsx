import * as React from "react";
import { Breakpoint, keys } from "./createBreakPoints";
import { breakpoints } from "./gridHelpers";
import debounce from "./debounce";

interface HiddenState {
  visible: boolean;
}

const reflect = (willHide: boolean) => willHide;

export interface HiddenProps {
  xsUp?: boolean;
  xsDown?: boolean;
  smUp?: boolean;
  smDown?: boolean;
  mdUp?: boolean;
  mdDown?: boolean;
  lgUp?: boolean;
  lgDown?: boolean;
  xlUp?: boolean;
  xlDown?: boolean;
  predicate?: (willHide: boolean) => boolean;
  only?: Breakpoint | Breakpoint[];
  debounce?: number;
  children?: any;
}

const upFrom = (breakpoint: Breakpoint): Breakpoint[] => {
  return keys.slice(keys.indexOf(breakpoint) + 1);
};

const downFrom = (breakpoint: Breakpoint): Breakpoint[] => {
  return keys.slice(0, keys.indexOf(breakpoint));
};

type VisibilityMap = {
  [key in keyof Required<
    Omit<HiddenProps, "children" | "only" | "debounce" | "predicate">
  >]: Breakpoint[];
};

export const VisibilityMap: VisibilityMap = {
  xsUp: downFrom("xs"),
  xsDown: upFrom("xs"),
  smUp: downFrom("sm"),
  smDown: upFrom("sm"),
  mdUp: downFrom("md"),
  mdDown: upFrom("md"),
  lgUp: downFrom("lg"),
  lgDown: upFrom("lg"),
  xlUp: downFrom("xl"),
  xlDown: upFrom("xl"),
};

export default class Hidden extends React.Component<HiddenProps, HiddenState> {
  private static keysDsc = [...keys].reverse();
  private static init_: boolean = false;
  private static listeners_: (() => void)[] = [];

  private static init() {
    if (Hidden.init_) {
      return;
    }

    Hidden.init_ = true;

    if (typeof window.matchMedia === "function") {
      for (const [i, key] of keys.entries()) {
        const start = key;
        const end = keys[i + 1];

        const media = window.matchMedia(
          breakpoints.between(start, end).replace("@media", "").trim()
        );

        media.addListener(() => {
          if (process.env.NODE_ENV !== "production") {
            console.log("Fired listener for media items");
          }

          for (const listener of Hidden.listeners_) {
            listener();
          }
        });
      }
    } else {
      window.addEventListener(
        "resize",
        () => {
          for (const listener of Hidden.listeners_) {
            listener();
          }
        },
        false
      );
    }
  }

  private _onResizeDebounced: () => void;

  constructor(props: HiddenProps) {
    super(props);

    Hidden.init();

    const width = window.innerWidth;
    const breakPoint = this._getBreakPoint(width);

    this.state = {
      visible: this._isVisible(breakPoint),
    };

    const { debounce = 5 } = props;

    this._onResizeDebounced = this._getSafeDebounceResize(
      this._onResize,
      debounce
    );

    if (process.env.NODE_ENV !== "production") {
      const { predicate, ...otherProps } = props;

      if (Object.keys(otherProps).length > 1) {
        console.warn(
          "[Hidden] is recommended to have only 1 prop except for `predicate` which can be in conjunction with another prop"
        );
      }
    }
  }

  private _getSafeDebounceResize<T extends Function>(
    callback: T,
    timeout: number | undefined
  ): T {
    return typeof timeout === "number" && timeout > 0
      ? debounce(callback, timeout)
      : callback;
  }

  // support React 15+
  shouldComponentUpdate(nextProps: HiddenProps) {
    const { debounce = 5 } = nextProps;

    if (this.props.debounce !== debounce) {
      this._onResizeDebounced = this._getSafeDebounceResize(
        this._onResize,
        debounce
      );
    }

    return true;
  }

  componentDidMount() {
    Hidden.listeners_.push(this._onResizeInvoker);
  }

  componentWillUnmount() {
    Hidden.listeners_ = Hidden.listeners_.filter(
      (listener) => listener !== this._onResizeInvoker
    );
  }

  private _getBreakPoint = (width: number): Breakpoint => {
    const breakPointValues = breakpoints.values;

    for (const key of Hidden.keysDsc) {
      if (width >= breakPointValues[key]) {
        return key;
      }
    }

    return "xl";
  };

  private _getTrueKeyInProps = (): keyof VisibilityMap | null => {
    const props = this.props;

    for (const key in VisibilityMap) {
      // @ts-ignore
      if (props[key] === true) {
        return key as keyof VisibilityMap;
      }
    }

    return null;
  };

  private _isVisible = (breakPoint: Breakpoint): boolean => {
    const { only, predicate = reflect } = this.props;

    let isVisible = true;

    if (Array.isArray(only)) {
      isVisible = !only.includes(breakPoint);
    } else if (typeof only === "string") {
      isVisible = only !== breakPoint;
    } else {
      const trueKey = this._getTrueKeyInProps();

      if (trueKey !== null) {
        isVisible = VisibilityMap[trueKey].includes(breakPoint);
      }
    }

    return !predicate(!isVisible);
  };

  private _lastBreakPoint: Breakpoint | null = null;
  private _onResize = () => {
    const width = window.innerWidth;
    const breakPoint = this._getBreakPoint(width);

    if (this._lastBreakPoint === breakPoint) {
      return;
    }

    const lastVisible = this.state.visible;
    const nextVisible = this._isVisible(breakPoint);

    if (lastVisible !== nextVisible) {
      this.setState({ visible: nextVisible });
    }

    this._lastBreakPoint = breakPoint;
  };

  private _onResizeInvoker = () => this._onResizeDebounced();

  render(): any | null {
    if (this.state.visible) {
      const { children } = this.props;

      if (children !== undefined) {
        return children;
      }
    }

    return null;
  }
}
