import { useMutation } from "@tanstack/react-query";

const resetPasswordRequest = async ({ email, newPassword }) => {
  const baseUrl = (import.meta.env.VITE_API_URL || "http://localhost:3001/").replace(/\/+$/, "");
  const response = await fetch(`${baseUrl}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data?.message ||
      data?.error?.message ||
      (Array.isArray(data?.errors) && data.errors[0]?.msg) ||
      (Array.isArray(data) && data[0]?.msg) ||
      "Failed to reset password. Please try again.";
    throw new Error(errorMsg);
  }

  return data;
};

export function useForgotPassword() {
  return useMutation({
    mutationFn: resetPasswordRequest,
  });
}
