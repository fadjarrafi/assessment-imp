"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  [key: string]: string[] | string;
}

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        router.push("/posts");
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      setErrors({
        general: "Connection error. Please check if the API is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errors.general}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Full Name</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          className={`input input-bordered w-full ${
            errors.name ? "input-error" : "focus:input-primary"
          }`}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {Array.isArray(errors.name) ? errors.name[0] : errors.name}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email Address</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          className={`input input-bordered w-full ${
            errors.email ? "input-error" : "focus:input-primary"
          }`}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">
              {Array.isArray(errors.email) ? errors.email[0] : errors.email}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          className={`input input-bordered w-full ${
            errors.password ? "input-error" : "focus:input-primary"
          }`}
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
        {errors.password && (
          <label className="label">
            <span className="label-text-alt text-error">
              {Array.isArray(errors.password)
                ? errors.password[0]
                : errors.password}
            </span>
          </label>
        )}
        <label className="label">
          <span className="label-text-alt text-gray-500">
            Minimum 8 characters
          </span>
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Confirm Password</span>
        </label>
        <input
          type="password"
          name="password_confirmation"
          placeholder="••••••••"
          className={`input input-bordered w-full ${
            errors.password_confirmation ? "input-error" : "focus:input-primary"
          }`}
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        {errors.password_confirmation && (
          <label className="label">
            <span className="label-text-alt text-error">
              {Array.isArray(errors.password_confirmation)
                ? errors.password_confirmation[0]
                : errors.password_confirmation}
            </span>
          </label>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Creating Account...
          </>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}
