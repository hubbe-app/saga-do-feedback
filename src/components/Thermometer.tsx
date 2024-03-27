type ProgressBarProps = {
  value: number;
  type: 'engagement' | 'adrenaline';
};

export const Thermometer = ({ value, type }: ProgressBarProps) => {
  const clampedValue = Math.max(0, Math.min(value, 10));

  const width = `${(clampedValue / 10) * 100}%`;

  return (
    <div className='flex justify-start gap-2 w-full h-4 bg-gray-400 bg-opacity-70 border-2 rounded-full'>
      <div
        style={{ width }}
        className={`h-full ${type === 'adrenaline' ? 'bg-red-600' : 'bg-blue-600'} rounded-full`}
      />
    </div>
  );
};
