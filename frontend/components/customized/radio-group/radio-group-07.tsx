import { cn } from '@/lib/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Dispatch, FC, SetStateAction } from 'react';

export type RadioOption = Record<'value' | 'label', string>;
export type RadioProps = {
  options: Array<RadioOption>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const Radio: FC<RadioProps & RadioGroup.RadioGroupProps> = ({
  options,
  value,
  setValue,
  className,
  ...props
}) => {
  return (
    <RadioGroup.Root
      defaultValue={options[0].value}
      value={value}
      onValueChange={(newValue) => setValue(newValue)}
      className={cn('max-w-sm grid grid-cols-2', props)}
      {...props}
    >
      {options.map((option, i) => (
        <RadioGroup.Item
          data-position={
            i === 0 ? 'start' : i === options.length - 1 ? 'end' : ''
          }
          key={option.value}
          value={option.value}
          className="transition-all border py-1 px-3 data-[state=checked]:bg-foreground data-[state=checked]:text-background data-[position=start]:rounded-l-md data-[position=end]:rounded-r-md"
        >
          <span className="font-semibold tracking-tight">{option.label}</span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};

export default Radio;
