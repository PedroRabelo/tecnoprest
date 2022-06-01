import Link from "next/link";
import { useRouter } from "next/router";
import { SVGProps } from "react";

type Props = {
  key: string;
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function LinkMenu({ ...props }: Props) {
  const router = useRouter();
  const { pathname } = router;
  const selected = pathname === props.href;

  return (
    <Link key={props.name} href={props.href}>
      <a
        className={classNames(
          selected
            ? "bg-indigo-800 text-white"
            : "text-indigo-100 hover:bg-indigo-600",
          "group flex propss-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <props.icon
          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
          aria-hidden="true"
        />
        {props.name}
      </a>
    </Link>
  );
}
