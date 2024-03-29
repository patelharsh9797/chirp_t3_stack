// TODO Next.js
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

import PageLayout from "~/components/PageLayout";

// TODO for getStaticProps

import Image from "next/image";
import { LoadingSpinner } from "~/components/Loading";

import PostView from "~/components/PostView";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUser.useQuery({
    userId: props.userId,
  });

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size={60} />
      </div>
    );

  if (!data || data.length === 0) return <div>User has not posted yet.</div>;

  return (
    <div className="flex grow flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username} - Emotter</title>
      </Head>
      <PageLayout>
        <div className="shrink-0">
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.profileImageUrl}
            alt={`${data.profileImageUrl ?? ""}'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4">
          <h2 className="p-4 text-2xl font-bold">{`@${
            data.username ?? ""
          } `}</h2>
        </div></div>
        <div className="w-full border-b border-slate-400"></div>
        <div className="grow overflow-y-auto">
          <ProfileFeed userId={data.id} />
        </div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default ProfilePage;
