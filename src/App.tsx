import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import './App.css'
import horseSound from './assets/horse-sound-1.mp3'

import horse1 from './assets/horse-pics/horse-1.jpg'
import horse2 from './assets/horse-pics/horse-2.jpg'
import horse3 from './assets/horse-pics/horse-3.jpg'
import horse4 from './assets/horse-pics/horse-4.jpg'
import horse5 from './assets/horse-pics/horse-5.jpg'
import horse6 from './assets/horse-pics/horse-6.jpg'
import horse7 from './assets/horse-pics/horse-7.jpg'
import horse8 from './assets/horse-pics/horse-8.jpg'
import donkey1 from './assets/horse-pics/donkey-1.jpg'
import donkey2 from './assets/horse-pics/donkey-2.jpg'
import donkey3 from './assets/horse-pics/donkey-3.jpg'
import zebra1 from './assets/horse-pics/zebra-1.jpg'
import zebra2 from './assets/horse-pics/zebra-2.jpg'
import cappy1 from './assets/horse-pics/cappy-1.jpg'

const profiles = [
  { id: 1,  species: 'horse',    name: 'Thunderhoof',    age: 6,  bio: 'Looking for someone to gallop into the sunset with. Will spook at plastic bags. Non-negotiable.', img: horse1 },
  { id: 2,  species: 'horse',    name: 'Princess Oatcake', age: 4, bio: 'Emotionally unavailable. Afraid of fences. My last relationship ended because he was "too stable". Never again.', img: horse2 },
  { id: 3,  species: 'donkey',   name: 'Gerald',         age: 9,  bio: "Certified donkey. Long ears, strong opinions, elite bray control. I stop in doorways for dramatic effect and I do expect applause for carrying the emotional weight of this relationship.", img: donkey1 },
  { id: 4,  species: 'horse',    name: 'Blaze McSnort',  age: 7,  bio: 'Competitive eater. Professional napper. Once kicked a man just to see what would happen. Regrets nothing.', img: horse3 },
  { id: 5,  species: 'zebra',    name: 'Stripes',        age: 5,  bio: "Not a horse. Not going to explain further. Swipe right if you're open-minded. Swipe left if you're a lion.", img: zebra1 },
  { id: 6,  species: 'horse',    name: 'Cloppington III', age: 12, bio: 'Old money. Smells like saddle leather and regret. Currently in therapy. Progress is slow.', img: horse4 },
  { id: 7,  species: 'donkey',   name: 'Dolores',        age: 3,  bio: 'I am LITERALLY a donkey and I am thriving. My therapist says I have "big energy". She is also a donkey.', img: donkey2 },
  { id: 8,  species: 'horse',    name: 'Sir Gallopsalot', age: 8, bio: 'Equestrian champion 2019. Lost everything in 2020. Comeback arc currently loading. Please be patient.', img: horse5 },
  { id: 9,  species: 'horse',    name: 'Moonbeam',       age: 5,  bio: 'Vegan. Yes, I know. I eat grass. I am the most natural vegan on this app and I need you to respect that.', img: horse6 },
  { id: 10, species: 'donkey',   name: 'Brenda',         age: 11, bio: 'Second donkey on this app. Will not apologise. Looking for someone who accepts me as I am. Bray if you agree.', img: donkey3 },
  { id: 11, species: 'zebra',    name: 'Zigzag',         age: 4,  bio: "Yes I have stripes. No I won't explain. Yes I'm on a horse app. No I don't see the issue.", img: zebra2 },
  { id: 14, species: 'horse',    name: 'Kevin',          age: 6,  bio: "My name is Kevin. I don't know why either. Looking for someone who won't make it weird.", img: horse7, flip: true },
  { id: 15, species: 'horse',    name: 'Duchess Clops',  age: 9,  bio: "I have a lot of opinions about hay. Too many, probably. My ex said I was 'a lot'. He was right.", img: horse8, flip: true },
  { id: 19, species: 'capybara', name: 'Fernando',       age: 6,  bio: "Largest rodent in the world. Very chill. Almost suspiciously chill. Not a horse but I feel like that's not the point. Are you okay? I'm okay.", img: cappy1 },
]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck() {
  const horses = shuffled(profiles.filter(p => p.species === 'horse'))
  const firstDonkey = profiles.find(p => p.id === 3)!
  const zebras = profiles.filter(p => p.species === 'zebra')
  const capybara = profiles.find(p => p.species === 'capybara')!

  const first4Horses = horses.slice(0, 4)
  const remainingPool = shuffled([...horses.slice(4), ...zebras, capybara])

  return [...first4Horses, firstDonkey, ...remainingPool]
}

const deck = buildDeck()

type Profile = typeof profiles[0]

type Notification = { id: number; profile: Profile; createdAt: number; read: boolean }

function timeAgo(ts: number): string {
  const secs = Math.floor((Date.now() - ts) / 1000)
  if (secs < 60) return 'Just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

function CardContent({ p }: { p: Profile }) {
  return (
    <>
      <div
        className="profile-img"
        aria-label={p.name}
        role="img"
        style={{
          backgroundImage: `url(${p.img})`,
          transform: p.flip ? 'scaleX(-1) translateZ(0)' : 'translateZ(0)',
        }}
      />
      <div className="profile-info">
        <div className="profile-name-row">
          <span className="profile-name">{p.name}</span>
        </div>
        <p className="profile-bio">{p.bio}</p>
        <span className="verified-badge">✔ verified horse™</span>
      </div>
    </>
  )
}

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
          <div className="perk-row" style={{ fontSize: 11, color: '#52525b' }}>❓ Unlock "HayMode" (unclear what this does)</div>
          <div className="perk-row">🌟 Gold hoof badge on your profile</div>
          <div className="perk-row" style={{ textAlign: 'right', fontSize: 11, color: '#52525b' }}>🚫 No refunds. Ever.</div>
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

function MatchModal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  return (
    <motion.div
      className="modal-overlay match-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="match-box"
        initial={{ scale: 0.7, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.7, y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 16, stiffness: 220 }}
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          className="match-title"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          IT'S A MATCH! 💘
        </motion.div>

        <motion.div
          className="match-profile-pic"
          style={{ backgroundImage: `url(${profile.img})` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2, damping: 12 }}
        />

        <motion.p
          className="match-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          You and <strong>{profile.name}</strong> both neighed!
        </motion.p>

        <motion.button
          className="match-dismiss-btn"
          onClick={onClose}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          Keep Swiping 🐎
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function NotificationsPanel({
  notifications,
  onClose,
  onLikeBack,
}: {
  notifications: Notification[]
  onClose: () => void
  onLikeBack: (profile: Profile) => void
}) {
  return (
    <motion.div
      className="notif-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="notif-backdrop" onClick={onClose} />
      <motion.div
        className="notif-panel"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 340 }}
      >
        <div className="notif-header">
          <span className="notif-header-title">Notifications</span>
          <button className="notif-close-btn" onClick={onClose}>✕</button>
        </div>

        {notifications.length === 0 ? (
          <div className="notif-empty">
            <div style={{ fontSize: 36 }}>🔔</div>
            <p style={{ color: '#71717a', fontSize: 13, marginTop: 8 }}>No notifications yet</p>
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className={`notif-row${n.read ? '' : ' notif-unread'}`}>
              <img
                src={n.profile.img}
                alt={n.profile.name}
                className="notif-thumb"
                style={n.profile.flip ? { transform: 'scaleX(-1)' } : undefined}
              />
              <div className="notif-info">
                <span className="notif-text">
                  <strong>{n.profile.name}</strong> liked you!
                </span>
                <span className="notif-time">{timeAgo(n.createdAt)}</span>
              </div>
              <button className="notif-like-btn" onClick={() => onLikeBack(n.profile)}>
                Like back
              </button>
            </div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}

function LikesPage({ matchedProfiles }: { matchedProfiles: Profile[] }) {
  return (
    <div className="likes-page">
      <div className="likes-header">
        <span style={{ fontSize: 11, color: '#a1a1aa', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Your</span>
        <h2 style={{ fontSize: 26, color: '#18181b', fontWeight: 700, letterSpacing: '-0.3px' }}>Matches 💘</h2>
        <span style={{ fontSize: 11, color: '#a1a1aa', display: 'block' }}>
          (results may vary)
        </span>
      </div>

      {matchedProfiles.length === 0 ? (
        <div className="likes-empty">
          <div style={{ fontSize: 48 }}>🦗</div>
          <p style={{ color: '#18181b', fontSize: 16, fontWeight: 600 }}>Nothing here yet</p>
          <p style={{ color: '#a1a1aa', fontSize: 12 }}>Go swipe on some horses, mate</p>
        </div>
      ) : (
        <div className="likes-list">
          {matchedProfiles.map((p, i) => (
            <div key={`${p.id}-${i}`} className="likes-row">
              <img src={p.img} alt={p.name} className="likes-thumb" style={{
                borderRadius: '50%',
                width: 48,
                height: 48,
                objectFit: 'cover',
              }} />
              <div className="likes-info">
                <span className="likes-name">{p.name}</span>
                <span className="likes-age">aged {p.age}</span>
                <span className="likes-bio-snippet">{p.bio.slice(0, 48)}...</span>
              </div>
              <button className="likes-msg-btn" onClick={() => alert(`Messaging ${p.name}...\n\nERROR: Messages cost 50 HorseCoin per word.`)}>
                Message
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
  const [matchedProfiles, setMatchedProfiles] = useState<Profile[]>([])
  const [showSuperNeigh, setShowSuperNeigh] = useState(false)
  const [showMatchFor, setShowMatchFor] = useState<Profile | null>(null)
  const [activePage, setActivePage] = useState<'home' | 'likes'>('home')
  const [isSwiping, setIsSwiping] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [bellShaking, setBellShaking] = useState(false)
  const notifTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-20, 20])
  const likeOpacity = useTransform(x, [50, 150], [0, 1])
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0])

  useEffect(() => {
    for (const profile of deck) {
      const img = new window.Image()
      img.src = profile.img
      void img.decode?.().catch(() => {})
    }
  }, [])

  // Auto-generate "liked you" notifications from random profiles
  useEffect(() => {
    const used = new Set<number>()
    let count = 0

    function schedule() {
      notifTimerRef.current = setTimeout(() => {
        const available = profiles.filter(p => !used.has(p.id))
        if (available.length === 0 || count >= 6) return
        const profile = available[Math.floor(Math.random() * available.length)]
        used.add(profile.id)
        count++
        setNotifications(prev => [{ id: Date.now(), profile, createdAt: Date.now(), read: false }, ...prev])
        if (count < 6) schedule()
      }, 5000 + Math.random() * 8000)
    }

    schedule()
    return () => { if (notifTimerRef.current) clearTimeout(notifTimerRef.current) }
  }, [])

  // Shake the bell whenever a new notification arrives
  useEffect(() => {
    if (notifications.length === 0) return
    setBellShaking(true)
    const t = setTimeout(() => setBellShaking(false), 600)
    return () => clearTimeout(t)
  }, [notifications.length])

  useLayoutEffect(() => {
    x.set(0)
    setIsSwiping(false)
  }, [index])

  const current = deck[index]
  const isDone = index >= deck.length

  function openSuperNeigh() {
    new Audio(horseSound).play().catch(() => {})
    setShowSuperNeigh(true)
  }

  function commitLike() {
    setLastAction('💚 Liked!')
    const likedProfile = deck[index]
    setMatchedProfiles(prev => [...prev, likedProfile])
    const next = index + 1
    setIndex(next)
    if (next >= deck.length) {
      setTimeout(() => openSuperNeigh(), 400)
    } else {
      setShowMatchFor(likedProfile)
    }
  }

  function commitNope() {
    setLastAction('❌ Noped')
    const next = index + 1
    setIndex(next)
    if (next >= deck.length) setTimeout(() => openSuperNeigh(), 400)
  }

  function doSwipe(dir: 'left' | 'right', commit: () => void) {
    if (isSwiping) return
    setIsSwiping(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animate(x, dir === 'right' ? 700 : -700, { duration: 0.3, ease: [0.25, 1, 0.5, 1] } as any).then(() => {
      commit()
    })
  }

  function handleLike() { doSwipe('right', commitLike) }
  function handleNope() { doSwipe('left', commitNope) }

  function openNotifications() {
    setShowNotifications(true)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function handleLikeBack(profile: Profile) {
    setShowNotifications(false)
    setMatchedProfiles(prev => [...prev, profile])
    setShowMatchFor(profile)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="app-shell">
      {showSuperNeigh && <SuperNeighModal onClose={() => setShowSuperNeigh(false)} />}
      <AnimatePresence>
        {showMatchFor && <MatchModal profile={showMatchFor} onClose={() => setShowMatchFor(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showNotifications && (
          <NotificationsPanel
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onLikeBack={handleLikeBack}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="header">
        <span style={{ fontSize: 11, color: '#a1a1aa' }}>v0.0.1b</span>
        <h1 className="app-title">🐴 HorseMatch</h1>
        <div className="notif-bell-wrap" onClick={openNotifications}>
          <span className={bellShaking ? 'bell-shake' : ''} style={{ fontSize: 20 }}>🔔</span>
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
        </div>
      </div>

      {activePage === 'likes' ? (
        <LikesPage matchedProfiles={matchedProfiles} />
      ) : (
        <>
          {/* Card area */}
          <div className="card-area">
            {isDone ? (
              <div className="done-card">
                <div style={{ fontSize: 52 }}>🐎</div>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#18181b', marginTop: 12 }}>No more horses!</p>
                <p style={{ fontSize: 12, color: '#a1a1aa', marginTop: 4 }}>you've seen them all (maybe)</p>
                <button className="btn-like" style={{ marginTop: 24, width: '80%', height: 48, transform: 'none' }} onClick={() => setIndex(0)}>
                  Start over
                </button>
              </div>
            ) : (
              <div className="card-stack">

                {/* Hidden card — same element type so React reuses DOM node when it promotes */}
                {deck[index + 2] && (
                  <motion.div
                    key={deck[index + 2].id}
                    className="profile-card card-hidden"
                    style={{ pointerEvents: 'none' }}
                  >
                    <CardContent p={deck[index + 2]} />
                  </motion.div>
                )}

                {/* Behind card — scales up as front departs; React reuses this node as the next front */}
                {deck[index + 1] && (
                  <motion.div
                    key={deck[index + 1].id}
                    className="profile-card card-behind"
                    animate={{ scale: isSwiping ? 1 : 0.93 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ pointerEvents: 'none' }}
                  >
                    <CardContent p={deck[index + 1]} />
                  </motion.div>
                )}

                {/* Front card — when index advances, React moves the old behind-card DOM node here */}
                <motion.div
                  key={current.id}
                  className="profile-card card-front"
                  style={{ x, rotate, cursor: isSwiping ? 'default' : 'grab', userSelect: 'none' }}
                  drag={isSwiping ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_, info) => {
                    if (isSwiping) return
                    if (info.offset.x > 80 || info.velocity.x > 400) doSwipe('right', commitLike)
                    else if (info.offset.x < -80 || info.velocity.x < -400) doSwipe('left', commitNope)
                  }}
                >
                  <motion.div className="swipe-label like-label" style={{ opacity: likeOpacity }}>NEIGH ✅</motion.div>
                  <motion.div className="swipe-label nope-label" style={{ opacity: nopeOpacity }}>NOPE 🚫</motion.div>
                  <CardContent p={current} />
                </motion.div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {!isDone && (
            <div className="action-row">
              <button className="btn-nope" onClick={handleNope} style={{ height: 52 }}>✕ Nope</button>
              <button className="btn-superlike" style={{ height: 44 }} onClick={openSuperNeigh}>
                ⭐<br/><span style={{ fontSize: 9 }}>super</span>
              </button>
              <button className="btn-like" onClick={handleLike} style={{ height: 58 }}>Like ♥</button>
            </div>
          )}

          {/* Last action feedback */}
          <div className="last-action">
            {lastAction && <span style={{ color: '#71717a' }}>{lastAction}</span>}
            <span style={{ color: '#a1a1aa', fontSize: 11 }}>matches: {matchedProfiles.length}</span>
          </div>
        </>
      )}

      {/* Bottom nav */}
      <div className="bottom-nav">
        <div className={`nav-item ${activePage === 'home' ? 'active-nav' : ''}`} onClick={() => setActivePage('home')}>
          🏠<span>Home</span>
        </div>
        <div className={`nav-item nav-likes ${activePage === 'likes' ? 'active-nav' : ''}`} onClick={() => setActivePage('likes')}>
          <span style={{ fontSize: 20 }}>♡</span>
          <span>Likes</span>
        </div>
        <div className="nav-item nav-messages">
          💬<span>Messages</span>
        </div>
        <div className="nav-item nav-me">
          👤<span>Me</span>
        </div>
        <div className="nav-item nav-settings">
          ⚙️<span>Settings</span>
        </div>
      </div>
    </div>
  )
}
