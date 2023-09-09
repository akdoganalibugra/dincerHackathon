interface ErrorLayoutProps {
    children: React.ReactNode
}

export default function ErrorLayout({ children }: ErrorLayoutProps) {
    return <div className="min-h-screen">{children}</div>
}