import React from 'react';

const Temp = () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmb3JvIGFsdXJhIGx1aXMiLCJzdWIiOiJtYXJpYSIsImlkIjo4LCJleHAiOjE2OTY2MzU2Mzh9.QUdI04o2RFE_JOlK8VMc0tblj2vpJ6ZiRDlUsy8FcFI';

    return (
        <div>
            <h1>prueba</h1>

            <button
                onClick={() => {
                    fetch('http://localhost:8080/topicos?sort=fecha', {
                        method: 'GET', // Puedes cambiar el método según tus necesidades
                        headers: {
                            'Authorization': `${authToken}`,
                            'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido si es necesario
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then((data) => {
                            console.log(data);
                        })
                        .catch((error) => {
                            console.error('Fetch error:', error);
                        });
                }}
            >
                fetch
            </button>
        </div>
    );
};

export default Temp;

