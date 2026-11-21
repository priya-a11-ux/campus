import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { ForgotPasswordSchema } from "../../schema/forgotPassword.schema.js";
import { useForgotPassword } from "../../hooks/useForgotPassword.hook.js";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { mutate, isPending } = useForgotPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    mutate(
      { email: values.email, newPassword: values.newPassword },
      {
        onSuccess: (data) => {
          setIsSuccess(true);
          toast.success(data?.message || "Password updated successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to reset password. Please try again.");
        },
      }
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Password Reset!</h2>
            <p className="text-gray-500 text-sm mt-2">
              Your password has been successfully updated. Redirecting you to the login page...
            </p>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Go to Login now
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
                <KeyRound className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
              <p className="text-gray-500 text-sm mt-1">
                Enter your registered email and choose a new password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="student@campus.edu"
                    {...form.register("email")}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    {...form.register("newPassword")}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    {...form.register("confirmPassword")}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Password requirement hint */}
              <div className="bg-blue-50 text-blue-800 text-xs rounded-lg p-3">
                Password must have at least 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol (e.g. !@#$%^&*).
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
              >
                {isPending ? "Setting New Password..." : "Set New Password"}
              </button>

              {/* Back to Login Link */}
              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
      <Toaster />
    </section>
  );
}
