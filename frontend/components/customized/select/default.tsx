import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { Dispatch, FC, SetStateAction } from 'react';

export type SelectOption = Record<'value' | 'label', string>;
export type SelectWrapperProps = {
  options: Array<SelectOption>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

const SelectWrapper: FC<SelectWrapperProps & SelectProps> = ({
  options,
  value,
  setValue,
  placeholder,
  ...props
}) => {
  return (
    <Select value={value} onValueChange={(value) => setValue(value)} {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, i) => {
            return (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectWrapper;
