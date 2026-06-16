import LoginForm from '../components/LoginForm.jsx'
import SignupForm from '../components/SignupForm.jsx'

export default function AuthPage() {
  return (
    <section className="auth-shell">
      <div className="auth-layout">
        <div className="auth-card">
          <LoginForm />
        </div>
        <div className="auth-card">
          <SignupForm />
        </div>
      </div>
    </section>
  )
}
