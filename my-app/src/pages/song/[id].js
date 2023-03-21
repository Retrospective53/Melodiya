import React from "react";
import musicServices from "../../services/music";
import axios from "axios";
import { useRouter } from "next/router";
import SongCard from "@/components/SongStatus/SongCard";
import "../../app/globals.css";
import Nabvar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SongPage from "@/components/SongStatus/SongPage";

const Songb = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loding...</div>;
  }

  return (
    <div>
      <Nabvar />
      <button onClick={() => console.log(post)}>check post</button>
      <SongPage song={post} />
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await musicServices.getMusic();

  const paths = response.map((song) => ({
    params: { id: song.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(
    `http://localhost:3003/api/songs/${params.id}`
  );
  const post = response.data;

  return {
    props: { post },
  };
}

export default Songb;
