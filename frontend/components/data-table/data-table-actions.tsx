import Link from "next/link";
import { SVGProps } from "react";

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  href: string;
  color: "primary" | "danger";
  title: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function DataTableActions({ Icon, href, color, title }: Props) {
  return (
    <Link href={href}>
      <a
        className={classNames(
          color === "primary"
            ? "text-indigo-600 hover:text-indigo-900"
            : "text-red-600 hover:text-red-900",
          "flex flex-col items-center"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="text-xs">{title}</span>
      </a>
    </Link>
  );
}
