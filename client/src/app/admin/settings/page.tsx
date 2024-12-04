'use client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST'
            })

            if (response.ok) {
                router.push('/login/admin')
            }
        } catch (error) {
            console.error('Logout error:', error)
        }
    }
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}