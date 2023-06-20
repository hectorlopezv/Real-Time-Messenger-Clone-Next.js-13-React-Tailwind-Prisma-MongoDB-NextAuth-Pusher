import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  type?: string;
  placeholder?: string;
  errors?: FieldErrors<FieldValues>;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
};

export default function MessageInput({
  id,
  register,
  disabled,
  errors,
  placeholder,
  required,
  type,
}: Props) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
            text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
      />
    </div>
  );
}
