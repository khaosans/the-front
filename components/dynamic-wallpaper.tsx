"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DynamicWallpaperProps {
  circuitCount?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function DynamicWallpaper({ 
  circuitCount = 30, 
  primaryColor = 'blue', 
  secondaryColor = 'gray' 
}: DynamicWallpaperProps) {
  const [circuits, setCircuits] = useState([])

  useEffect(() => {
    const newCircuits = Array.from({ length: circuitCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      length: Math.random() * 150 + 50,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setCircuits(newCircuits)
  }, [circuitCount])

  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden bg-${secondaryColor}-950`}>
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-${secondaryColor}-900 via-${secondaryColor}-950 to-black opacity-70`} />
      {circuits.map((circuit, index) => (
        <motion.div
          key={index}
          className={`absolute bg-${primaryColor}-500 rounded-full`}
          style={{
            width: '1px',
            height: `${circuit.length}px`,
            left: `${circuit.x}%`,
            top: `${circuit.y}%`,
            rotate: `${circuit.rotation}deg`,
            opacity: circuit.opacity,
          }}
          animate={{
            opacity: [circuit.opacity, circuit.opacity * 1.5, circuit.opacity],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}