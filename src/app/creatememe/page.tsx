"use client";
import Image from 'next/image';
import React from 'react';

interface Meme {
    id: string;
    url: string;
}

const CreateMeme = async ({ searchParams }: { searchParams: Meme }) => {
    return (
        <>
            <div>Create Meme</div>
            <Image src={searchParams.url} alt='Meme' width={200} height={200} />
        </>
    )
}

export default CreateMeme;