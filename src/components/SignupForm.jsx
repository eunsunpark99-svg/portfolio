import { useState } from 'react'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptAllTerms, setAcceptAllTerms] = useState(false)
  const [terms, setTerms] = useState({
    privacy: false,
    service: false,
    marketing: false,
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [inquiryType, setInquiryType] = useState('product')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const validatePhone = (value) => {
    return /^01[016789]-?\d{3,4}-?\d{4}$/.test(value)
  }

  const handleTermsChange = (field, checked) => {
    setTerms((current) => {
      const nextTerms = { ...current, [field]: checked }
      setAcceptAllTerms(nextTerms.privacy && nextTerms.service && nextTerms.marketing)
      return nextTerms
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!name.trim()) {
      nextErrors.name = '이름을 입력해주세요.'
    }

    if (!email.trim()) {
      nextErrors.email = '이메일을 입력해주세요.'
    } else if (!validateEmail(email.trim())) {
      nextErrors.email = '유효한 이메일 주소를 입력해주세요.'
    }

    if (!phone.trim()) {
      nextErrors.phone = '전화번호를 입력해주세요.'
    } else if (!validatePhone(phone.trim())) {
      nextErrors.phone = '유효한 전화번호를 입력해주세요. 예: 010-1234-5678'
    }

    if (!password.trim()) {
      nextErrors.password = '비밀번호를 입력해주세요.'
    } else if (password.trim().length < 8) {
      nextErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
    } else if (password.trim() !== confirmPassword.trim()) {
      nextErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    if (!terms.privacy || !terms.service) {
      nextErrors.terms = '필수 약관에 모두 동의해주세요.'
    }

    if (paymentMethod.trim() === '') {
      nextErrors.paymentMethod = '결제 수단을 선택해주세요.'
    }

    if (inquiryType.trim() === '') {
      nextErrors.inquiryType = '문의 유형을 선택해주세요.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setSubmittedData({
        name,
        email,
        phone,
        paymentMethod,
        inquiryType,
        terms,
      })
    } else {
      setSubmitted(false)
      setSubmittedData(null)
    }
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
    setConfirmPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
    setAcceptAllTerms(false)
    setTerms({ privacy: false, service: false, marketing: false })
    setPaymentMethod('card')
    setInquiryType('product')
    setErrors({})
    setSubmitted(false)
    setSubmittedData(null)
  }

  return (
    <section className="signup-section" aria-labelledby="signup-title">
      <div className="section-heading">
        <p className="eyebrow">Signup</p>
        <h2 id="signup-title">회원 가입</h2>
      </div>
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="field-label" htmlFor="signup-name">
            이름
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setErrors((current) => ({ ...current, name: '' }))
            }}
            placeholder="이름을 입력하세요"
            className={`field-input ${errors.name ? 'has-error' : ''}`}
          />
          <p className="field-counter">{name.length}자 입력됨</p>
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="signup-email">
            이메일
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setErrors((current) => ({ ...current, email: '' }))
            }}
            placeholder="example@domain.com"
            className={`field-input ${errors.email ? 'has-error' : ''}`}
          />
          <p className="field-counter">{email.length}자 입력됨</p>
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="signup-phone">
            전화번호
          </label>
          <input
            id="signup-phone"
            type="tel"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              setErrors((current) => ({ ...current, phone: '' }))
            }}
            placeholder="010-1234-5678"
            className={`field-input ${errors.phone ? 'has-error' : ''}`}
          />
          <p className="field-counter">{phone.length}자 입력됨</p>
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="signup-password">
            비밀번호
          </label>
          <div className="password-field-group">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setErrors((current) => ({ ...current, password: '' }))
              }}
              placeholder="비밀번호를 입력하세요"
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

        <div className="form-field">
          <label className="field-label" htmlFor="signup-confirm-password">
            비밀번호 확인
          </label>
          <div className="password-field-group">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value)
                setErrors((current) => ({ ...current, confirmPassword: '' }))
              }}
              placeholder="비밀번호를 다시 입력하세요"
              className={`field-input ${errors.confirmPassword ? 'has-error' : ''}`}
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowConfirmPassword((current) => !current)}
            >
              {showConfirmPassword ? '숨기기' : '보기'}
            </button>
          </div>
          <p className="field-counter">{confirmPassword.length}자 입력됨</p>
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="form-field checkbox-group">
          <label className="field-label">
            <input
              type="checkbox"
              checked={acceptAllTerms}
              onChange={(event) => {
                const checked = event.target.checked
                setAcceptAllTerms(checked)
                setTerms({
                  privacy: checked,
                  service: checked,
                  marketing: checked,
                })
                setErrors((current) => ({ ...current, terms: '' }))
              }}
            />
            모두 동의합니다.
          </label>
        </div>

        <div className="form-field checkbox-group">
          <label className="field-label">
            <input
              type="checkbox"
              checked={terms.privacy}
              onChange={(event) => {
                handleTermsChange('privacy', event.target.checked)
                setErrors((current) => ({ ...current, terms: '' }))
              }}
            />
            개인정보 수집 및 이용 동의 (필수)
          </label>
          <label className="field-label">
            <input
              type="checkbox"
              checked={terms.service}
              onChange={(event) => {
                handleTermsChange('service', event.target.checked)
                setErrors((current) => ({ ...current, terms: '' }))
              }}
            />
            서비스 이용 약관 동의 (필수)
          </label>
          <label className="field-label">
            <input
              type="checkbox"
              checked={terms.marketing}
              onChange={(event) => {
                handleTermsChange('marketing', event.target.checked)
                setErrors((current) => ({ ...current, terms: '' }))
              }}
            />
            마케팅 정보 수신 동의 (선택)
          </label>
          {errors.terms && <p className="form-error">{errors.terms}</p>}
        </div>

        <div className="form-field">
          <p className="field-label">결제 수단</p>
          <label className="field-label radio-label">
            <input
              type="radio"
              name="payment-method"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(event) => {
                setPaymentMethod(event.target.value)
                setErrors((current) => ({ ...current, paymentMethod: '' }))
              }}
            />
            신용카드
          </label>
          <label className="field-label radio-label">
            <input
              type="radio"
              name="payment-method"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(event) => {
                setPaymentMethod(event.target.value)
                setErrors((current) => ({ ...current, paymentMethod: '' }))
              }}
            />
            계좌이체
          </label>
          <label className="field-label radio-label">
            <input
              type="radio"
              name="payment-method"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={(event) => {
                setPaymentMethod(event.target.value)
                setErrors((current) => ({ ...current, paymentMethod: '' }))
              }}
            />
            휴대폰 결제
          </label>
          {errors.paymentMethod && <p className="form-error">{errors.paymentMethod}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="signup-inquiry-type">
            문의 유형
          </label>
          <select
            id="signup-inquiry-type"
            value={inquiryType}
            onChange={(event) => {
              setInquiryType(event.target.value)
              setErrors((current) => ({ ...current, inquiryType: '' }))
            }}
            className="field-input"
          >
            <option value="product">제품 문의</option>
            <option value="order">주문/배송 문의</option>
            <option value="refund">환불/취소 문의</option>
            <option value="other">기타 문의</option>
          </select>
          {errors.inquiryType && <p className="form-error">{errors.inquiryType}</p>}
        </div>

        <div className="form-actions">
          <button type="button" className="form-reset-button" onClick={handleReset}>
            초기화
          </button>
          <button type="submit" className="signup-submit">
            회원가입
          </button>
        </div>

        {submitted && submittedData && (
          <div className="form-success">
            <p>회원가입 요청이 정상적으로 제출되었습니다.</p>
            <p>선택한 결제 수단: {submittedData.paymentMethod === 'card' ? '신용카드' : submittedData.paymentMethod === 'bank' ? '계좌이체' : '휴대폰 결제'}</p>
            <p>문의 유형: {submittedData.inquiryType === 'product' ? '제품 문의' : submittedData.inquiryType === 'order' ? '주문/배송 문의' : submittedData.inquiryType === 'refund' ? '환불/취소 문의' : '기타 문의'}</p>
          </div>
        )}
      </form>
    </section>
  )
}
