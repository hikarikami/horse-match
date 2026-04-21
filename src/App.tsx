import { useState, useRef } from 'react'
import './App.css'
import horseSound from './assets/horse-sound-1.mp3'

import horse1 from './assets/horse-pics/horse-1.jpg'
import horse2 from './assets/horse-pics/horse-2.jpg'
import horse3 from './assets/horse-pics/horse-3.jpg'
import horse4 from './assets/horse-pics/horse-4.jpg'
import horse5 from './assets/horse-pics/horse-5.jpg'
import horse6 from './assets/horse-pics/horse-6.jpg'
import donkey1 from './assets/horse-pics/donkey-1.jpg'
import donkey2 from './assets/horse-pics/donkey-2.jpg'
import donkey3 from './assets/horse-pics/donkey-3.jpg'
import zebra1 from './assets/horse-pics/zebra-1.jpg'
import zebra2 from './assets/horse-pics/zebra-2.jpg'

const profiles = [
  { id: 1,  name: 'Thunderhoof',    age: 6,  bio: 'Looking for someone to gallop into the sunset with. Will spook at plastic bags. Non-negotiable.', img: horse1 },
  { id: 2,  name: 'Princess Oatcake', age: 4, bio: 'Emotionally unavailable. Afraid of fences. My last relationship ended because he was "too stable". Never again.', img: horse2 },
  { id: 3,  name: 'Gerald',         age: 9,  bio: "I'm not like other donkeys. I have a podcast. It's about hay.", img: donkey1 },
  { id: 4,  name: 'Blaze McSnort',  age: 7,  bio: 'Competitive eater. Professional napper. Once kicked a man just to see what would happen. Regrets nothing.', img: horse3 },
  { id: 5,  name: 'Stripes',        age: 5,  bio: "Not a horse. Not going to explain further. Swipe right if you're open-minded. Swipe left if you're a lion.", img: zebra1 },
  { id: 6,  name: 'Cloppington III', age: 12, bio: 'Old money. Smells like saddle leather and regret. Currently in therapy. Progress is slow.', img: horse4 },
  { id: 7,  name: 'Dolores',        age: 3,  bio: 'I am LITERALLY a donkey and I am thriving. My therapist says I have "big energy". She is also a donkey.', img: donkey2 },
  { id: 8,  name: 'Sir Gallopsalot', age: 8, bio: 'Equestrian champion 2019. Lost everything in 2020. Comeback arc currently loading. Please be patient.', img: horse5 },
  { id: 9,  name: 'Moonbeam',       age: 5,  bio: 'Vegan. Yes, I know. I eat grass. I am the most natural vegan on this app and I need you to respect that.', img: horse6 },
  { id: 10, name: 'Brenda',         age: 11, bio: 'Second donkey on this app. Will not apologise. Looking for someone who accepts me as I am. Bray if you agree.', img: donkey3 },
  { id: 11, name: 'Zigzag',         age: 4,  bio: "Yes I have stripes. No I won't explain. Yes I'm on a horse app. No I don't see the issue.", img: zebra2 },
]

function getShuffledWithRepeats() {
  const shuffled = [...profiles]
  shuffled.splice(6, 0, profiles[2])
  return shuffled
}

const deck = getShuffledWithRepeats()

type Profile = typeof profiles[0]

function SuperNeighModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 52, marginBottom: 4 }}>⭐🐴⭐</div>
        <h2 className="modal-title">SUPERNEIGH™</h2>
        <p className="modal-subtitle">Premium Horse Dating Technology</p>

        <div className="marquee-wrap">
          <div className="marquee-track">
            Are you REALLY sure you don't wanna buy some SuperNeighs™ for only 999 HorseCoin? 🐴💰 Are you REALLY sure you don't wanna buy some SuperNeighs™ for only 999 HorseCoin? 🐴💰 Are you REALLY sure you don't wanna buy some SuperNeighs™ for only 999 HorseCoin? 🐴💰&nbsp;
          </div>
        </div>

        <div className="modal-perks">
          <div className="perk-row">✅ Be seen by 3x more horses</div>
          <div className="perk-row" style={{ fontSize: 9, color: '#aaa' }}>❓ Unlock "HayMode" (unclear what this does)</div>
          <div className="perk-row">🌟 Gold hoof badge on your profile</div>
          <div className="perk-row" style={{ textAlign: 'right', fontSize: 10 }}>🚫 No refunds. Ever.</div>
        </div>

        <button className="modal-buy-btn" onClick={() => { alert('Payment processing... \n\nERROR: HorseCoin wallet not found.\n\nPlease try again (you cannot try again)'); }}>
          BUY 999 🪙 HORSECOIN
        </button>
        <button className="modal-close-btn" onClick={onClose}>
          No thanks, I hate horses
        </button>
      </div>
    </div>
  )
}

function LikesPage({ matchedProfiles }: { matchedProfiles: Profile[] }) {
  return (
    <div className="likes-page">
      <div className="likes-header">
        <span style={{ fontSize: 11, color: '#ff00aa' }}>YOUR</span>
        <h2 style={{ fontSize: 31, color: 'white', marginTop: -4 }}>Matches 💘</h2>
        <span style={{ fontSize: 9, color: '#666', display: 'block', marginTop: -2 }}>
          (results may vary)
        </span>
      </div>

      {matchedProfiles.length === 0 ? (
        <div className="likes-empty">
          <div style={{ fontSize: 50 }}>🦗</div>
          <p style={{ color: '#ff69b4', fontSize: 18, marginTop: 8 }}>Nothing here yet</p>
          <p style={{ color: '#555', fontSize: 10 }}>Go swipe on some horses, mate</p>
        </div>
      ) : (
        <div className="likes-list">
          {matchedProfiles.map((p, i) => (
            <div key={`${p.id}-${i}`} className="likes-row" style={{
              background: i % 2 === 0 ? '#1a0033' : '#0a1a00',
              borderLeft: i % 3 === 0 ? '4px solid #ff00aa' : i % 3 === 1 ? '4px solid lime' : '4px solid #ff6600',
            }}>
              <img src={p.img} alt={p.name} className="likes-thumb" style={{
                borderRadius: i % 2 === 0 ? '50%' : '4px',
                width: i % 3 === 0 ? 52 : 44,
                height: i % 3 === 0 ? 52 : 44,
              }} />
              <div className="likes-info">
                <span className="likes-name" style={{ fontSize: i % 2 === 0 ? 17 : 13 }}>{p.name}</span>
                <span className="likes-age">aged {p.age}</span>
                <span className="likes-bio-snippet">{p.bio.slice(0, 38)}...</span>
              </div>
              <button className="likes-msg-btn" style={{
                background: i % 2 === 0 ? '#ff00aa' : 'neongreen',
                color: i % 2 === 0 ? 'white' : 'black',
                fontSize: i % 3 === 0 ? 11 : 8,
                padding: i % 2 === 0 ? '6px 10px' : '4px 6px',
              }} onClick={() => alert(`Messaging ${p.name}...\n\nERROR: Messages cost 50 HorseCoin per word.`)}>
                {i % 2 === 0 ? '💬 MSG' : 'say hi'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="likes-footer-note">
        * Matches expire after 48 hours or when Mercury is in retrograde, whichever comes first
      </div>
    </div>
  )
}

export default function App() {
  const [index, setIndex] = useState(0)
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [matchedProfiles, setMatchedProfiles] = useState<Profile[]>([])
  const [showSuperNeigh, setShowSuperNeigh] = useState(false)
  const [glitchToast, setGlitchToast] = useState(false)
  const [activePage, setActivePage] = useState<'home' | 'likes'>('home')
  const startX = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const swipesSincePrompt = useRef(0)

  const current = deck[index]
  const isDone = index >= deck.length

  function triggerGlitchToast() {
    setGlitchToast(true)
    setTimeout(() => setGlitchToast(false), 2200)
  }

  function openSuperNeigh() {
    new Audio(horseSound).play()
    setShowSuperNeigh(true)
  }

  function maybeShowAutoPromo() {
    swipesSincePrompt.current += 1
    if (swipesSincePrompt.current >= 3) {
      swipesSincePrompt.current = 0
      setTimeout(() => openSuperNeigh(), 300)
    }
  }

  function handleLike() {
    const bugActivated = Math.random() < 0.3
    if (bugActivated) {
      console.log('NEIGH rejected')
      triggerGlitchToast()
      setLastAction('💔 Noped (bug)')
      setIndex(i => i + 1)
    } else {
      setLastAction('💚 Liked!')
      setMatchedProfiles(prev => [...prev, deck[index]])
      setIndex(i => i + 1)
    }
    maybeShowAutoPromo()
  }

  function handleNope() {
    setLastAction('❌ Noped')
    if (Math.random() > 0.15) {
      setIndex(i => i + 1)
    } else {
      setLastAction('❌ Noped (try again?)')
    }
    maybeShowAutoPromo()
  }

  function onMouseDown(e: React.MouseEvent) {
    startX.current = e.clientX
    setIsDragging(true)
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging) return
    setDragX((e.clientX - startX.current) * 1.8)
  }

  function onMouseUp() {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX > 180) handleLike()
    else if (dragX < -180) handleNope()
    setDragX(0)
  }

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isDragging) return
    setDragX((e.touches[0].clientX - startX.current) * 1.8)
  }

  function onTouchEnd() {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX > 180) handleLike()
    else if (dragX < -180) handleNope()
    setDragX(0)
  }

  const cardRotation = dragX * 0.06
  const likeOpacity = Math.min(dragX / 100, 1)
  const nopeOpacity = Math.min(-dragX / 100, 1)

  return (
    <div className="app-shell">
      {showSuperNeigh && <SuperNeighModal onClose={() => setShowSuperNeigh(false)} />}

      {/* Glitch toast */}
      <div className={`glitch-toast ${glitchToast ? 'glitch-toast-visible' : ''}`}>
        😤 Nope, out of your league!
      </div>

      {/* Header */}
      <div className="header">
        <span style={{ fontSize: '11px', color: '#aaa', marginLeft: 3 }}>v0.0.1b</span>
        <h1 className="app-title">🐴 HorseMatch</h1>
        <div style={{ fontSize: '22px', marginRight: 8 }}>🔔</div>
      </div>

      {/* Boost bar */}
      <div className="boost-bar">
        <span style={{ fontSize: '9px' }}>BOOST ACTIVE</span>
        <div className="boost-progress"><div className="boost-fill" /></div>
        <span style={{ fontSize: '9px', color: 'lime' }}>∞ left</span>
      </div>

      {activePage === 'likes' ? (
        <LikesPage matchedProfiles={matchedProfiles} />
      ) : (
        <>
          {/* Card area */}
          <div className="card-area">
            {isDone ? (
              <div className="done-card">
                <div style={{ fontSize: 60 }}>🐎</div>
                <p style={{ fontSize: 22, fontWeight: 'bold', color: '#ff69b4' }}>No more horses!</p>
                <p style={{ fontSize: 11, color: '#888', marginTop: -8 }}>you've seen them all (maybe)</p>
                <button className="btn-like" style={{ marginTop: 20, width: '80%' }} onClick={() => setIndex(0)}>
                  start over i guess
                </button>
              </div>
            ) : (
              <div
                ref={cardRef}
                className="profile-card"
                style={{
                  transform: `translateX(${dragX}px) rotate(${cardRotation}deg)`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="swipe-label like-label" style={{ opacity: likeOpacity }}>NEIGH ✅</div>
                <div className="swipe-label nope-label" style={{ opacity: nopeOpacity }}>NOPE 🚫</div>
                <img src={current.img} alt={current.name} className="profile-img" draggable={false} />
                <div className="profile-info">
                  <div className="profile-name-row">
                    <span className="profile-name">{current.name}</span>
                    <span className="profile-age">{current.age}</span>
                  </div>
                  <p className="profile-bio">{current.bio}</p>
                  <span className="verified-badge">✔ verified horse™</span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {!isDone && (
            <div className="action-row">
              <button className="btn-nope" onClick={handleNope} style={{ height: 54 }}>✕ NOPE</button>
              <button className="btn-superlike" style={{ height: 44, fontSize: 10 }} onClick={openSuperNeigh}>
                ⭐<br/>super
              </button>
              <button className="btn-like" onClick={handleLike} style={{ height: 60 }}>LIKE ♥</button>
            </div>
          )}

          {/* Last action feedback */}
          <div className="last-action">
            {lastAction && <span>{lastAction}</span>}
            <span style={{ fontSize: 9, color: '#999', marginLeft: 30 }}>matches: {matchedProfiles.length}</span>
          </div>
        </>
      )}

      {/* Bottom nav */}
      <div className="bottom-nav">
        <div className={`nav-item ${activePage === 'home' ? 'active-nav' : ''}`} onClick={() => setActivePage('home')}>
          🏠<span>Home</span>
        </div>
        <div className={`nav-item nav-likes ${activePage === 'likes' ? 'active-nav' : ''}`} onClick={() => setActivePage('likes')}>
          <span style={{ fontFamily: 'serif', fontSize: 20 }}>♡</span>
          <span>LIKES</span>
        </div>
        <div className="nav-item nav-messages">
          💬<span style={{ fontSize: 8 }}>Messages</span>
        </div>
        <div className="nav-item nav-me">
          <img src="https://img.icons8.com/ios/20/user-male-circle.png" alt="profile" style={{ width: 18, filter: 'invert(0)' }} />
          <span>Me</span>
        </div>
        <div className="nav-item nav-settings">
          ⚙️<span>settings</span>
        </div>
      </div>
    </div>
  )
}
