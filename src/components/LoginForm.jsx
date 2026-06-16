import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!email.trim()) {
      nextErrors.email = '이메일을 입력해주세요.'
    } else if (!validateEmail(email.trim())) {
      nextErrors.email = '유효한 이메일 주소를 입력해주세요.'
    }

    if (!password.trim()) {
      nextErrors.password = '비밀번호를 입력해주세요.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    } else {
      setSubmitted(false)
    }
  }

  const handleReset = () => {
    setEmail('')
    setPassword('')
    setShowPassword(false)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section className="login-section" aria-labelledby="login-title">
      <div className="section-heading">
        <p className="eyebrow">Login</p>
        <h2 id="login-title">회원 로그인을 해보세요</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="field-label" htmlFor="login-email">
            이메일
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setErrors((current) => ({ ...current, email: '' }))
            }}
            placeholder="example@domain.com"
            className={`field-input ${errors.email ? 'has-error' : ''}`}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="login-password">
            비밀번호
          </label>
          <div className="password-field-group">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setErrors((current) => ({ ...current, password: '' }))
              }}
              placeholder="비밀번호를 입력해주세요"
              className={`field-input ${errors.password ? 'has-error' : ''}`}
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          </div>
          <p className="field-counter">{password.length}자 입력됨</p>
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <div className="form-actions">
          <button type="button" className="form-reset-button" onClick={handleReset}>
            초기화
          </button>
          <button type="submit" className="login-submit">
            로그인
          </button>
        </div>

        {submitted && (
          <p className="form-success">로그인 요청이 정상적으로 제출되었습니다.</p>
        )}
      </form>
    </section>
  )
}
