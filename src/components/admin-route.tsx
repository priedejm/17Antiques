import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../context/auth-context";

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};