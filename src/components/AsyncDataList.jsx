import { useEffect, useState } from 'react'

export default function AsyncDataList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        // JSONPlaceholder의 공개 API 사용 (테스트 용도)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError(err.message || '데이터 로드 중 오류가 발생했습니다.')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  const goToPage = (pageNumber) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages))
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="async-data-section" aria-labelledby="async-title">
      <div className="section-heading">
        <p className="eyebrow">Async Data</p>
        <h2 id="async-title">비동기 데이터 로딩</h2>
      </div>

      {loading && (
        <div className="loading-spinner-container" role="status" aria-live="polite">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>데이터를 불러오고 있습니다...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <div className="error-content">
            <p className="error-title">오류 발생</p>
            <p className="error-text">{error}</p>
            <button
              type="button"
              className="error-retry-button"
              onClick={() => window.location.reload()}
            >
              다시 시도
            </button>
          </div>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <ul className="async-data-list">
            {currentData.map((item) => (
              <li key={item.id} className="async-data-item">
                <div className="async-item-header">
                  <h3 className="async-item-title">{item.title}</h3>
                  <span className="async-item-id">ID: {item.id}</span>
                </div>
                <p className="async-item-body">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="pagination" role="navigation" aria-label="페이지 네비게이션">
            <button
              type="button"
              className="pagination-button pagination-prev"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="이전 페이지"
            >
              ← 이전
            </button>

            <div className="pagination-info">
              <span className="pagination-current">{currentPage}</span>
              <span className="pagination-separator">/</span>
              <span className="pagination-total">{totalPages}</span>
            </div>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const diff = Math.abs(page - currentPage)
                  return diff === 0 || diff <= 1 || page === 1 || page === totalPages
                })
                .map((page, idx, arr) => (
                  <div key={page}>
                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                      <span className="pagination-ellipsis">...</span>
                    )}
                    <button
                      type="button"
                      className={`pagination-page ${
                        currentPage === page ? 'is-active' : ''
                      }`}
                      onClick={() => goToPage(page)}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  </div>
                ))}
            </div>

            <button
              type="button"
              className="pagination-button pagination-next"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="다음 페이지"
            >
              다음 →
            </button>
          </div>
        </>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="async-empty">불러온 데이터가 없습니다.</p>
      )}
    </section>
  )
}
