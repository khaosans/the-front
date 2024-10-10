import React from 'react';

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    // Add authentication logic here
    return <Component {...props} />;
  };
};

export default withAuth;