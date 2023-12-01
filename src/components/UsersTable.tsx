"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { User } from "@/types/user.types";
import { deleteUser, getData } from "@/services/database.service";
import UserEditModal from "@/components/UserEditModal";

const UsersTable: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getData();
      if (data?.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const removeUser = useCallback(async (cardNumber: string) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await deleteUser(cardNumber);
      if (data?.success) {
        await fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Users
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setNewUserModalOpen(true)}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50 sm:rounded-lg">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 sm:rounded-lg"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Card Serial
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Password
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 sm:rounded-lg"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((person) => (
                      <tr key={person.cardNumber + person.name}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 sm:rounded-lg">
                          {person.name}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Card Serial</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {person.cardNumber}
                            </dd>
                            <dt className="sr-only sm:hidden">Password</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {person.password}
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          {person.cardNumber}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {person.password}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 sm:rounded-lg">
                          <button
                            onClick={() => removeUser(person.cardNumber)}
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Delete
                            <span className="sr-only">, {person.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserEditModal
        open={newUserModalOpen}
        setOpen={setNewUserModalOpen}
        refreshUsers={fetchUsers}
      />
    </>
  );
};

export default UsersTable;
