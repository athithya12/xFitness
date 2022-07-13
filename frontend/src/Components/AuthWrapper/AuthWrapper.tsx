import { useAuth0 } from "@auth0/auth0-react";
import { Box, Center, Loader } from "@mantine/core";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <Box sx={{ height: "100vh" }}>
        <Center sx={{ height: "100%" }}>
          <Loader />
        </Center>
      </Box>
    );
  }

  return <>{isAuthenticated && children}</>;
};

export default AuthWrapper;
