import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Memes {
  name: string;
  url: string;
  id: number;
  box_count: number;
}

export default async function Home() {
  const data = await fetch("https://api.imgflip.com/get_memes");
  const response = await data.json();
  
  return (
    <>
      <h1 className="text-3xl underline text-center mt-4 mb-8">Meme Generator</h1>
      <div className="flex justify-center gap-5 flex-wrap">
        {
          response && response.data.memes.map((item: Memes) => {
            return <div key={item.id}>
              <Image src={item.url} alt="Memes" width={200} height={200} />
              <button className="btn my-2 border border-[black] p-2"><Link href={{
                pathname: "creatememe",
                query: {
                  name: item.name,
                  url: item.url,
                  id: item.id,
                  box_count: item.box_count,
                }
              }}>Generate Meme</Link></button>
            </div>
          })
        }
      </div>
    </>
  );
}
