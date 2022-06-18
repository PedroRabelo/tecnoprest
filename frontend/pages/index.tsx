import Link from "next/link";

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
          <Link href="/app">
            <a>Acesso Clientes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
