import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface CustomListBoxProps {
  options: {
    name: string;
    className?: string;
  }[];
}

export default function CustomListBox({ options }: CustomListBoxProps) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className="flex items-center justify-center w-full py-2.5 px-4 md:rounded-l-lg md:border-l-4 md:border-b-4 md:border-t-4 border-gray-700 font-bold focus:outline-none focus:ring-0focus:outline-none focus:ring-0">
          <span className={`${selected.className}`}>{selected.name}</span>
          <ChevronDownIcon
            className="pointer-events-none h-4 w-4 text-white/60 ml-2"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="mt-1 bg-gray-800 rounded-lg overflow-auto focus:outline-none focus:ring-0"
        >
          {options.map((option) => (
            <ListboxOption key={option.name} value={option}>
              {({ focus, selected }) => (
                <div
                  className={`${selected ? "bg-gray-700" : ""} ${
                    focus ? "bg-gray-600" : ""
                  } cursor-pointer`}
                >
                  <span
                    className={`${option.className} block px-4 py-2 font-bold`}
                  >
                    {option.name}
                  </span>
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      <input type="hidden" name="method" value={selected.name} />
    </div>
  );
}
