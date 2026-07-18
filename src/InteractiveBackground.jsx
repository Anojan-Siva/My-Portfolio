import { useState, useEffect, useCallback } from 'react'
import './InteractiveBackground.css'

const SQUARE_SIZE = 60

export default function InteractiveBackground() {
  const [gutters, setGutters] = useState({ left: 0, right: 0, height: 0 })

  const measure = useCallback(() => {
    const container = document.querySelector('.container')
    if (!container) return
    const rect = container.getBoundingClientRect()
    const docHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight)
    setGutters({
      left: Math.max(0, rect.left),
      right: Math.max(0, window.innerWidth - rect.right),
      height: docHeight,
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    // re-measure after images/fonts settle and shift page height
    const t1 = setTimeout(measure, 300)
    const t2 = setTimeout(measure, 1200)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [measure])

  const makeGrid = (widthPx) => {
    if (widthPx < SQUARE_SIZE) return { cols: 0, rows: 0 }
    return {
      cols: Math.floor(widthPx / SQUARE_SIZE),
      rows: Math.ceil(gutters.height / SQUARE_SIZE),
    }
  }

  const leftGrid = makeGrid(gutters.left)
  const rightGrid = makeGrid(gutters.right)

  const renderPanel = (side, grid) => {
    if (grid.cols === 0) return null
    const total = grid.cols * grid.rows
    return (
      <div
        className={`side-decor side-decor-${side}`}
        style={{
          width: grid.cols * SQUARE_SIZE,
          height: gutters.height,
          gridTemplateColumns: `repeat(${grid.cols}, ${SQUARE_SIZE}px)`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="interactive-square" />
        ))}
      </div>
    )
  }

  return (
    <div className="interactive-bg-wrap" aria-hidden="true">
      {renderPanel('left', leftGrid)}
      {renderPanel('right', rightGrid)}
    </div>
  )
}