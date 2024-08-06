"use client"

import { useEffect, useRef, useState } from 'react';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from "ai";
import { prompt } from "@/consts/prompt.json";
import useLoader from "@/comps/useLoader";
import useAlert from "@/comps/useAlert";
import useSpotify from "@/comps/useSpotify"

const openai = createOpenAI({apiKey : process.env.NEXT_PUBLIC_OPENAI_API_KEY});
const model = openai("gpt-4-turbo");

export default function Home() {

  const [Loader, setIsLoad] = useLoader();
  const [Alert, trigger] = useAlert();
  const go = useSpotify();

  const THEAD = () =>
  <thead>
    <tr>
      <td>N°</td>
      <td>Año</td>
      <td>Canción</td>
      <td>Artista</td>
      <td>Álbum</td>
    </tr>
  </thead>

  const Row = ({ index, year, song, artist, album }) =>
  <tr onClick={() => {go(song)}}>
    <th>{index}</th>
    <th>{year}</th>
    <th>{song}</th>
    <th>{artist}</th>
    <th>{album}</th>
  </tr>;

  const [stats, setStats] = useState([]);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const TBODY = () => <tbody>{
    stats
    .map(({year, song, artist, album}, i)=>
    <Row key={i+"row"} index={i+1} year={year} song={song} artist={artist} album={album}/>)
  }</tbody>

  const generar = async(e) =>
  {
    try
    {
      const userPrompt = inputRef.current.value;
      if(userPrompt)
      {
        buttonRef.current.disabled = true;
        setIsLoad(false);
        const { text } = await generateText({
          model: model,
          prompt: prompt + 'Tema: ' + userPrompt,
        });

        console.log(text, userPrompt)

        const inicio = text.indexOf('[');
        const fin = text.lastIndexOf(']');
        
        if (inicio === -1 || fin === -1) {
          console.log(text)
          if(text.includes("false"))
          {
            throw new Error("Prompt sin sentido musical")
          }
          else
          {
            throw new Error('No se encontró un JSON válido en el texto proporcionado.');
          }
        }
      
        const jsonExtracted = text.substring(inicio, fin + 1);

        const rows = JSON.parse(jsonExtracted);
        setStats(rows);
        buttonRef.current.disabled = false;
        setIsLoad(true);
      }
      else
      {
        inputRef.current.value = 'Quiero las canciones más alegres de 1983';
        generar();
      }
    }
    catch(err)
    {
      if(err.message.includes("Prompt sin sentido musical"))
      {
        trigger("Debes escribir algo relacionado con un ranking musical");
      }
      else
      {
        trigger();
        console.error(err)
      }
      buttonRef.current.disabled = false;
      setIsLoad(true);
      console.error(err);
    }
  }

  useEffect(() => {
    const eventHandler = () => { setIsLoad(true) }
    window.addEventListener('load', eventHandler)
    if(document.readyState === "complete") setIsLoad(true);
    return () => {
      window.removeEventListener('load', eventHandler)
    }
  },[])

  return <main>
    <section>
      <h1>Descubre rankings musicales</h1>
      <div>
        <div>
          <h2>¿Con qué listados te gustaría experimentar?</h2>
          <div>
            <input type='text' placeholder='Quiero las canciones más alegres de 1983' ref={inputRef}/>
            <button onClick={generar} ref={buttonRef}>Generar</button> 
          </div>
        </div>
        <table>
          <THEAD/>
          <TBODY/>
        </table>
      </div>
      <Alert/>
    </section>
    <Loader/> 
  </main>
}