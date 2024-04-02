type AverageProps = {
  values: number[];
};

export const average = ({ values }: AverageProps) => {
  if (values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
};
