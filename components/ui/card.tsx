import React from 'react'

export const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-4 py-5 sm:px-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className={`text-lg leading-6 font-medium text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`mt-1 max-w-2xl text-sm text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  )
}

export const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-4 py-4 sm:px-6 ${className}`} {...props}>
      {children}
    </div>
  )
}
