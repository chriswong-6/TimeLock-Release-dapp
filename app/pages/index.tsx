import { NextPage } from "next";
import Head from "next/head";
import s from "@/styles/Twitter.module.scss";
import Sidebar from "@/components/twitter/Sidebar";
import Hotspot from "@/components/twitter/Hotspot";
import MainContent from "@/components/twitter/MainContent";

const TwitterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="twiiter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/twitter_favicon.ico" />
        {/* <script src="https://cdn.jsdelivr.net/npm/secret-sharing.js@1.3.1/build/secret-sharing.min.js"></script> */}
      </Head>
      <main className={s.page}>
        <div className={s.doc}>
          <Sidebar />
          <MainContent />
          <Hotspot />
        </div>
      </main>
    </>
  );
};

export default TwitterPage;
