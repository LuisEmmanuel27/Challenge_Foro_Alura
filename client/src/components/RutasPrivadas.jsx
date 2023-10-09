import { Navigate } from 'react-router-dom';

const RutasPrivadas = ({ children }) => {

    const token = localStorage.getItem('userData');

    if (token) return children;
    else return <Navigate to="/" />;
}

export default RutasPrivadas