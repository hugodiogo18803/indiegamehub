import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAppStore((s) => s.login);
  const signup = useAppStore((s) => s.signup);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email.trim(), password);
    if (ok) {
      toast.success("Sessão iniciada");
      navigate("/");
    } else {
      toast.error("Credenciais inválidas");
    }
  };

  const handleSignup = async () => {
    const ok = await signup(email.trim(), password);
    if (ok) {
      toast.success("Conta criada");
      navigate("/");
    } else {
      toast.error("Email já existente");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 dark:text-gray-100 p-8 rounded shadow w-80"
      >
        <h2 className="text-xl font-semibold text-center">Iniciar sessão</h2>

        <input
          type="email"
          required
          placeholder="Email"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={handleSignup}
          className="w-full border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          Registar
        </button>
      </form>
    </div>
  );
}
