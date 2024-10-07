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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold underline text-center mt-6 mb-8 transition-transform duration-300 transform hover:scale-105">
        Meme Generator
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {response && response.data.memes.map((item: Memes) => (
          <div key={item.id} className="flex flex-col items-center bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="relative w-full h-64"> {/* Fixed height for consistency */}
              <Image
                src={item.url}
                alt={item.name}
                layout="fill"
                objectFit="cover" // Maintain aspect ratio while covering the area
                className="rounded-t-lg transition-transform duration-500 transform hover:scale-105"
              />
            </div>
            <div className="p-4 text-center bg-gradient-to-b from-white to-gray-100">
              <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
              <Link href={{
                pathname: "creatememe",
                query: {
                  name: item.name,
                  url: item.url,
                  id: item.id,
                  box_count: item.box_count,
                }
              }}>
                <button className="btn my-2 border border-transparent bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105">
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
