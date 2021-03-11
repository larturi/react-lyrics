import React, { useState, useEffect } from 'react';
import { Formulario } from './components/Formulario';

import axios from 'axios';
import { Lyric } from './components/Lyric';
import { Artista } from './components/Artista';
import { Spinner } from './components/Spinner/Spinner';
import { Error } from './components/Error';

function App() {

  const [busquedaletra, setBusquedaLetra] = useState({});
  const [lyric, setLyric] = useState('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarApi = async () => {
      if (Object.keys(busquedaletra).length === 0) return;

      const url_letra = `https://api.lyrics.ovh/v1/${busquedaletra.artista}/${busquedaletra.cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busquedaletra.artista}`;

      try {
        const [{ data: { lyrics } }, { data: { artists } }] = await Promise.all([
          axios.get(url_letra), 
          axios.get(url_info)
        ]);

        setError(false);
        setLoading(false);

        setLyric(lyrics)
        setInfo(artists[0])
        
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }

    }

    consultarApi();
  }, [busquedaletra])

  return (
    <>
      <Formulario 
        setBusquedaLetra={setBusquedaLetra}
        setLoading ={setLoading}
      />

      <div className="container mt-5">

        { (loading) ? <Spinner /> : null }

        { (error) ?  <Error mensaje="Error Interno, por favor intente mas tarde o la cancion que busca no existe" /> : null }

        <div className="row">
          <div className="col-md-6">
            <Artista info={info} />
          </div>

          <div className="col-md-6">
            <Lyric lyric={lyric}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
