"use client";
import { useEffect, useRef, useState } from "react";
import { globalStore } from "@/store/globalStore";
import { toast, Toaster } from "sonner";
import { TriangleAlert, CircleCheck } from "lucide-react";

const icons = {
  error: <TriangleAlert />,
  success: <CircleCheck />,
};

export default function Alert() {
  const globalState = globalStore();
  const { alertStatus } = globalState;
  const lastAlertRef = useRef<typeof alertStatus | null>(null);
  const [position, setPosition] = useState<"bottom-left" | "bottom-center">(
    "bottom-left"
  );

  useEffect(() => {
    const updatePos = () =>
      setPosition(window.innerWidth < 1024 ? "bottom-center" : "bottom-left");
    updatePos();
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, []);

  useEffect(() => {
    if (!alertStatus?.status) {
      return;
    }

    if (
      lastAlertRef.current?.status === alertStatus.status &&
      lastAlertRef.current?.statusContent === alertStatus.statusContent &&
      lastAlertRef.current?.action?.label === alertStatus.action?.label
    ) {
      return;
    }

    lastAlertRef.current = alertStatus;

    const toastOptions: any = {};

    if (alertStatus.statusContent) {
      toastOptions.description = alertStatus.statusContent;
    }

    if (alertStatus.action) {
      toastOptions.action = {
        label: alertStatus.action.label,
        onClick: alertStatus.action.onClick,
      };
    }

    toast[alertStatus.status](alertStatus.statusHeader, toastOptions);
  }, [alertStatus, globalState]);

  return (
    <Toaster
      className={
        alertStatus?.status === "success"
          ? "bg-success text-success-content"
          : alertStatus?.status === "error"
          ? "bg-error text-error-content"
          : ""
      }
      position={position}
      visibleToasts={3}
      containerAriaLabel="Application notifications"
      closeButton
      icons={icons}
      duration={5000}
      richColors
      expand
    />
  );
}
