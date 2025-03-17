import { SignIn } from "@/components/auth/signin-button";
import ConfettiEffect from "@/components/confetti-effect";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 via-blue-600 to-gray-900 text-white text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 backdrop-blur-md bg-opacity-80 text-gray-900">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-md">Amason User Manager</h1>
        <SignIn />
      </div>
      <ConfettiEffect /> {/* Componente separado para confetes */}
    </div>
  );
}