import SigninForm from "@/components/SigninForm";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-primary"
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
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <SigninForm />

            <div className="divider text-sm text-gray-500">
              New to Post Management?
            </div>

            <Link href="/signup" className="btn btn-outline btn-block">
              Create an Account
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Secure authentication powered by Laravel Sanctum
        </p>
      </div>
    </div>
  );
}
