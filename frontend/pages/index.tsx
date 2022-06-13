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
          <Link href="/tenant">
            <a>Acesso Clientes</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
