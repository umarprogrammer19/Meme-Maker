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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
      <h1 className="text-6xl font-extrabold text-center mt-12 mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Meme Generator
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-7xl">
        {response && response.data.memes.map((item: Memes) => (
          <div key={item.id} className="group flex flex-col bg-[#0f3460] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative w-full h-48 sm:h-64">
              <Image
                src={item.url}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl group-hover:opacity-80 transition-opacity duration-300"
              />
            </div>
            <div className="p-4 text-center bg-[#1a1a2e]">
              <h2 className="font-bold text-lg mb-2 truncate">{item.name}</h2>
              <Link href={{
                pathname: "creatememe",
                query: {
                  name: item.name,
                  url: item.url,
                  id: item.id,
                  box_count: item.box_count,
                }
              }}>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105">
                  Generate Meme
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}