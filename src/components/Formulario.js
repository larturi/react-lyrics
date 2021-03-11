import React, { useState } from 'react';
import { Error } from './Error';

export const Formulario = ({ setBusquedaLetra, setLoading }) => {

    const [busqueda, setBusqueda] = useState({
        artista: '',
        cancion: ''
    });

    const [error, setError] = useState(false);

    const { artista, cancion } = busqueda;

    const actualizarState = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    };

    const buscarInformacion = e => {
        e.preventDefault();

        setLoading(true);

        
        if(artista.trim() === '' || cancion.trim() === '') {
            setError(true);
            setLoading(false);
            return;
        }

        setError(false);
        setBusquedaLetra(busqueda);
    };

    return (

        <div className="bg-info">
            
            { error ? <Error mensaje="Debe escribir nombre de cancion y artista" /> : null }
            
            <div className="container">
                <div className="row">
                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInformacion}
                    >

                        <fieldset>
                            <legend className="text-center">Buscador Canciones</legend>
                        
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista:</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre del artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción:</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre de la canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>

                        </fieldset>

                    </form>
                </div>
            </div>
        </div>

    )
}
