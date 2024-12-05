import { News } from "@/interface/dtos/news";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchPost = async () => {
  const res = await fetch('/api/weeklyNews', {
    cache: "no-store",
  })
  return res.json();
}

const Home = async () => {
  const data = await fetchPost();
  console.log(data);
  return <div></div>;
}

export default Home;


