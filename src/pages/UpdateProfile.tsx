import { useState, FormEvent, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks.js"
import { updateProfile, setError } from "../features/auth/authSlice.js"
import Spinner from "../assets/Spinner"

const UpdateProfile = () => {
  const dispatch = useAppDispatch()

  const { currentUser, loading, message, error } = useAppSelector(
    (state) => state.auth
  )

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return dispatch(setError("Passwords do not match"))
    }

    if (currentUser) {
      dispatch(
        updateProfile({ user: currentUser, email: email, password: password })
      )
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setStateFunction: (arg: string) => void
  ) => {
    setStateFunction(e.target.value)
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">
            Update profile
          </h2>
          {message && (
            <p className="text-center text-green-800 bg-green-100 border border-green-200 rounded-sm py-2 mt-4">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center text-red-800 bg-red-100 border border-red-200 rounded-sm py-2 mt-4">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  defaultValue={currentUser!.email as string}
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
                  placeholder="Leave blank to leave unchanged"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Leave blank to leave unchanged"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInputChange(e, setConfirmPassword)}
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
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="text-sm text-center mt-4">
          <Link className="font-medium" to="/">
            Cancel
          </Link>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
