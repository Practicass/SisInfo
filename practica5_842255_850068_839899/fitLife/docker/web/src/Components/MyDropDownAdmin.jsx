import {extendVariants} from "@nextui-org/react";
import IconDropdownAdmin from "./IconDropdownAdmin";

export const MyDropDown = extendVariants(IconDropdownAdmin, {
  variants: {
    // <- modify/add variants
    color: {
      grey:  "text-[#000] bg-[#404040]",
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small",
      xl: "px-unit-4 min-w-unit-28 h-unit- text-large gap-unit-4 rounded-medium",
    },
  },
  defaultVariants: { // <- modify/add default variants
    color: "grey",
    size: "xl",
  },
  compoundVariants: [ // <- modify/add compound variants
    {
      isDisabled: true,
      color: "olive",
      class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});