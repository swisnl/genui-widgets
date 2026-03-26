export type ClassInput =
  | string
  | null
  | undefined
  | false
  | Record<string, unknown>
  | ClassInput[];

export function cx(...inputs: ClassInput[]): string[] {
  const classes: string[] = [];

  const push = (input: ClassInput): void => {
    if (!input) {
      return;
    }

    if (typeof input === 'string') {
      classes.push(input);
      return;
    }

    if (Array.isArray(input)) {
      for (const value of input) {
        push(value);
      }
      return;
    }

    for (const [className, active] of Object.entries(input)) {
      if (active) {
        classes.push(className);
      }
    }
  };

  for (const input of inputs) {
    push(input);
  }

  return classes;
}

export function blockVariant(
  block: string,
  variant: string,
  value: string | number | null | undefined,
): string | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  return `${block}--${variant}-${value}`;
}

export function blockModifier(
  block: string,
  modifier: string | number | null | undefined,
): string | undefined {
  if (modifier === null || modifier === undefined || modifier === '') {
    return undefined;
  }

  return `${block}--${modifier}`;
}
