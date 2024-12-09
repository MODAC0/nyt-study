"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { News } from "@/interface/dtos/news";

const Home = () => {
  const [data, setData] = useState<News.weeklyNews[]>([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get('/api/weeklyNews');
      const serverData: News.weeklyNews[] = res.data.results;
      setData((initialData) => [...initialData, ...serverData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFetchThumnail = (mediaArray: News.Media[]) => {
    if (!mediaArray.length) return "";
    mediaArray.map(media => {
      media
    })

  }

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    console.log("State updated:", data);
  }, [data]);


  return <div>
    {data.map(({ title, id, media, }) =>
      <ul key={id}>
        <li>
          <h3>{title}</h3>
          {/* <img src={media[0]["media-metadata"][2].url} alt="" /> */}
        </li>
      </ul>
    )}
  </div>;
};

export default Home;
