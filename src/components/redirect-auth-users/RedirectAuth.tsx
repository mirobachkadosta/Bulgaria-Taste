import { globalStore } from "@/store/globalStore";
import { Navigate } from "react-router";

export default function RedirectAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = globalStore();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
