import { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import ProductDetailModal from './ProductDetailModal.jsx'
import { products } from '../data/products.js'

const categories = [
  { label: '전체', value: 'all' },
  { label: '이미지', value: 'image' },
  { label: '영상', value: 'video' },
  { label: '사이트', value: 'site' },
]

const sortOptions = [
  { label: '가격 낮은순', value: 'price-lowest' },
  { label: '가격 높은순', value: 'price-highest' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
]

const matchesSearchTerm = (product, searchTerm) => {
  const searchableText = `${product.title} ${product.description}`.toLowerCase()
  return searchableText.includes(searchTerm)
}

const matchesSelectedCategory = (product, category) => {
  return category === 'all' || product.type === category
}

const matchesSelectedTag = (product, tag) => {
  return !tag || product.tags.includes(tag)
}

const parsePrice = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const matchesPriceRange = (product, minPrice, maxPrice) => {
  if (minPrice !== null && product.price < minPrice) {
    return false
  }

  if (maxPrice !== null && product.price > maxPrice) {
    return false
  }

  return true
}

const sortProducts = (productList, sortOption) => {
  return [...productList].sort((a, b) => {
    if (sortOption === 'price-lowest') {
      return a.price - b.price
    }

    if (sortOption === 'price-highest') {
      return b.price - a.price
    }

    if (sortOption === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }

    if (sortOption === 'popular') {
      return b.popularity - a.popularity
    }

    return 0
  })
}

export default function ProductList() {
  const [productList, setProductList] = useState(products)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortOption, setSortOption] = useState('latest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [discountRate, setDiscountRate] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [recentViewed, setRecentViewed] = useState([])

  const storedKeys = {
    products: 'gallery_saved_products',
    cart: 'gallery_saved_cart',
    recentViewed: 'gallery_saved_recent_viewed',
  }

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(storedKeys.products)
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts)
        if (Array.isArray(parsed)) {
          const savedMap = new Map(parsed.map((item) => [item.id, item]))
          setProductList((current) =>
            current.map((product) => ({
              ...product,
              ...savedMap.get(product.id),
              favorite: savedMap.get(product.id)?.favorite ?? product.favorite,
              liked: savedMap.get(product.id)?.liked ?? product.liked,
              reviews: savedMap.get(product.id)?.reviews ?? product.reviews ?? [],
            })),
          )
        }
      }
    } catch (error) {
      console.error('저장된 상품 정보를 불러오는 중 오류가 발생했습니다.', error)
    }

    try {
      const savedCart = localStorage.getItem(storedKeys.cart)
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('저장된 장바구니 정보를 불러오는 중 오류가 발생했습니다.', error)
    }

    try {
      const savedRecent = localStorage.getItem(storedKeys.recentViewed)
      if (savedRecent) {
        setRecentViewed(JSON.parse(savedRecent))
      }
    } catch (error) {
      console.error('저장된 최근 본 상품 정보를 불러오는 중 오류가 발생했습니다.', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(storedKeys.products, JSON.stringify(productList))
    } catch (error) {
      console.error('상품 정보를 저장하는 중 오류가 발생했습니다.', error)
    }
  }, [productList])

  useEffect(() => {
    try {
      localStorage.setItem(storedKeys.cart, JSON.stringify(cart))
    } catch (error) {
      console.error('장바구니 정보를 저장하는 중 오류가 발생했습니다.', error)
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem(storedKeys.recentViewed, JSON.stringify(recentViewed))
    } catch (error) {
      console.error('최근 본 상품 정보를 저장하는 중 오류가 발생했습니다.', error)
    }
  }, [recentViewed])
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const parsedMinPrice = parsePrice(minPrice)
  const parsedMaxPrice = parsePrice(maxPrice)
  const filteredProducts = productList.filter(
    (product) =>
      matchesSearchTerm(product, normalizedSearchTerm) &&
      matchesSelectedCategory(product, selectedCategory) &&
      matchesSelectedTag(product, selectedTag) &&
      matchesPriceRange(product, parsedMinPrice, parsedMaxPrice),
  )
  const sortedProducts = sortProducts(filteredProducts, sortOption)

  const toggleTag = (tag) => {
    setSelectedTag((current) => (current === tag ? '' : tag))
  }

  const toggleFavorite = (productId) => {
    setProductList((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, favorite: !product.favorite }
          : product,
      ),
    )
  }

  const toggleLike = (productId) => {
    setProductList((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, liked: !product.liked }
          : product,
      ),
    )
  }

  const handleSaveReview = (productId, review) => {
    const reviewWithId = { ...review, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }

    setProductList((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, reviews: [...(product.reviews || []), reviewWithId] }
          : product,
      ),
    )

    setSelectedProduct((product) =>
      product && product.id === productId
        ? { ...product, reviews: [...(product.reviews || []), reviewWithId] }
        : product,
    )
  }

  const handleDeleteReview = (productId, reviewId) => {
    setProductList((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              reviews: (product.reviews || []).filter((review) => review.id !== reviewId),
            }
          : product,
      ),
    )

    setSelectedProduct((product) =>
      product && product.id === productId
        ? {
            ...product,
            reviews: (product.reviews || []).filter((review) => review.id !== reviewId),
          }
        : product,
    )
  }

  const handleUpdateProduct = (productId, updates) => {
    setProductList((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, ...updates }
          : product,
      ),
    )

    setSelectedProduct((product) =>
      product && product.id === productId
        ? { ...product, ...updates }
        : product,
    )

    setCart((current) =>
      current.map((item) =>
        item.product.id === productId
          ? { ...item, product: { ...item.product, ...updates } }
          : item,
      ),
    )

    setRecentViewed((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, ...updates } : item,
      ),
    )
  }

  const addToCart = (product) => {
    setCart((current) => {
      const existingItem = current.find((item) => item.product.id === product.id)
      if (existingItem) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { product, quantity: 1 }]
    })
  }

  const couponRates = {
    PARK10: 0.1,
    GALLERY15: 0.15,
    ARTEPES20: 0.2,
  }

  const applyCoupon = (event) => {
    event.preventDefault()
    const code = couponCode.trim().toUpperCase()
    const rate = couponRates[code]

    if (rate) {
      setDiscountRate(rate)
      setCouponMessage(`${Math.round(rate * 100)}% 할인 코드가 적용되었습니다.`)
    } else {
      setDiscountRate(0)
      setCouponMessage('유효하지 않은 쿠폰 코드입니다.')
    }
  }

  const updateCartQuantity = (productId, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeCartItem = (productId) => {
    setCart((current) => current.filter((item) => item.product.id !== productId))
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  const discountedTotal = Math.max(0, Math.round(cartTotal * (1 - discountRate)))

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedTag('')
    setMinPrice('')
    setMaxPrice('')
    setSortOption('latest')
  }

  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    if (!selectedProduct) {
      return
    }

    setRecentViewed((current) => {
      const next = [selectedProduct, ...current.filter((item) => item.id !== selectedProduct.id)]
      return next.slice(0, 5)
    })
  }, [selectedProduct])

  const deleteProduct = (productId) => {
    const confirmed = window.confirm('이 상품을 삭제하시겠습니까?')
    if (!confirmed) {
      return
    }

    setProductList((current) => current.filter((product) => product.id !== productId))
    setSelectedProduct(null)
  }

  return (
    <section className="product-section" aria-labelledby="products-title">
      <div className="section-heading">
        <p className="eyebrow">Products</p>
        <h2 id="products-title">미리보기 상품</h2>
      </div>

      <label className="product-search">
        <span>상품 검색</span>
        <input
          type="search"
          value={searchTerm}
          placeholder="상품 제목이나 설명을 입력하세요"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>

      <div className="price-filter" aria-label="가격 범위 필터">
        <label className="price-filter-field">
          <span>최소 가격</span>
          <input
            type="number"
            value={minPrice}
            min="0"
            placeholder="0"
            onChange={(event) => setMinPrice(event.target.value)}
          />
        </label>
        <label className="price-filter-field">
          <span>최대 가격</span>
          <input
            type="number"
            value={maxPrice}
            min="0"
            placeholder="999000"
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>
      </div>

      <div className="filter-toolbar">
        <label className="product-sort">
          <span>정렬</span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button className="filter-reset-button" type="button" onClick={resetFilters}>
          필터 초기화
        </button>
      </div>

      <div className="category-filter" aria-label="상품 카테고리">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`category-button ${
              selectedCategory === category.value ? 'is-active' : ''
            }`}
            type="button"
            aria-pressed={selectedCategory === category.value}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {selectedTag && (
        <button
          className="selected-tag-clear"
          type="button"
          onClick={() => setSelectedTag('')}
        >
          #{selectedTag} 필터 해제
        </button>
      )}

      {recentViewed.length > 0 && (
        <section className="recent-viewed-section" aria-labelledby="recent-viewed-title">
          <div className="section-heading">
            <p className="eyebrow">Recently viewed</p>
            <h3 id="recent-viewed-title">최근 본 상품</h3>
          </div>
          <ul className="recent-viewed-list">
            {recentViewed.map((item) => (
              <li key={item.id} className="recent-viewed-item">
                <button
                  type="button"
                  className="recent-viewed-button"
                  onClick={() => setSelectedProduct(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.alt}
                    className="recent-viewed-thumb"
                  />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="cart-section" aria-labelledby="cart-title">
        <div className="cart-section-header">
          <h3 id="cart-title">장바구니</h3>
          <span className="cart-summary">
            총 {cart.reduce((sum, item) => sum + item.quantity, 0)}개
          </span>
        </div>
        {cart.length === 0 ? (
          <p className="cart-empty">장바구니에 담긴 상품이 없습니다.</p>
        ) : (
          <>
            <form className="cart-coupon-form" onSubmit={applyCoupon}>
              <label className="cart-coupon-label" htmlFor="coupon-code">
                쿠폰 코드
              </label>
              <div className="cart-coupon-field">
                <input
                  id="coupon-code"
                  type="text"
                  value={couponCode}
                  placeholder="쿠폰 코드를 입력하세요"
                  onChange={(event) => setCouponCode(event.target.value)}
                />
                <button type="submit" className="cart-coupon-button">
                  적용
                </button>
              </div>
              {couponMessage && (
                <p className="cart-coupon-message">{couponMessage}</p>
              )}
            </form>

            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.product.id} className="cart-item">
                  <div>
                    <p className="cart-item-title">{item.product.title}</p>
                    <p className="cart-item-price">
                      {currencyFormatter.format(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="cart-quantity-button"
                      aria-label={`${item.product.title} 수량 감소`}
                      onClick={() => updateCartQuantity(item.product.id, -1)}
                    >
                      −
                    </button>
                    <span className="cart-quantity-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="cart-quantity-button"
                      aria-label={`${item.product.title} 수량 증가`}
                      onClick={() => updateCartQuantity(item.product.id, 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => removeCartItem(item.product.id)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-discount-row">
              <span>할인 금액</span>
              <strong>{currencyFormatter.format(Math.round(cartTotal - discountedTotal))}</strong>
            </div>
            <div className="cart-total-row">
              <span>최종 결제 금액</span>
              <strong>{currencyFormatter.format(discountedTotal)}</strong>
            </div>
          </>
        )}
      </section>

      <ul className="product-list">
        {sortedProducts.map((product) => (
          <li key={product.id} className="product-item">
            <div
              className="product-card-button"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProduct(product)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedProduct(product)
                }
              }}
            >
              <ProductCard
                product={product}
                selectedTag={selectedTag}
                onTagClick={toggleTag}
                onFavoriteToggle={toggleFavorite}
                onLikeToggle={toggleLike}
                onAddToCart={addToCart}
              />
            </div>
          </li>
        ))}
      </ul>

      {sortedProducts.length === 0 && (
        <p className="product-empty">조건에 맞는 상품이 없습니다.</p>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onDelete={() => selectedProduct && deleteProduct(selectedProduct.id)}
        onSaveReview={handleSaveReview}
        onDeleteReview={handleDeleteReview}
        onUpdateProduct={handleUpdateProduct}
      />
    </section>
  )
}
