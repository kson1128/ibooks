import React, { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabase/utils/supabase';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async e => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/dashboard');
    }
  };
  const handleSignInWithGoogle = async e => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: 'http://localhost:3000/callback/',
      }
    );

    if (error) {
      alert(JSON.stringify(error));
    }
  };

  // const mySession = async (req, res) => {
  //   const session = await unstable_getServerSession(req, res, authOptions);
  //   if (session) {
  //     // Signed in
  //     console.log('Session', JSON.stringify(session, null, 2));
  //   } else {
  //     // Not Signed in
  //     res.status(401);
  //   }
  //   res.end();
  // };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Sign in to your account
        </h1>

        <div className="flex flex-col p-6">
          <button
            className="text-lg text-white font-semibold bg-blue-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            onClick={handleSignInWithGoogle}
          >
            Sign In with Google
          </button>

          <hr className="bg-gray-600 border-0 h-px my-8" />

          <form className="flex flex-col" onSubmit={handleSignIn}>
            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="mt-6 text-gray-200">
              Password
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

// import { useSession } from 'next-auth/react';

// export default function () {
//   const { data: session, loading } = useSession();
//   if (loading) return <p>Loading...</p>;
//   // if (!session) return <p>You are not authenciated</p>;
//   return <p>You are authenciated</p>;
// }
