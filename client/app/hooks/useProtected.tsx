import { redirect } from "next/navigation";
import useUserAuth from "./userAuth";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function useProtected({children}: ProtectedProps) {
    const isAuthenticated = useUserAuth();

    return isAuthenticated ? children : redirect('/');
}