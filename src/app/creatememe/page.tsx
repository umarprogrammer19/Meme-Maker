"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface Meme {
    name: string;
    id: string;
    url: string;
    box_count: number;
}

const CreateMeme = ({ searchParams }: { searchParams: Meme }) => {

    const [generatedMemeImage, setGeneratedMemeImage] = useState<string | null>(null);
    const [inputTexts, setInputTexts] = useState<{ [key: string]: string }>({});
    
    const handleInputChange = (index: number, value: string) => {
        setInputTexts(prev => ({ ...prev, [`text_${index}`]: value }));
    };

    const generateMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 

        const filledInputs = Object.values(inputTexts).filter(text => text.trim() !== '');

        const boxesParams = filledInputs.map((text, index) => `boxes[${index}][text]=${encodeURIComponent(text)}`).join('&');

        const apiUrl = `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=umarprogrammer19&password=Ugsofficial190807&${boxesParams}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.success) {
                setGeneratedMemeImage(data.data.url);
                setInputTexts({});
            } else {
                alert('Error generating meme: ' + data.error_message);
            }
        } catch (error) {
            alert('Error generating meme: ' + (error as Error).message);
        }
    };

    const gettingNumberOfInput = (): JSX.Element[] => {
        const inputs: JSX.Element[] = [];
        for (let i = 0; i < searchParams.box_count; i++) {
            inputs.push(
                <input
                    type="text"
                    key={i}
                    placeholder={`Enter Text ${i + 1}`}
                    value={inputTexts[`text_${i}`] || ''}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                />
            );
        }
        return inputs;
    };

    return (
        <>
            <div>Create Meme</div>
            <Image src={searchParams.url} alt='Meme' width={200} height={200} />
            <form onSubmit={generateMeme}>
                {gettingNumberOfInput()}
                <button type='submit'>Generate</button>
            </form>

            {generatedMemeImage && <Image src={generatedMemeImage} alt='Generated Meme' width={200} height={200} style={{ width: '100%', height: 'auto' }}  />}
        </>
    );
};

export default CreateMeme;
