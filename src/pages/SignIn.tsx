import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks.js"
import { signIn } from "../features/auth/authSlice.js"
import Spinner from "../assets/Spinner.js"

const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { error, loading, currentUser } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await dispatch(signIn({ email, password }))
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setStateFunction: (arg: string) => void
  ) => {
    setStateFunction(e.target.value)
  }

  useEffect(() => {
    currentUser && navigate("/")
  }, [currentUser])

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
            Sign into your account
          </h2>
          {error && (
            <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mt-4">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 mb-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInputChange(e, setEmail)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`${
                  loading
                    ? "bg-gray-200 text-gray-900 cursor-auto"
                    : "bg-824936 text-white hover:bg-8f5b4a"
                } flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-medium leading-6  shadow-sm`}
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="h-6 w-6 fill-824936" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="text-sm text-center mb-2">
            <Link
              className="font-medium hover:text-slate-800"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-sm text-center">
            Need an account?{" "}
            <Link className="font-medium hover:text-slate-800" to="/sign-up">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
