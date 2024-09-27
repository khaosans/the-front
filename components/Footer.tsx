import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2023 Your App Name. All rights reserved.</p>
          </div>
          <div>
            <Link href="/privacy" className="mr-4 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer