import { useState } from "react";
import { supabase } from "@/supabase/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { globalStore } from "@/store/globalStore";
import { Link, useNavigate } from "react-router";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { validateImage, uploadToSupabase } from "@/utility/helpers";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { isLoading, setIsLoading, setUser, setAlertStatus } = globalStore();
  const navigate = useNavigate();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const error = validateImage(file);
      if (error) {
        setAlertStatus({
          status: "error",
          statusHeader: "Проблем при качване на лого",
          statusContent: error,
        });
        setLogoFile(null);
      } else {
        setLogoFile(file);
      }
    }
  };

  const handleButtonClick = () => {
    document
      .querySelector<HTMLInputElement>('[data-testid="file-input"]')
      ?.click();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertStatus({
        status: "error",
        statusHeader: "Полетата за имейл и парола са задължителни.",
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
    try {
      let logoUrl = "";
      if (logoFile) {
        const ext = logoFile.name.split(".").pop();
        const logoPath = `logos/${logoFile.name
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_.-]/g, "")}-${Date.now()}.${ext}`;
        try {
          logoUrl = await uploadToSupabase(logoFile, logoPath);
        } catch (error: any) {
          setIsLoading(false);
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка при качване на логото.",
            statusContent: error.message,
          });
          return;
        }
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setIsLoading(false);
        if (
          signUpError.message.includes("already registered") ||
          signUpError.message.includes("User already registered")
        ) {
          setAlertStatus({
            status: "error",
            statusHeader: "Този имейл вече е регистриран.",
          });
        } else {
          setAlertStatus({
            status: "error",
            statusHeader: "Възникна грешка при регистрацията. Опитайте отново.",
          });
        }
        return;
      }

      if (data.user && data.user.email) {
        const { error: insertError } = await supabase.from("user").insert([
          {
            email: data.user.email,
            name: name,
            logo: logoUrl,
          },
        ]);

        if (insertError) {
          setIsLoading(false);
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка при създаване на профил.",
            statusContent: insertError.message,
          });
          return;
        }

        const { data: userData, error: fetchError } = await supabase
          .from("user")
          .select("name, logo")
          .eq("email", data.user.email)
          .single();

        if (fetchError) {
          setIsLoading(false);
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка при зареждане на профил.",
            statusContent: fetchError.message,
          });
          return;
        }

        setUser({
          id: data.user.id,
          email: data.user.email,
          logo: userData?.logo || null,
          name: userData?.name || null,
        });
      }

      setIsLoading(false);
      setAlertStatus({
        status: "success",
        statusHeader:
          "Успешна регистрация! Прехвърляне към началната страница...",
      });
      setEmail("");
      setPassword("");
      setName("");
      setLogoFile(null);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setAlertStatus({
        status: "error",
        statusHeader: "Възникна грешка при регистрацията. Опитайте отново.",
        statusContent: String(err),
      });
    }
  };

  return (
    <main className="bg-base-100 full-width-section lg:pb-12 pb-6">
      <div className="flex flex-col content-container items-center justify-center">
        <HeaderSection header="Регистрация" />
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <div className="flex flex-col gap-2 items-center">
            {logoFile ? (
              <div className="relative w-[72px] h-[72px]">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={URL.createObjectURL(logoFile)}
                  alt="лого на бизнеса"
                />
              </div>
            ) : (
              <div className="w-[72px] h-[72px] rounded-full bg-base-200 border-2 border-dashed border-primary flex items-center justify-center">
                <span className="text-primary text-xs text-center">
                  Без лого
                </span>
              </div>
            )}
            <Button
              className="text-accent"
              variant={"link"}
              type="button"
              aria-label="Прикачете снимка за лого"
              data-testid="add-logo-button"
              onClick={handleButtonClick}
            >
              {logoFile ? "Промени снимка" : "Прикачи снимка"}
            </Button>
            <input
              type="file"
              accept="image/jpeg,image/png"
              hidden
              data-testid="file-input"
              onChange={handleLogoChange}
            />
          </div>
          <Input
            type="text"
            placeholder="Име ( по избор )"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-primary border rounded-lg placeholder:text-secondary/50 text-primary"
          />
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
            {isLoading ? "Регистриране..." : "Регистрирай се"}
          </Button>
          <div className="flex flex-col gap-2 text-center">
            <p>
              Вече имате акаунт?{" "}
              <Link
                to="/login"
                className="text-primary underline! underline-offset-2!"
              >
                Влезте тук
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
