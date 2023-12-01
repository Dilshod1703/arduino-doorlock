"use client";
import { FC, memo, useEffect } from "react";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { getDoorStatus, toggleDoor } from "@/services/database.service";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DoorController: FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDoorStatus = () => {
    setLoading(true);
    getDoorStatus()
      .then((res) => {
        setEnabled(res.data.isOpen);
      })
      .catch((error) => {
        console.error(error);
        setEnabled(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoorStatus();
    onValue(ref(database, "isOpen"), (snapshot) => {
      if (!snapshot.exists()) return;
      setEnabled(snapshot.val());
    });
  }, []);

  const handleDoor = async (state: boolean) => {
    if (loading) return;
    setLoading(true);
    await toggleDoor(state);
    setLoading(false);
  };

  return (
    <Switch.Group as="div" className="flex items-center py-2 sm:px-6 lg:px-8">
      <Switch
        checked={enabled}
        onChange={handleDoor}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">Door Status</span>{" "}
        <span className="text-gray-500">({enabled ? "open" : "closed"})</span>
      </Switch.Label>
    </Switch.Group>
  );
};

export default memo(DoorController);
