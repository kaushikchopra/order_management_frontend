import { useSelector } from 'react-redux'
import { selectAccessToken } from '../redux/slices/authSlice'
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectAccessToken);

    let isAdmin = false;

    if (token) {
        const decoded = jwtDecode(token);
        // console.log(decoded);

        const { fullName, role } = decoded;

        if (role === "admin") {
            isAdmin = true;
        }

        return { fullName, role, isAdmin };
    }

    return { fullName: "", role: "", isAdmin };
}

export default useAuth