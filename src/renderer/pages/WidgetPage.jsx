import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

const IS = typeof window !== 'undefined' && window.spicegames != null

export default function WidgetPage() {
  const [hov,         setHov]         = useState(false)
  const [time,        setTime]        = useState(new Date())
  const [sessionTime, setSessionTime] = useState(0)
  const games         = useStore(s => s.games)
  const runningIds    = useStore(s => s.runningGames)
  const running       = games.find(g => runningIds?.has?.(g.id)) || null

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Session timer
  useEffect(() => {
    if (!running) { setSessionTime(0); return }
    const t = setInterval(() => setSessionTime(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [running?.id, running])

  const fmtSession = (s) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return h > 0
      ? `${h}:${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`
      : `${m}:${sec.toString().padStart(2,'0')}`
  }

  const totalH = running
    ? Math.round((running.playtime || 0) / 60)
    : null

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'16px 22px 12px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:900, color:'var(--text)', lineHeight:1, margin:0 }}>Widget</h1>
        <p style={{ fontSize:12, color:'var(--text3)', marginTop:4, margin:0 }}>Floating window overlay for gaming sessions</p>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:400, padding:24, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14 }}>
          {running && running.id ? (
            /* Playing state */
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                {running.cover && (
                  <img src={running.cover} alt="" style={{ width:60, height:60, borderRadius:9, objectFit:'cover' }}
                    onError={e => e.target.style.display='none'} />
                )}
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:4 }}>
                    {running.name}
                  </div>
                  <div style={{ fontSize:12, color:'var(--text2)' }}>
                    Now Playing
                  </div>
                </div>
              </div>

              <div style={{ background:'var(--bg3)', padding:12, borderRadius:9, marginBottom:12 }}>
                <div style={{ fontSize:11, color:'var(--text3)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px' }}>
                  Current Session
                </div>
                <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:8 }}>
                  <div style={{ fontSize:28, fontWeight:700, color:'var(--accent)', fontFamily:'monospace' }}>
                    {fmtSession(sessionTime)}
                  </div>
                  {totalH > 0 && (
                    <div style={{ fontSize:12, color:'var(--text3)' }}>
                      ({totalH}h total)
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding:10, background:'var(--bg4)', borderRadius:9, textAlign:'center' }}>
                <div style={{ fontSize:11, color:'var(--text2)', fontWeight:500 }}>
                  Time: {time.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' })}
                </div>
              </div>
            </div>
          ) : (
            /* Idle state */
            <div style={{ textAlign:'center' }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--bg4)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:24 }}>
                🎮
              </div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:4 }}>
                No Game Running
              </div>
              <div style={{ fontSize:12, color:'var(--text3)', lineHeight:1.6, marginBottom:16 }}>
                Launch a game to see session stats here
              </div>
              <div style={{ fontSize:11, color:'var(--text3)', padding:10, background:'var(--bg3)', borderRadius:8 }}>
                📊 {games?.length || 0} games in library
              </div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:12 }}>
                {time.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
              </div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:8, padding:8, background:'var(--bg4)', borderRadius:6 }}>
                Running: {runningIds?.size || 0} • Games: {games?.length || 0}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}