import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { UsersTable } from "./data-table";
import { PrismaClient } from "@prisma/client";
import { User } from "@/types/user";
import ConfettiEffect from "@/components/confetti-effect";
import { Users, Shield, UserCheck } from "lucide-react";

const prisma = new PrismaClient();

export default async function Page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  // Obter o número total de utilizadores
  const totalUsers = await prisma.users.count();
  
  // Obter todos os utilizadores para filtrar admins e clientes
  const users: User[] = await prisma.users.findMany();
  
  const totalAdmins = users.filter(user => user.authorities?.includes("admin")).length;
  const totalClients = users.filter(user => user.authorities?.includes("client")).length;

  return (
    <SidebarProvider>
      <ConfettiEffect />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Amason</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Amason User Manager</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="relative bg-blue-500 text-white h-32 rounded-xl flex items-center justify-center text-xl font-bold">
              <Users className="absolute bottom-2 right-2 w-30 h-30 opacity-40" />
              Users: {totalUsers}
            </div>
            <div className="relative bg-green-500 text-white h-32 rounded-xl flex items-center justify-center text-xl font-bold">
              <UserCheck className="absolute bottom-2 right-2 w-30 h-30 opacity-40" />
              Clients: {totalClients}
            </div>
            <div className="relative bg-red-500 text-white h-32 rounded-xl flex items-center justify-center text-xl font-bold">
              <Shield className="absolute bottom-2 right-2 w-30 h-30 opacity-40" />
              Admins: {totalAdmins}
            </div>
          </div>
          <div className="bg-white border border-solid border-zinc-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-4 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <UsersTable users={users} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}