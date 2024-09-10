export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

export const truncateTitle = (str: string) => str.substring(0, 30) + "...";
