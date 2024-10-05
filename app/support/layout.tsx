import { Metadata } from 'next';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'; // Ensure this path is correct

export const metadata: Metadata = {
  title: 'Support | QuantumLabs',
  description: 'Get support for QuantumLabs',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <RobotTransformerWallpaper /> {/* Add the wallpaper component */}
      {children}
    </>
  );
}