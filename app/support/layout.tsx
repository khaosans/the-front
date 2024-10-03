import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support | QuantumLabs',
  description: 'Get support for QuantumLabs',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}