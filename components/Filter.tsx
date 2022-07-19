import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  ThumbUpIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { EFilter } from "../interfaces/EFilter";
import { actions } from "../store/reducers/Filter";

/**
 * Esta función devuelve un componente para mostrar el filtrado de las tareas, Se definió una enumeración de tipo EFilter
 * para controlar de manera mas efectiva el filtro seleccionado por el usuario.
 * @returns Component
 */
export default function Filter() {
  const dispatch = useDispatch();

  /**
   * Función para actualizar el valor del Redux al seleccionar un filtro.
   * @param value Tipo EFilter
   */
  const setAction = (value: EFilter) => {
    dispatch(actions.setFilter(value));
  };

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-appBlue bg-opacity-20 px-4 py-2 text-sm font-medium text-appBlue-dark hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Filters
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-appBlue-dark hover:text-appBlue-soft"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  onClick={(e) => setAction(EFilter.filter_min)}
                  className="text-appBlue-soft hover:bg-appBlue hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                >
                  <ClockIcon className="mr-2 h-5 w-5" />
                  30 min or less
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={(e) => setAction(EFilter.filter_med)}
                  className="text-appBlue-soft hover:bg-appBlue hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                >
                  <ClockIcon className="mr-2 h-5 w-5" />
                  31 a 60 min
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={(e) => setAction(EFilter.filter_max)}
                  className="text-appBlue-soft hover:bg-appBlue hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                >
                  <ClockIcon className="mr-2 h-5 w-5" />
                  more than 60 min
                </button>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  onClick={(e) => setAction(EFilter.clear)}
                  className="text-appBlue-soft hover:bg-appBlue hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                >
                  <ThumbUpIcon className="mr-2 h-5 w-5" />
                  Clear
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
