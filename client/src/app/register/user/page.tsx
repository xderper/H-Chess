'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Проверка паролей
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const response = await fetch('/api/register/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: formData.login,
                    password: formData.password
                }),
            })

            const data = await response.json()

            if (response.ok) {
                router.push('/login/user') // Перенаправление на страницу логина после успешной регистрации
            } else {
                setError(data.error || 'Registration failed')
            }
        } catch (error) {
            setError('An unexpected error occurred')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Register New Account</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">Login</label>
                    <input
                        type="text"
                        value={formData.login}
                        onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                        className="block w-full p-2 border rounded text-black"
                        minLength={3}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="block w-full p-2 border rounded text-black"
                        minLength={6}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="block w-full p-2 border rounded text-black"
                        minLength={6}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>

                <div className="text-center mt-4">
                    <Link
                        href="/login/user"
                        className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    )
}