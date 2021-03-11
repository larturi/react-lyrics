import React from 'react';

export const Lyric = ({ lyric }) => {

    if (lyric.length === 0) {
        return null;
    }

    return (
        <>
            <h2>Letra</h2>
            <p className="letra">{lyric}</p>
        </>
    )
}
