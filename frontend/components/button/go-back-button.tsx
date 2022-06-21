import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md"
    >
      <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      Voltar
    </button>
  );
}
