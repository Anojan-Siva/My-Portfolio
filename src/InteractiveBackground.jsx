import { useState, useEffect, useCallback, useRef } from 'react'
import './InteractiveBackground.css'

const SQUARE_SIZE = 60
const RIPPLE_RADIUS = 3.2 // in grid cells

// smoothstep-style falloff so the ripple has a soft edge instead of a linear cone
function falloff(dist, radius) {
  const t = Math.max(0, 1 - dist / radius)
  return t * t * (3 - 2 * t)
}

export default function InteractiveBackground() {
  const [gutters, setGutters] = useState({ left: 0, right: 0, height: 0 })

  // side -> Map(index -> DOM node)
  const refsBySide = useRef({ left: new Map(), right: new Map() })
  // side -> Set(index) currently non-zero, so we know what to reset
  const activeBySide = useRef({ left: new Set(), right: new Set() })
  const rafId = useRef(null)

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
    const t1 = setTimeout(measure, 300)
    const t2 = setTimeout(measure, 1200)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      clearTimeout(t1)
      clearTimeout(t2)
      if (rafId.current) cancelAnimationFrame(rafId.current)
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
  const gridsBySide = { left: leftGrid, right: rightGrid }

  const applyRipple = (side, col, row) => {
    const grid = gridsBySide[side]
    const refs = refsBySide.current[side]
    const active = activeBySide.current[side]
    const nextActive = new Set()

    const rMin = Math.max(0, Math.floor(row - RIPPLE_RADIUS))
    const rMax = Math.min(grid.rows - 1, Math.ceil(row + RIPPLE_RADIUS))
    const cMin = Math.max(0, Math.floor(col - RIPPLE_RADIUS))
    const cMax = Math.min(grid.cols - 1, Math.ceil(col + RIPPLE_RADIUS))

    for (let r = rMin; r <= rMax; r++) {
      for (let c = cMin; c <= cMax; c++) {
        const dist = Math.hypot(r - row, c - col)
        if (dist > RIPPLE_RADIUS) continue
        const idx = r * grid.cols + c
        const el = refs.get(idx)
        if (!el) continue
        const intensity = falloff(dist, RIPPLE_RADIUS)
        el.style.setProperty('--intensity', intensity.toFixed(3))
        el.style.zIndex = String(1 + Math.round(intensity * 9))
        nextActive.add(idx)
      }
    }

    // reset anything that was active last frame but isn't in range anymore
    active.forEach((idx) => {
      if (!nextActive.has(idx)) {
        const el = refs.get(idx)
        if (el) {
          el.style.setProperty('--intensity', 0)
          el.style.zIndex = ''
        }
      }
    })

    activeBySide.current[side] = nextActive
  }

  const clearSide = (side) => {
    const refs = refsBySide.current[side]
    activeBySide.current[side].forEach((idx) => {
      const el = refs.get(idx)
      if (el) {
        el.style.setProperty('--intensity', 0)
        el.style.zIndex = ''
      }
    })
    activeBySide.current[side] = new Set()
  }

  const handleMove = (e, side) => {
    const grid = gridsBySide[side]
    if (grid.cols === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const col = x / SQUARE_SIZE - 0.5
    const row = y / SQUARE_SIZE - 0.5

    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyRipple(side, col, row))
  }

  const handleLeave = (side) => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    clearSide(side)
  }

  const renderPanel = (side, grid) => {
    if (grid.cols === 0) return null
    const total = grid.cols * grid.rows
    const refs = refsBySide.current[side]
    return (
      <div
        className={`side-decor side-decor-${side}`}
        style={{
          width: grid.cols * SQUARE_SIZE,
          height: gutters.height,
          gridTemplateColumns: `repeat(${grid.cols}, ${SQUARE_SIZE}px)`,
        }}
        onMouseMove={(e) => handleMove(e, side)}
        onMouseLeave={() => handleLeave(side)}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="interactive-square"
            ref={(el) => {
              if (el) refs.set(i, el)
              else refs.delete(i)
            }}
          />
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