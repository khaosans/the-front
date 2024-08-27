import React from 'react';
import Header from '@/components/Header';
import styles from './AuthenticatedLayout.module.css';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
