"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface FormData {
  title: string;
  content: string;
}

interface FormErrors {
  [key: string]: string[] | string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({
          title: result.data.title,
          content: result.data.content,
        });
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setSubmitting(true);
    setErrors({});

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin");
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(`/posts/${postId}`);
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="navbar bg-white shadow-md">
        <div className="flex-1">
          <Link href="/posts" className="btn btn-ghost text-xl normal-case">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Post Management
          </Link>
        </div>
        <div className="flex-none">
          <Link href={`/posts/${postId}`} className="btn btn-ghost">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
          <p className="text-gray-600 mt-2">Update your post content</p>
        </div>

        <div className="card bg-white shadow-lg border border-gray-200">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <span className="label-text font-semibold text-gray-700">
                    Post Title
                  </span>
                  <span className="label-text-alt text-gray-500">Required</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter an engaging title for your post"
                  className={`input input-bordered input-lg w-full ${
                    errors.title ? "input-error" : "focus:input-primary"
                  }`}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {Array.isArray(errors.title)
                        ? errors.title[0]
                        : errors.title}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Post Content
                  </span>
                  <span className="label-text-alt text-gray-500">Required</span>
                </label>
                <textarea
                  name="content"
                  placeholder="Write your post content here. You can write as much as you want..."
                  className={`textarea textarea-bordered h-64 w-full text-base leading-relaxed ${
                    errors.content ? "textarea-error" : "focus:textarea-primary"
                  }`}
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.content && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {Array.isArray(errors.content)
                        ? errors.content[0]
                        : errors.content}
                    </span>
                  </label>
                )}
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    {formData.content.length} characters
                  </span>
                </label>
              </div>

              <div className="divider"></div>

              <div className="flex gap-3 justify-end">
                <Link href={`/posts/${postId}`} className="btn btn-outline">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
