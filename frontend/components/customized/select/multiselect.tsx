'use client';

import { X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useMemo } from 'react';

export type Option = Record<'value' | 'label', string>;

export type MultiSelectProps = {
  options: Option[];
  selected: Option[];
  setSelected: React.Dispatch<React.SetStateAction<Option[]>>;
  placeholder: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  setSelected,
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = useCallback((option: Option) => {
    setSelected((prev) => prev.filter((s) => s.value !== option.value));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && selected.length > 0) {
        setSelected((prev) => prev.slice(0, -1));
      }
    },
    [selected]
  );

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          !selected.some(
            (selectedOption) => selectedOption.value === option.value
          )
      ),
    [selected]
  );

  return (
    <div className="w-full">
      <Command className="overflow-visible p-0 m-0">
        <div className="rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring">
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => {
              return (
                <Badge
                  key={option.value}
                  variant="secondary"
                  className="select-none"
                >
                  {option.label}
                  <X
                    className="size-3 text-muted-foreground hover:text-foreground ml-2 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      handleUnselect(option);
                    }}
                  />
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              onKeyDown={handleKeyDown}
              onValueChange={setInputValue}
              value={inputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative">
          <CommandList>
            {open && !!filteredOptions.length && (
              <div className="absolute mt-1 top-0 z-10 w-full rounded-md bg-popover text-popover-foreground shadow-md outline-none">
                <CommandGroup className="h-full overflow-auto">
                  {filteredOptions.map((option) => {
                    return (
                      <CommandItem
                        key={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onSelect={() => {
                          setInputValue('');
                          setSelected((prev) => [...prev, option]);
                        }}
                        className={'cursor-pointer'}
                      >
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </div>
      </Command>
    </div>
  );
};

export default MultiSelect;
