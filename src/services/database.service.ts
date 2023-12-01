import { User } from "@/types/user.types";

export const updateUsers = async (users: User[]) => {
  return await fetch("api/setUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      users,
    }),
  }).then((res) => res.json());
};

export const getData = async () => {
  return await fetch("api/getData").then((res) => res.json());
};

export const deleteUser = async (cardNumber: User["cardNumber"]) => {
  return await fetch("api/deleteUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cardNumber,
    }),
  }).then((res) => res.json());
};

export const addUser = async (user: User) => {
  return await fetch("api/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
    }),
  }).then((res) => res.json());
};

export const getDoorStatus = async () => {
  return await fetch("api/getDoorStatus").then((res) => res.json());
};

export const toggleDoor = async (state: boolean) => {
  return await fetch("api/toggleDoor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state,
    }),
  }).then((res) => res.json());
};
