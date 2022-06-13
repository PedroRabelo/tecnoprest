import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Button } from "../button";

type Props = {
  title: string;
  link: string;
};

export function DataTableHeader({ title, link }: Props) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <Link href={link} passHref>
          <a>
            <Button
              type="button"
              title="Novo"
              icon={PlusIcon}
              style="primary"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
