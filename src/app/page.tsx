import Image from "next/image";
import React from "react";

interface Memes {
  id: number;
  name: string;
  url: string;
}

export default async function Home() {
  const data = await fetch("https://api.imgflip.com/get_memes");
  const response = await data.json();
  console.log(response.data.memes);

  return (
    <>
      <h1>Meme Generator</h1>
      <div className="flex justify-center gap-5 flex-wrap">
          {
            response && response.data.memes.map((item: Memes) => {
              return <div key={item.id}>
                <Image src={item.url} alt="Memes" width={200} height={200} />
              </div>
            })
          }
      </div>
    </>
  );
}
