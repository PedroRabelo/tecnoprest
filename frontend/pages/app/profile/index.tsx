import {
  CreditCardIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Conta e Usuários", href: "#", icon: UserGroupIcon, current: true },
  {
    name: "Pontos Georeferenciados",
    href: "#",
    icon: MapPinIcon,
    current: false,
  },
  {
    name: "Plano e Pagamentos",
    href: "#",
    icon: CreditCardIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Profile() {
  return (
    <div>
      <div className="space-y-6 sm:px-6 mb-4 lg:px-0 lg:col-span-9">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-4 px-4 space-y-2 sm:p-6">
            <div>
              <span className="text-lg leading-6 font-bold text-gray-900">
                NOME DA EMPRESA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                00.123.145/0001-22
              </span>

              <span className="text-sm font-medium text-gray-700">
                Responsável: Nome do responsável
              </span>
              <span className="text-sm font-medium text-gray-700">
                62 9 99665455
              </span>
              <span className="text-sm font-medium text-gray-700">
                contato@empresa.com
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                    : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                  "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-indigo-500 group-hover:text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Dados de acesso
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Informações de acesso e usuários cadastrados
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
