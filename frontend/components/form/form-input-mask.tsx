import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { CleaveOptions } from "cleave.js/options";
import Cleave from "cleave.js/react";
import get from "lodash.get";
import React, { InputHTMLAttributes } from "react";
import { DeepMap, FieldError, Path } from "react-hook-form";
import { FormErrorMessage } from "../form";

export type FormInputMaskProps<TFormValues> = {
  inputRef?: any;
  name: Path<TFormValues>;
  className?: string;
  options: CleaveOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  onChange?: (arg: any) => any;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInputMask = <TFormValues extends Record<string, unknown>>({
  name,
  inputRef,
  options,
  errors,
  className,
  onChange,
  ...props
}: FormInputMaskProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <Cleave
        aria-invalid={hasError}
        options={options}
        className={classNames([
          "relative inline-flex p-3 text-base w-full rounded-md leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30",
          className,
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
            : "",
        ])}
        onChange={onChange}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
