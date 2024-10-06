"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface Meme {
    id: string;
    url: string;
}

const CreateMeme = ({ searchParams }: { searchParams: Meme }) => {
    const [generatedMemeImage, setGeneratedMemeImage] = useState<string | null>(null)
    const text1 = useRef<HTMLInputElement>(null);
    const text2 = useRef<HTMLInputElement>(null);

    const generateMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=umarprogrammer19&password=Ugsofficial190807&text0=${text1.current?.value}&text1=${text2.current?.value}`, {
            method: "POST"
        });
        const response = await data.json();
        setGeneratedMemeImage(response.data.url);
    }
    return (
        <>
            <div>Create Meme</div>
            <Image src={searchParams.url} alt='Meme' width={200} height={200} />
            <form onSubmit={generateMeme}>
                <input type="text" placeholder='Enter Text 1' ref={text1} />
                <input type="text" placeholder='Enter Text 2' ref={text2} />
                <button type='submit'>Generate</button>
            </form>

            {
                generatedMemeImage && <Image src={generatedMemeImage} alt='meme' width={200} height={200} />
            }
        </>
    )
}

export default CreateMeme;