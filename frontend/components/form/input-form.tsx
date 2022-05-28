type Props = {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
};

export function InputForm({ ...props }: Props) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        placeholder={props.placeholder}
      />
    </div>
  );
}
