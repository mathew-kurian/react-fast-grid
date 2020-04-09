export type SpacingArgument = number;

export interface Spacing {
  (): number;
  (value: SpacingArgument): number;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (
    top: SpacingArgument,
    rightLeft: SpacingArgument,
    bottom: SpacingArgument
  ): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument
  ): string;
}

export type SpacingOptions = number | ((factor: number) => string | number);

export default function createSpacing(
  spacingInput: SpacingOptions = 8
): Spacing {
  // All components align to an 8dp square baseline grid for mobile, tablet, and desktop.
  // https://material.io/design/layout/understanding-layout.html#pixel-density
  let transform: SpacingOptions;

  if (typeof spacingInput === "function") {
    transform = spacingInput;
  } else {
    if (typeof spacingInput !== "number") {
      console.error(
        [
          `The \`theme.spacing\` value (${spacingInput}) is invalid.`,
          "It should be a number or a function.",
        ].join("\n")
      );
    }
    transform = (factor) => {
      if (typeof factor !== "number") {
        console.error(
          `Expected spacing argument to be a number, got ${factor}`
        );
      }
      return spacingInput * factor;
    };
  }

  // @ts-ignore
  const spacing: Spacing = (...args: SpacingArgument[]) => {
    if (!(args.length <= 4)) {
      console.error(
        `Too many arguments provided, expected between 0 and 4, got ${args.length}`
      );
    }

    if (args.length === 0 && typeof transform === "function") {
      return transform(1);
    }

    if (args.length === 1 && typeof transform === "function") {
      return transform(args[0]);
    }

    return args
      .map((factor) => {
        const output =
          typeof transform === "function" ? transform(factor) : factor;
        return typeof output === "number" ? `${output}px` : output;
      })
      .join(" ");
  };

  return spacing;
}
