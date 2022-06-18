import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

export function TenantHome() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>
        Bem-vindo {user?.name} - {user?.slug}
      </h1>
    </div>
  );
}

export default TenantHome;
