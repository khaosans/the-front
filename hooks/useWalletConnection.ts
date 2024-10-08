import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: {
      isRabby?: boolean;
      isMetaMask?: boolean;
      providers?: any[];
    };
  }
}

const useWalletConnection = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [walletBalance, setWalletBalance] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [isWalletInfoModalOpen, setIsWalletInfoModalOpen] = useState(false)

  useEffect(() => {
    if (isWalletConnected && provider) {
      const fetchAddress = async () => {
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setWalletAddress(address)
      }
      fetchAddress()
    }
  }, [isWalletConnected, provider])

  const connectWallet = async (walletType: 'rabby' | 'metamask') => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        let ethereum
        if (walletType === 'rabby') {
          ethereum = window.ethereum.isRabby ? window.ethereum : window.ethereum.providers?.find((p: any) => p.isRabby)
        } else if (walletType === 'metamask') {
          ethereum = window.ethereum.isMetaMask ? window.ethereum : window.ethereum.providers?.find((p: any) => p.isMetaMask)
        }

        if (!ethereum) {
          alert(`${walletType === 'rabby' ? 'Rabby' : 'MetaMask'} not found. Please install it.`)
          return
        }

        await ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(ethereum)
        setProvider(provider)
        setIsWalletConnected(true)

        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setWalletAddress(address)

        const balance = await provider.getBalance(address)
        setWalletBalance(ethers.utils.formatEther(balance))

        setIsWalletInfoModalOpen(true)
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    } else {
      alert('Please install MetaMask or Rabby!')
    }
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress('')
    setWalletBalance('')
    setProvider(null)
    setIsWalletInfoModalOpen(false)
  }

  return {
    isWalletConnected,
    walletAddress,
    walletBalance,
    connectWallet,
    disconnectWallet,
    isWalletInfoModalOpen,
    setIsWalletInfoModalOpen
  }
}

export default useWalletConnection