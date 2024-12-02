"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [weeklyNews, setWeeklyNews] = useState();

  const fetchNews = async () => {
    try {
      const res = await axios.get(`/api/weeklyNews`).then(res => console.log(res.data));

    } catch (error) {
      //   console.error(error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  })

  return (
    <main>main page</main>
  );
}
