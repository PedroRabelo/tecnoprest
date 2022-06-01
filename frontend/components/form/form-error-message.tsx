import React, { FC, ReactNode } from "react";
import classNames from "classnames";

export type FormErrorMessageProps = {
  children: ReactNode;
  className?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p className={classNames("text-sm text-left block text-red-600", className)}>
    {children}
  </p>
);
