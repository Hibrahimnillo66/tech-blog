// src/pages/index.tsx
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <Link href="/admin">Go to Admin</Link>
        </div>
      ) : (
        <div>
          <p>Please sign in to access admin features</p>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default Home;
