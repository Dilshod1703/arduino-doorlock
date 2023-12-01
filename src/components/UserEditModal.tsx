import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addUser } from "@/services/database.service";
import Toast from "@/components/Toast";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refreshUsers: () => Promise<void>;
}
const UserEditModal: FC<IProps> = ({ open, setOpen, refreshUsers }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [serial, setSerial] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onClose = () => {
    setOpen(false);
    setError("");
    setName("");
    setSerial("");
    setPassword("");
  };
  const validateUser = (): boolean => {
    if (!name || !serial || !password) {
      setError("Please fill in all fields");
      return false;
    }
    if (name.length > 20) {
      setError("User Name must be less than 20 characters");
      return false;
    }
    if (serial.length < 8) {
      setError("Card Serial must be between 8 and 16 characters");
      return false;
    }
    if (password.length !== 4) {
      setError("Password must be 4 characters");
      return false;
    }
    return true;
  };

  const createUser = async () => {
    if (loading) return;
    try {
      if (!validateUser()) {
        return;
      }
      setLoading(true);
      await addUser({ name, cardNumber: serial, password });
      await refreshUsers();
      onClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Toast show={!!error} close={() => setError("")} text={error} error />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="flex flex-1 flex-col justify-center ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create User
                      </h2>
                    </div>

                    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          User Name
                        </label>
                        <div className="mt-2">
                          <input
                            value={name}
                            onChange={(e) =>
                              setName(
                                e.target.value.trim().replace(/[^a-zA-Z]/g, "")
                              )
                            }
                            id="name"
                            maxLength={20}
                            type="text"
                            autoComplete="off"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="serial"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Serial
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            value={serial}
                            onChange={(e) =>
                              setSerial(
                                e.target.value
                                  .trim()
                                  .replace(/[^a-zA-Z0-9]/g, "")
                              )
                            }
                            id="serial"
                            type="text"
                            maxLength={16}
                            autoComplete="off"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            value={password}
                            onChange={(e) => {
                              const password = e.target.value.trim();
                              setPassword(password.replace(/[^0-9]/g, ""));
                            }}
                            id="password"
                            maxLength={4}
                            name="password"
                            type="text"
                            autoComplete="off"
                            required
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={createUser}
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UserEditModal;
