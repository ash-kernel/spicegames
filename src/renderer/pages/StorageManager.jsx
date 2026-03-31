import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const IS = typeof window !== 'undefined' && window.spicegames != null

function fmtSize(bytes) {
  if (!bytes) return '—'
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + ' GB'
  if (bytes >= 1048576)    return (bytes / 1048576).toFixed(0) + ' MB'
  return (bytes / 1024).toFixed(0) + ' KB'
}

function DiskBar({ disk }) {
  const pct = disk.use || 0
  const col = pct > 90 ? '#EF4444' : pct > 70 ? '#F59E0B' : 'var(--accent)'
  return (
    <div style={{ padding: '12px 16px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{disk.mount || disk.fs}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{disk.fs}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: col }}>{pct}% used</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{fmtSize(disk.available)} free of {fmtSize(disk.size)}</div>
        </div>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'var(--bg4)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: 3, transition: 'width .4s' }} />
      </div>
    </div>
  )
}

export default function StorageManagerPage() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const games = useStore(s => s.games)

  const load = async () => {
    if (!IS) return
    setLoading(true)
    try {
      const res = await window.spicegames.getStorageInfo({ games })
      if (res.ok) setData(res)
      else toast.error('Failed to scan storage')
    } catch { toast.error('Scan failed') }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const totalGamesSize = data?.games?.filter(g => g.size).reduce((a, b) => a + (b.size || 0), 0) || 0
  const installedCount = data?.games?.filter(g => g.installed).length || 0
  const maxSize = data?.games?.[0]?.size || 1

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px 22px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'var(--text)', lineHeight: 1, margin: 0 }}>Storage</h1>
            <p style={{ fontSize: 12, color: 'var(--text3)', margin: '4px 0 0' }}>
              {installedCount} games found · {fmtSize(totalGamesSize)} total
            </p>
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={load} disabled={loading}
            style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)', fontSize: 12, cursor: loading ? 'default' : 'pointer', opacity: loading ? .6 : 1, fontFamily: 'var(--font-body)', transition: 'background .15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg3)'}>
            {loading ? '…' : '↻ Rescan'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 40px' }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: 56, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <div className="shimmer" style={{ width: 32, height: 32, borderRadius: 6 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="shimmer" style={{ height: 11, borderRadius: 5, width: '40%' }} />
                  <div className="shimmer" style={{ height: 6, borderRadius: 3, width: '70%' }} />
                </div>
                <div className="shimmer" style={{ width: 50, height: 11, borderRadius: 5 }} />
              </div>
            ))}
          </div>
        )}

        {!loading && data && (
          <>
            {/* Disk overview */}
            {data.disks?.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Drives</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 10 }}>
                  {data.disks.filter(d => d.size > 0).map((disk, i) => <DiskBar key={i} disk={disk} />)}
                </div>
              </div>
            )}

            {/* Games list */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>
                Games ({data.games?.length || 0})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {data.games?.map((game, i) => (
                  <div key={game.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'var(--bg2)', border: '1px solid var(--border)', transition: 'border-color .15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--bg4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'var(--text3)', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 4 }}>
                        {game.name}
                      </div>
                      {game.installed && game.size ? (
                        <div style={{ height: 4, borderRadius: 2, background: 'var(--bg4)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${Math.round((game.size / maxSize) * 100)}%`, background: `linear-gradient(90deg,var(--accent),var(--accent2))`, borderRadius: 2 }} />
                        </div>
                      ) : (
                        <div style={{ fontSize: 10, color: 'var(--text3)' }}>Not found on disk</div>
                      )}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: game.size ? 'var(--text)' : 'var(--text3)' }}>
                        {game.size ? fmtSize(game.size) : '—'}
                      </div>
                      {game.installed && (
                        <button onClick={() => window.spicegames?.revealInExplorer(game.exePath)}
                          style={{ fontSize: 10, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 2 }}>
                          Show folder ↗
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!loading && !data && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text3)' }}>
            <div style={{ fontSize: 44, opacity: .2, marginBottom: 12 }}>💾</div>
            <p>Click Rescan to check storage</p>
          </div>
        )}
      </div>
    </div>
  )
}