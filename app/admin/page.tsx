import { AppShell } from "@/app/components/AppShell";
import { AdminGate } from "@/app/components/AdminGate";
import { AdminDashboard } from "./AdminDashboard";

export default function AdminPage() {
  return (
    <AppShell activeNav="progress">
      <AdminGate>
        <AdminDashboard />
      </AdminGate>
    </AppShell>
  );
}