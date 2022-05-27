import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { LayoutAdmin, LayoutPublic, LayoutTenant, Seo } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  let Layout = LayoutPublic;

  if (pathname.indexOf("/[tenant]") === 0) {
    Layout = LayoutTenant;
  }

  if (pathname.indexOf("/admin") === 0) {
    Layout = LayoutAdmin;
  }

  return (
    <Layout>
      <Seo title="TecnoPrest Management" description="Tecnoprest Management" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
