import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import { AuthWrapper } from "Components";
import { apolloClient } from "Configs";
import {
  CookbookPage,
  DashboardPage,
  HomePage,
  IngredientsPage,
} from "Pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Auth0Provider
      domain='avidyarth12.us.auth0.com'
      clientId='fVUgi8CmOxlrP0PsLWqrV0r8rSnfTblX'
      redirectUri={window.location.origin}
      audience='https://avidyarth12.us.auth0.com/api/v2/'
      scope='create:user'
    >
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <AuthWrapper>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/ingredients' element={<IngredientsPage />} />
                <Route path='/cookbook' element={<CookbookPage />} />
              </Routes>
            </AuthWrapper>
          </BrowserRouter>
        </ApolloProvider>
      </MantineProvider>
    </Auth0Provider>
  );
};

export default App;