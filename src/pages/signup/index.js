import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

import { auth } from "@/firebase/config";
import { withAuth } from "@/context/authContext";

export function SignUp(props) {
  const { dispatch: authDispatch } = props.authContext;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const cleanUpMessages = () => {
    setError(null);
    setIsAccountCreated(false);
  };

  const updateUser = (user) => {
    setIsAccountCreated(true);
    authDispatch.loginUser(user);
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Getting some user", user);
      resetForm();
      updateUser(user);
    } catch (err) {
      console.log("caught in error", err);
      setError(err);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 rounded-lg p-6"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => {
              cleanUpMessages();
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-400 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => {
              cleanUpMessages();
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        </p>
        {isAccountCreated && (
          <p className="text-center mt-4 bg-green-400 p-2 rounded">
            User successfully created. Go to Login screen to proceed
          </p>
        )}

        {error && (
          <p className="text-center mt-4 bg-red-400 p-2 rounded">
            {error.code} : {error.message}
          </p>
        )}
      </form>
    </main>
  );
}

export default withAuth(SignUp);
