const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
})

const thumbnailByType = {
  image: {
    src: '/images/gallery-feature.jpg',
    alt: 'Image product thumbnail.',
  },
  video: {
    src: '/images/video-feature.jpg',
    alt: 'Video product thumbnail.',
  },
  site: {
    src: '/images/about-feature.jpg',
    alt: 'Site product thumbnail.',
  },
}

export default function ProductCard({ product, selectedTag, onTagClick, onFavoriteToggle, onLikeToggle, onAddToCart }) {
  const thumbnail = product.thumbnail
    ? { src: product.thumbnail, alt: product.alt }
    : thumbnailByType[product.type]

  return (
    <article className="product-card">
      {thumbnail ? (
        <img
          className="product-thumbnail"
          src={thumbnail.src}
          alt={thumbnail.alt}
        />
      ) : (
        <div className="product-thumbnail product-thumbnail-placeholder">
          {product.category}
        </div>
      )}

      <div className="product-card-body">
        <div className="product-card-header">
          <p className="product-type">{product.type}</p>
          <div className="product-card-controls">
            <div
              className={`product-favorite-toggle ${product.favorite ? 'is-favorite' : ''}`}
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation()
                onFavoriteToggle(product.id)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                  onFavoriteToggle(product.id)
                }
              }}
              aria-pressed={product.favorite}
              aria-label={product.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            >
              {product.favorite ? '★' : '☆'}
            </div>
            <div
              className={`product-like-toggle ${product.liked ? 'is-liked' : ''}`}
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation()
                onLikeToggle(product.id)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                  onLikeToggle(product.id)
                }
              }}
              aria-pressed={product.liked}
              aria-label={product.liked ? '좋아요 취소' : '좋아요'}
            >
              {product.liked ? '♥' : '♡'}
            </div>
          </div>
        </div>
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <ul className="product-tags" aria-label={`${product.title} tags`}>
          {product.tags.map((tag) => (
            <li key={tag}>
              <button
                className={`product-tag-button ${
                  selectedTag === tag ? 'is-active' : ''
                }`}
                type="button"
                aria-pressed={selectedTag === tag}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
        <strong className="product-price">
          {currencyFormatter.format(product.price)}
        </strong>
        <button
          type="button"
          className="product-cart-button"
          onClick={(event) => {
            event.stopPropagation()
            onAddToCart(product)
          }}
        >
          장바구니 담기
        </button>
      </div>
    </article>
  )
}
