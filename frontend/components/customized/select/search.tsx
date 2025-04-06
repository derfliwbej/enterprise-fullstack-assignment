import { CommandGroup, Command as CommandPrimitive } from 'cmdk';
import { Search as SearchIcon } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Command, CommandItem, CommandList } from '../../ui/command';

export type SearchOption = Record<'value' | 'label', string>;
export type SearchProps = {
  value: SearchOption;
  setValue: Dispatch<SetStateAction<SearchOption>>;
  options: Array<SearchOption>;
  placeholder: string;
};

const Search: FC<SearchProps> = ({ value, setValue, options, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <Command className="overflow-visible p-0 m-0">
        <div className="flex items-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring">
          <SearchIcon className="mr-2 w-4 h-4 shrink-0 opacity-50" />
          <CommandPrimitive.Input
            onValueChange={(search) => setInputValue(search)}
            value={inputValue}
            onBlur={() => {
              setOpen(false);
              setInputValue(value.label);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div
          data-open={open}
          className="relative data-[open=false]:hidden data-[open=true]:block"
        >
          <CommandList>
            <div
              data-open={open}
              className="absolute mt-1 top-0 z-10 w-full rounded-md bg-popover text-popover-foreground shadow-md outline-none"
            >
              <CommandGroup className="h-full overflow-auto">
                {options?.map((option) => {
                  return (
                    <CommandItem
                      onMouseDown={() => {
                        setValue(option);
                      }}
                      className="hover:cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          </CommandList>
        </div>
      </Command>
    </div>
  );
};

export default Search;
