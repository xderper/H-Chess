import LoginForm from '@/components/LoginForm'

export default function AdminLoginPage() {
  return <LoginForm role="admin" redirectPath="/admin/dashboard" />
}