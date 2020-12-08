import React, {ReactNode} from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } from '../config/appConfig';

interface IProps {
    children: ReactNode
}

const Auth0ProviderWithHistory = ({ children }: IProps) => {
  const history = useHistory();
  const domain = REACT_APP_AUTH0_DOMAIN;
  const clientId = REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;