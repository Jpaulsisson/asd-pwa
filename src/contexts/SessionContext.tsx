import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { AuthProvider as OidcAuthProvider, useAuth } from "react-oidc-context";

type SessionContextType = {
    isLoading: boolean;
    error: Error | string | null;
    isAuthenticated: boolean;
    signInOrUp: () => Promise<void>;
    user: User | null | undefined;
};

type SessionProviderProps = {
    children: ReactNode;
};

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_5gGDrWgdT",
    client_id: "36rqghudd77hg8su6tmrgtf2pa",
    redirect_uri: "http://localhost:5173",
    response_type: "code",
    scope: "email openid phone",
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const userManager = new UserManager(cognitoAuthConfig);

const SessionContext = createContext<SessionContextType | null>(null);

const SessionProviderInternal = ({ children }: SessionProviderProps) => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null | undefined>(null);

    const signInOrUp = () => {
        return auth.signinRedirect();
    };

    useEffect(() => {
        setIsLoading(auth.isLoading);
        setIsAuthenticated(auth.isAuthenticated);
        setUser(auth.user);
        setError(auth.error || null);

        if (!auth.isLoading) {
            setIsLoading(false);
        }
    }, [auth.isLoading, auth.isAuthenticated, auth.user, auth.error]);

    return (
        <SessionContext.Provider value={{ isLoading, error, isAuthenticated, user, signInOrUp }}>
            {children}
        </SessionContext.Provider>
    );
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
    return (
        <OidcAuthProvider userManager={userManager}>
            <SessionProviderInternal>{children}</SessionProviderInternal>
        </OidcAuthProvider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};