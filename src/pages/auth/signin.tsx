// src/pages/auth/signin.tsx
import { GetServerSideProps } from 'next';
import { getProviders, signIn, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

type SignInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

const SignIn = ({ providers }: SignInProps) => {
  return (
    <div>
      <h1>Sign In</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
