"use client";

import { useEffect, useState } from "react";
import { WeeklyNews_T } from "@/interface/dtos/news";
import Image from "next/image";

const WeeklyNews = () => {
    const [data, setData] = useState<WeeklyNews_T.DTO[]>([]);

    const fetchPost = async () => {
        try {
            const res = await fetch('/api/weeklyNews', {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch data: ${res.statusText}`);
            }
            const serverData = await res.json();
            setData((initialData) => [...initialData, ...serverData.results]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);


    return <ul className="flex flex-row w-full overflow-hidden flex-nowrap">
        {data.map(({ title, id, media, }) =>
            <li key={id} className="w-1/3">
                <div>
                    {media.map((mediaItem, index) => {
                        const metadata = mediaItem['media-metadata'];
                        if (metadata && metadata.length > 2) {
                            const { url, height, width } = metadata[metadata.length - 1];
                            return (
                                <Image
                                    key={index}
                                    src={url}
                                    alt="thumbnail"
                                    width={width}
                                    height={height}
                                    style={{ objectFit: "cover" }}
                                    priority
                                />
                            );
                        }
                        return null;
                    })}
                </div>
                <p>{title}</p>
            </li>
        )}
    </ul>;
};

export default WeeklyNews;
