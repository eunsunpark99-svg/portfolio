import { useEffect, useState } from 'react'

const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
})

export default function ProductDetailModal({ product, onClose, onDelete, onSaveReview, onDeleteReview, onUpdateProduct }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editTitle, setEditTitle] = useState(product?.title || '')
  const [editDescription, setEditDescription] = useState(product?.description || '')
  const [editPrice, setEditPrice] = useState(product?.price || '')
  const [editCategory, setEditCategory] = useState(product?.category || '')

  useEffect(() => {
    if (!product) {
      return undefined
    }

    setEditTitle(product.title || '')
    setEditDescription(product.description || '')
    setEditPrice(product.price || '')
    setEditCategory(product.category || '')

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [product, onClose])

  if (!product) {
    return null
  }

  const averageRating = product.reviews?.length
    ? product.reviews.reduce((total, item) => total + item.rating, 0) / product.reviews.length
    : null

  const handleReviewSubmit = (event) => {
    event.preventDefault()
    if (rating === 0) {
      setReviewError('별점을 선택해주세요.')
      setReviewSuccess(false)
      return
    }

    if (!comment.trim()) {
      setReviewError('리뷰 내용을 입력해주세요.')
      setReviewSuccess(false)
      return
    }

    const review = {
      rating,
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString(),
    }

    onSaveReview(product.id, review)
    setRating(0)
    setComment('')
    setReviewError('')
    setReviewSuccess(true)
  }

  const getStarLabel = (value) => `${value}점`

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-type">{product.type}</p>
            <h3>{product.title}</h3>
            {product.subtitle && <p className="modal-subtitle">{product.subtitle}</p>}
          </div>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="상세 모달 닫기"
          >
            ✕
          </button>
        </div>

        {product.type === 'video' && product.videoSrc ? (
          <video
            className="modal-video"
            controls
            poster={product.thumbnail}
            playsInline
          >
            <source src={product.videoSrc} type="video/mp4" />
            현재 브라우저는 video 태그를 지원하지 않습니다.
          </video>
        ) : product.type === 'site' ? (
          <div className="modal-site-preview">
            <iframe
              className="modal-iframe"
              title={product.title}
              src={product.sitePreviewSrc || product.href}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ) : (
          product.thumbnail && (
            <a
              className="modal-thumbnail-link"
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={`modal-thumbnail ${product.type === 'image' ? 'modal-thumbnail--large' : ''}`}
                src={product.thumbnail}
                alt={product.alt}
              />
            </a>
          )
        )}

        <div className="modal-content">
          <p className="modal-description">{product.description}</p>
          <dl className="modal-details">
            <div>
              <dt>카테고리</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>가격</dt>
              <dd>{currencyFormatter.format(product.price)}</dd>
            </div>
            {product.createdAt && (
              <div>
                <dt>등록일</dt>
                <dd>{product.createdAt}</dd>
              </div>
            )}
            {product.popularity !== undefined && (
              <div>
                <dt>인기</dt>
                <dd>{product.popularity}점</dd>
              </div>
            )}
          </dl>

          {product.tags?.length > 0 && (
            <div className="modal-tags" aria-label="상품 태그">
              {product.tags.map((tag) => (
                <span key={tag} className="modal-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {editMode ? (
            <form className="modal-edit-form" onSubmit={(event) => {
              event.preventDefault()
              const updated = {
                title: editTitle,
                description: editDescription,
                price: Number(editPrice) || 0,
                category: editCategory,
              }
              onUpdateProduct(product.id, updated)
              setEditMode(false)
            }}>
              <div className="form-field">
                <label className="field-label" htmlFor="edit-title">
                  상품 제목
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  className="field-input"
                />
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="edit-description">
                  상품 설명
                </label>
                <textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                  className="field-input"
                  rows="3"
                />
              </div>
              <div className="form-field edit-row">
                <label className="field-label" htmlFor="edit-price">
                  가격
                </label>
                <input
                  id="edit-price"
                  type="number"
                  min="0"
                  value={editPrice}
                  onChange={(event) => setEditPrice(event.target.value)}
                  className="field-input"
                />
              </div>
              <div className="form-field edit-row">
                <label className="field-label" htmlFor="edit-category">
                  카테고리
                </label>
                <input
                  id="edit-category"
                  type="text"
                  value={editCategory}
                  onChange={(event) => setEditCategory(event.target.value)}
                  className="field-input"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="modal-submit-review">
                  저장
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="modal-review-summary">
                <div>
                  <p className="modal-review-title">고객 리뷰</p>
                  <p className="modal-review-description">
                    지금 바로 별점과 리뷰를 남겨보세요.
                  </p>
                </div>
                {averageRating !== null && (
                  <strong className="modal-review-average">
                    평균 {averageRating.toFixed(1)} / 5 ({product.reviews.length}개)
                  </strong>
                )}
              </div>

              <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="review-stars" aria-label="별점 선택">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`review-star ${rating >= value ? 'selected' : ''}`}
                  onClick={() => {
                    setRating(value)
                    setReviewError('')
                  }}
                  aria-label={getStarLabel(value)}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="review-comment"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value)
                setReviewError('')
              }}
              placeholder="상품에 대한 소감을 입력해주세요."
              rows="4"
            />
            {reviewError && <p className="form-error">{reviewError}</p>}
            {reviewSuccess && (
              <p className="form-success">리뷰가 등록되었습니다.</p>
            )}
            <button type="submit" className="modal-submit-review">
              리뷰 등록
            </button>
          </form>

          {product.reviews?.length > 0 && (
            <div className="review-list">
              {product.reviews.map((review) => (
                <article key={review.id} className="review-item">
                  <div className="review-item-header">
                    <span className="review-item-stars">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                    <span className="review-item-date">{review.createdAt}</span>
                  </div>
                  <p className="review-item-comment">{review.comment}</p>
                  <button
                    type="button"
                    className="review-delete-button"
                    onClick={() => onDeleteReview(product.id, review.id)}
                  >
                    삭제
                  </button>
                </article>
              ))}
            </div>
          )}

          <div className="modal-actions">
            <a
              className="modal-link"
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              원본 보기
            </a>
            <button
              type="button"
              className="modal-link"
              onClick={() => setEditMode((current) => !current)}
            >
              {editMode ? '편집 취소' : '상품 수정'}
            </button>
            <button
              type="button"
              className="modal-delete-button"
              onClick={onDelete}
            >
              삭제
            </button>
            <button
              type="button"
              className="modal-close-action"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </>)}
          </div>
        </div>
      </div>
   
  )
}
