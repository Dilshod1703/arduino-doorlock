"use client";
import Layout from "@/components/Layout";
import UsersTable from "@/components/UsersTable";
import DoorController from "@/components/DoorController";

export default function Home() {
  return (
    <Layout>
      <UsersTable />
      <DoorController />
    </Layout>
  );
}
