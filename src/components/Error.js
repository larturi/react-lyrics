import React from 'react';

export const Error = ({ mensaje }) => {
    return (
        <p className="alert alert-danger text-center p-2">
            { mensaje }
        </p>
    )
}
