import Link from "next/link";
import { Seo } from "../components";

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/admin">
            <a>Acesso Tecnoprest</a>
          </Link>
        </li>
        <li>
          <Link href="/cliente">
            <a>Acesso Clientes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
