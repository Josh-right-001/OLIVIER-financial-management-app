import Image from "next/image"

interface LogoProps {
  variant?: "transparent" | "background"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Logo({ variant = "transparent", size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  const src = variant === "transparent" ? "/logo-transparent.png" : "/logo.jpg"

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt="Aksanti OLIVIER - Financial Management and Consultancy"
        width={200}
        height={200}
        className={`${sizeClasses[size]} object-contain rounded-full`}
        priority
      />
    </div>
  )
}
