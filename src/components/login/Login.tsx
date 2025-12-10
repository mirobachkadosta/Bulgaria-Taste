import { useState } from "react";
import { supabase } from "@/supabase/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { globalStore } from "@/store/globalStore";
import { Link, useNavigate } from "react-router";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setIsLoading, setUser, setAlertStatus } = globalStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertStatus({
        status: "error",
        statusHeader: "Моля, попълнете всички полета.",
      });
      return;
    }
    if (password.length < 6) {
      setAlertStatus({
        status: "error",
        statusHeader: "Паролата трябва да е поне 6 символа.",
      });
      return;
    }
    setIsLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: email.trim(),
        password: password.trim(),
      }
    );
    setIsLoading(false);
    if (signInError) {
      if (
        signInError.message
          .toLowerCase()
          .includes("invalid login credentials") ||
        signInError.message.toLowerCase().includes("invalid email or password")
      ) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешен имейл или парола.",
        });
      } else if (signInError.message.toLowerCase().includes("user not found")) {
        setAlertStatus({
          status: "error",
          statusHeader: "Потребител с този имейл не съществува.",
        });
      } else {
        setAlertStatus({
          status: "error",
          statusHeader: "Възникна грешка при входа. Опитайте отново.",
        });
      }
      return;
    }
    if (data.user) {
      const { data: userData, error: fetchError } = await supabase
        .from("user")
        .select("name, logo")
        .eq("email", data.user.email)
        .single();

      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
      }

      setUser({
        id: data.user.id,
        email: data.user.email || "",
        logo: userData?.logo || null,
        name: userData?.name || null,
      });
      setAlertStatus({
        status: "success",
        statusHeader: "Успешно влязохте във вашият профил!",
        statusContent: "Прехвърляне към началната страница...",
      });
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <main className="bg-base-100 full-width-section lg:pb-12 pb-6">
      <div className="flex flex-col content-container items-center justify-center">
        <HeaderSection header="Вход" />
        <form
          onSubmit={handleLogin}
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
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Влизане..." : "Вход"}
          </Button>
          <div className="flex flex-col gap-2 text-center">
            <p>
              Нямате акаунт?{" "}
              <Link
                to="/register"
                className="text-primary underline! underline-offset-2"
              >
                Регистрирайте се тук
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
