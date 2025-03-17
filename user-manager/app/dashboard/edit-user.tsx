"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserById, updateUser } from "@/services/userService"; // Função para obter e atualizar usuário

interface EditUserProps {
  className?: string;
  userId: string;
}

export function EditUser({ className = "", userId }: EditUserProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    authorities: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Carregar dados do usuário ao abrir a modal
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await getUserById(Number(userId));
        if (response && response.user) {
          setFormData({
            username: response.user.username ?? "",
            email: response.user.email ?? "",
            authorities: response.user.authorities ?? "",
          });
        } else {
          setMessage("Failed to load user data.");
        }
      } catch (error) {
        setMessage("Failed to load user data.");
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const response = await updateUser(Number(userId), formData);

    if (response.success) {
      setMessage("User updated successfully!");
    } else {
      setMessage(`Error: ${response.message}`);
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={`pl-4 bg-blue-500 text-white ${className}`}>
          Edit user
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit the details below to update the user information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter username"
              className="col-span-3"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="col-span-3"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="authorities" className="text-right">
              Authorities
            </Label>
            <Input
              id="authorities"
              placeholder="Enter roles"
              className="col-span-3"
              value={formData.authorities}
              onChange={handleChange}
            />
          </div>
        </div>
        {message && <p className="text-center text-sm">{message}</p>}
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}