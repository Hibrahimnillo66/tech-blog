import Head from 'next/head';

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>About</title>
        <meta name="description" content="About me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          About Me
        </h1>
        <p className="mt-3 text-2xl">
          This is the about page.
        </p>
      </main>
    </div>
  );
}
