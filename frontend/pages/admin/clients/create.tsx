import { Button, InputForm } from "../../../components";

export function CreateClient() {
  return (
    <>
      <div className="pb-5 ">
        <h2 className="text-xl leading-6 font-bold text-gray-900">
          Cadastrar Cliente
        </h2>
      </div>
      <div className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Perfil
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações para acessar o sistema
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      URL de acesso
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        tecnoprest.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Logomarca
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Dados da empresa
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações de cadastro da empresa
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <InputForm
                      label="CNPJ"
                      name="cnpj"
                      placeholder="00.000-000/0001-00"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6">
                    <InputForm
                      label="Nome"
                      name="name"
                      placeholder="Informe o nome da empresa"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <InputForm
                      label="E-mail"
                      name="email"
                      placeholder="email@exemplo.com"
                      type="email"
                    />
                  </div>

                  <div className="col-span-6">
                    <InputForm
                      label="Nome Responsável"
                      name="contact-person"
                      placeholder="Informe o nome da pessoa responsável"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputForm
                      label="Telefone de contato(Whatsapp)"
                      name="contact-phone"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <InputForm label="CEP" name="postal-code" type="text" />
                  </div>

                  <div className="col-span-6">
                    <InputForm
                      label="Endereço"
                      name="street-address"
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <InputForm label="Cidade" name="city" type="text" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <InputForm label="Estado" name="region" type="text" />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      País
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Brasil</option>
                      <option>Argentina</option>
                      <option>México</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button title="Voltar" style="secondary" type="button" />
          <Button title="Salvar" style="primary" type="submit" />
        </div>
      </div>
    </>
  );
}

export default CreateClient;