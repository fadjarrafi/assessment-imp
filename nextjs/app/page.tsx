import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
              <svg
                className="w-16 h-16 text-primary"
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
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Post Management System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, manage, and organize your posts with ease
            </p>
          </div>

          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Get Started
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg">
                  <svg
                    className="w-12 h-12 text-primary mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h3 className="font-semibold text-lg mb-2">New User?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Create an account to start managing your posts
                  </p>
                  <Link href="/signup" className="btn btn-primary btn-block">
                    Sign Up
                  </Link>
                </div>

                <div className="p-6 bg-linear-to-br from-indigo-50 to-indigo-100 rounded-lg">
                  <svg
                    className="w-12 h-12 text-secondary mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <h3 className="font-semibold text-lg mb-2">
                    Have an Account?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign in to access your posts
                  </p>
                  <Link href="/signin" className="btn btn-secondary btn-block">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
