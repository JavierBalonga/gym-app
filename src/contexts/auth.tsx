import React from 'react';
import env from '@/env';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID } = env;

export interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export const useAuth = () => {
  return useAuth0();
};
