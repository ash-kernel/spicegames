import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const IS = typeof window !== 'undefined' && window.spicegames != null

const CARD_THEMES = [
  { id:'dark',   label:'Dark',    bg:'#08080F', bg2:'#12121F', accent:'#6366F1', text:'#fff' },
  { id:'neon',   label:'Neon',    bg:'#050A05', bg2:'#0A140A', accent:'#00FF88', text:'#fff' },
  { id:'ember',  label:'Ember',   bg:'#0C0806', bg2:'#180E08', accent:'#F97316', text:'#fff' },
  { id:'cyber',  label:'Cyber',   bg:'#08040F', bg2:'#10081A', accent:'#A855F7', text:'#fff' },
  { id:'ocean',  label:'Ocean',   bg:'#040A0C', bg2:'#08141A', accent:'#14B8A6', text:'#fff' },
]

function CardPreview({ games, theme, username, title }) {
  const t = CARD_THEMES.find(x => x.id === theme) || CARD_THEMES[0]
  const shown = games.slice(0, 6)
  const cols  = shown.length <= 3 ? shown.length : 3
  const rows  = Math.ceil(shown.length / 3)

  return (
    <div style={{ width: 600, background: t.bg, borderRadius: 18, overflow: 'hidden', border: `1px solid ${t.accent}30`, boxShadow: `0 0 60px ${t.accent}18`, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '18px 22px 14px', background: t.bg2, borderBottom: `1px solid ${t.accent}15`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.accent}20`, border: `1px solid ${t.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎮</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: t.text, lineHeight: 1.2 }}>{title || 'My Game Collection'}</div>
          {username && <div style={{ fontSize: 11, color: t.accent, marginTop: 2 }}>@{username}</div>}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: `${t.accent}18`, color: t.accent, border: `1px solid ${t.accent}30`, letterSpacing: '.5px' }}>
          SPICEDECK
        </div>
      </div>

      {/* Games grid */}
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
        {shown.map((game, i) => (
          <div key={game.id || i} style={{ borderRadius: 10, overflow: 'hidden', background: t.bg2, border: `1px solid ${t.accent}15`, position: 'relative', aspectRatio: '3/4' }}>
            {game.cover ? (
              <img src={game.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display='none'} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, opacity: .2 }}>🎮</div>
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.85) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,.8)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {game.name}
              </div>
              {game.status && game.status !== 'Not Started' && (
                <div style={{ fontSize: 9, marginTop: 3, fontWeight: 700, color: t.accent, textTransform: 'uppercase', letterSpacing: '.5px' }}>{game.status}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 22px', borderTop: `1px solid ${t.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10, color: t.accent, opacity: .6 }}>spicedeck.app</div>
        <div style={{ fontSize: 10, color: `${t.text}50` }}>{shown.length} game{shown.length !== 1 ? 's' : ''}</div>
      </div>
    </div>
  )
}

export default function ShareableCardPage() {
  const games   = useStore(s => s.games)
  const [theme,    setTheme]    = useState('dark')
  const [username, setUsername] = useState('')
  const [title,    setTitle]    = useState('My Game Collection')
  const [selected, setSelected] = useState([])
  const [copying,  setCopying]  = useState(false)
  const previewRef = useRef(null)

  // Auto-select top 6 by playtime
  useEffect(() => {
    const top = [...games].sort((a, b) => (b.playtime || 0) - (a.playtime || 0)).slice(0, 6)
    setSelected(top.map(g => g.id))
  }, [games])

  const selectedGames = games.filter(g => selected.includes(g.id))

  const toggleGame = (id) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 6) { toast('Max 6 games'); return prev }
      return [...prev, id]
    })
  }

  const copyToClipboard = async () => {
    if (!previewRef.current) return
    try {
      setCopying(true)
      // Use html-to-image or canvas approach
      // For now, just copy as text summary
      const text = `🎮 ${title}${username ? ` by @${username}` : ''}\n${selectedGames.map(g => `• ${g.name}`).join('\n')}\n\nMade with SpiceDeck`
      await navigator.clipboard.writeText(text)
      toast.success('Card info copied to clipboard!')
    } catch { toast.error('Copy failed') }
    setCopying(false)
  }

  const saveAsImage = async () => {
    if (!previewRef.current) return
    try {
      // Use the browser's built-in screenshot via canvas
      toast('💡 Tip: Use browser Screenshot or Win+Shift+S to capture the preview', { duration: 4000 })
    } catch {}
  }

  return (
    <div style={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Left panel — controls */}
      <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--text)', margin: '0 0 4px' }}>Share Card</h1>
          <p style={{ fontSize: 12, color: 'var(--text3)', margin: 0 }}>Create a shareable game card</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
          {/* Title */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', display: 'block', marginBottom: 5 }}>Card Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--font-body)', padding: '7px 10px', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Username */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', display: 'block', marginBottom: 5 }}>Your Name (optional)</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username"
              style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--font-body)', padding: '7px 10px', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Theme */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', display: 'block', marginBottom: 8 }}>Theme</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CARD_THEMES.map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 8, border: `1px solid ${theme === t.id ? t.accent : 'var(--border2)'}`, background: theme === t.id ? `${t.accent}15` : 'var(--bg3)', cursor: 'pointer', transition: 'all .15s' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.accent, boxShadow: `0 0 5px ${t.accent}` }} />
                  <span style={{ fontSize: 12, color: theme === t.id ? t.accent : 'var(--text3)', fontWeight: theme === t.id ? 700 : 400 }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Game selector */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.6px', display: 'block', marginBottom: 8 }}>
              Games ({selected.length}/6)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 260, overflowY: 'auto' }}>
              {games.map(g => {
                const on = selected.includes(g.id)
                return (
                  <div key={g.id} onClick={() => toggleGame(g.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px', borderRadius: 8, background: on ? `rgba(var(--accent-rgb),.1)` : 'var(--bg3)', border: `1px solid ${on ? 'rgba(var(--accent-rgb),.25)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all .14s' }}>
                    {g.cover && <img src={g.cover} alt="" style={{ width: 26, height: 26, borderRadius: 5, objectFit: 'cover', flexShrink: 0 }} onError={e => e.target.style.display='none'} />}
                    <span style={{ fontSize: 12, color: on ? 'var(--accent)' : 'var(--text)', fontWeight: on ? 600 : 400, flex: 1, lineHeight: 1.3 }}>{g.name}</span>
                    {on && <span style={{ fontSize: 11, color: 'var(--accent)', flexShrink: 0 }}>✓ #{selected.indexOf(g.id)+1}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <button onClick={saveAsImage}
            style={{ padding: '10px', borderRadius: 9, border: 'none', background: `linear-gradient(135deg,var(--accent),var(--accent2))`, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-glow)' }}>
            📸 Screenshot to Share
          </button>
          <button onClick={copyToClipboard} disabled={copying}
            style={{ padding: '9px', borderRadius: 9, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)', opacity: copying ? .6 : 1, transition: 'background .15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg3)'}>
            📋 Copy Game List
          </button>
        </div>
      </div>

      {/* Right panel — preview */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.8px', flexShrink: 0 }}>
          Preview
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 24, background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}>
          <div ref={previewRef}>
            {selectedGames.length > 0
              ? <CardPreview games={selectedGames} theme={theme} username={username} title={title} />
              : (
                <div style={{ textAlign: 'center', padding: '60px 40px', color: 'var(--text3)' }}>
                  <div style={{ fontSize: 44, opacity: .2, marginBottom: 12 }}>🃏</div>
                  <p style={{ fontSize: 14 }}>Select games on the left to preview your card</p>
                </div>
              )
            }
          </div>
        </div>
        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text3)', background: 'var(--bg2)', flexShrink: 0 }}>
          💡 Use <strong style={{ color: 'var(--text)' }}>Win + Shift + S</strong> or your screenshot tool to capture and share the card above.
        </div>
      </div>
    </div>
  )
}