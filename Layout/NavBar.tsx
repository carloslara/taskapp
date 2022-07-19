/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actions, getSelectedMenu } from "../store/reducers/Menu";
import Router, { useRouter } from "next/router";
import Filter from "../components/Filter";

/**
 * Arreglo para la creación del menú, se realizó de esta manera ya que en caso de ser una menú dinámico o que provenga
 * de algún servicio, será mas fácil la integración del servicio.
 */
const navigation = [
  { name: "Task", href: "/" },
  { name: "Reports", href: "/report" },
  { name: "History", href: "/history" },
  { name: "Autocomplete", href: "/autocomplete" },
];

/**
 * Función para juntar clases a partir de una condición.
 * @param classes
 * @returns
 */
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const dispatch = useDispatch();
  const selectedMenu = useSelector(getSelectedMenu);
  const router = useRouter();

  /**
   * Función para redirigir la aplicación y setear el menú seleccionado al Redux.
   * @param route
   */
  const redirect = (route: string) => {
    dispatch(actions.setMenu(route));
    router.push(route);
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-appBlue-light md:rounded-md lg:rounded-lg lg:mt-4"
    >
      {({ open }) => (
        <>
          <div className="max-full mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-appBlue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Task app
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={(e) => redirect(item.href)}
                        className={classNames(
                          selectedMenu == item.href
                            ? "bg-appBlue text-white"
                            : "text-gray-600 hover:bg-appBlue hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {selectedMenu == "/" ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Filter />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={(e) => redirect(item.href)}
                  className={classNames(
                    selectedMenu == item.href
                      ? "bg-appBlue text-white"
                      : "text-black hover:bg-appBlue hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
