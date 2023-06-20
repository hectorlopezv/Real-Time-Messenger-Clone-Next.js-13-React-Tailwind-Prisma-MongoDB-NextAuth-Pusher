import { generateRandomColor } from "@/app/libs/generateRandomColor";
import { useEffect } from "react";
import ReactSelect from "react-select";
type Props = {
  disabled: boolean;
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: Record<string, any>) => void;
  value: Record<string, any>;
};

export default function Select({
  disabled,
  label,
  onChange,
  options,
  value,
}: Props) {

  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          isMulti
          options={options}
          onChange={onChange}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
}
