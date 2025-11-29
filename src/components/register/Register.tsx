import { useState } from "react";
import { supabase } from "@/supabase/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Моля, попълнете и двете полета.");
      return;
    }
    setLoading(true);
    // Supabase Auth sign up
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (signUpError) {
      if (
        signUpError.message.includes("already registered") ||
        signUpError.message.includes("User already registered")
      ) {
        setError("Този имейл вече е регистриран.");
      } else {
        setError("Възникна грешка при регистрацията. Опитайте отново.");
      }
      return;
    }
    setSuccess(
      "Успешна регистрация! Моля, проверете имейла си за потвърждение."
    );
    setEmail("");
    setPassword("");
  };

  return (
    <main className="bg-base-100 full-width-section">
      <div className="flex flex-col content-container items-center justify-center min-h-[60vh]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-primary border rounded-lg placeholder:text-secondary/50 text-primary"
          />
          <Input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-primary border rounded-lg placeholder:text-secondary/50 text-primary"
          />
          <Button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Регистриране..." : "Регистрирай се"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </form>
      </div>
    </main>
  );
};

export default Register;
