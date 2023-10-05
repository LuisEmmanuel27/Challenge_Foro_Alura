import { useNavigate } from 'react-router-dom';

const RutasPrivadas = ({ children }) => {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');

    if (!token) {
        navigate("/login");
        return null;
    }

    return children;
}

export default RutasPrivadas