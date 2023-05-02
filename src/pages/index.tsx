import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

const Home: NextPage = () => {
  const user = useUser();

  const { data } = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Chrip T3 Stack App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {!user.isSignedIn && <SignInButton />}
        {!!user.isSignedIn && <SignOutButton />}
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        <div>
          {data?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;