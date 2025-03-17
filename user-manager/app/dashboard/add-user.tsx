"use client";
import { useState } from "react";
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
import { createUser } from "@/services/userService"; // Importa a função para criar usuário

export function AddUser({ className = "" }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    authorities: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const response = await createUser(formData);

    if (response.success) {
      setMessage("User created successfully!");
    } else {
      setMessage(`Error: ${response.message}`);
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={`pl-4 bg-green-500 text-white ${className}`}>
          Add user
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Enter the details below to create a new user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" placeholder="Enter username" className="col-span-3" value={formData.username} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Enter email" className="col-span-3" value={formData.email} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" type="password" placeholder="Enter password" className="col-span-3" value={formData.password} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="authorities" className="text-right">
              Authorities
            </Label>
            <Input id="authorities" placeholder="Enter roles" className="col-span-3" value={formData.authorities} onChange={handleChange} />
          </div>
        </div>
        {message && <p className="text-center text-sm">{message}</p>}
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
