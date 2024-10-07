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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold underline text-center mt-4 mb-8 transition-transform duration-300 transform hover:scale-105">
        Meme Generator
      </h1>
      <div className="flex justify-center gap-5 flex-wrap px-4">
        {response && response.data.memes.map((item: Memes) => (
          <div key={item.id} className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 transform">
            <Image
              src={item.url}
              alt={item.name}
              width={200}
              height={200}
              className="object-cover"
            />
            <button className="btn my-2 border border-black bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <Link href={{
                pathname: "creatememe",
                query: {
                  name: item.name,
                  url: item.url,
                  id: item.id,
                  box_count: item.box_count,
                }
              }}>
                Generate Meme
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
