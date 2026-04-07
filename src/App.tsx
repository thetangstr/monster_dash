/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlutterBug, BigBlue, BananaBoss } from './components/Monsters';
import { HauntedHouseBackground } from './components/HauntedHouse';
import { initAudio, playSplat, playBossHit, startBGM } from './audio';

// Eleanor's Monster Types!
const MONSTER_TYPES = [
  {
    id: 'bug',
    name: 'Flutter-Bug',
    Component: FlutterBug,
    size: 100,
    points: 10,
  },
  {
    id: 'roller',
    name: 'Big Blue',
    Component: BigBlue,
    size: 140,
    points: 20,
  }
];

export default function App() {
  const [scoreP1, setScoreP1] = useState(0); // Red Player
  const [scoreP2, setScoreP2] = useState(0); // Blue Player
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1); // For web simulation
  const [monsters, setMonsters] = useState<{id: number, type: any, startX: number, endX: number, y: number, duration: number, splatted: boolean, hitBy?: 1 | 2}[]>([]);
  const [bossActive, setBossActive] = useState(false);
  const [bossHits, setBossHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [nextBossScore, setNextBossScore] = useState(200);
  const [gameStarted, setGameStarted] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<{id: number, text: string, x: number, y: number, colorClass: string}[]>([]);
  const [shake, setShake] = useState(false);
  const monsterIdCounter = useRef(0);

  // Timer
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameStarted]);

  // Spawn monsters!
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return; // Stop spawning if game over

    const interval = setInterval(() => {
      const type = MONSTER_TYPES[Math.floor(Math.random() * MONSTER_TYPES.length)];
      const startLeft = Math.random() > 0.5;
      const duration = Math.random() * 3 + 4; // 4 to 7 seconds to cross
      
      const newMonster = {
        id: monsterIdCounter.current++,
        type: type,
        startX: startLeft ? -20 : 120, // Start offscreen left or right
        endX: startLeft ? 120 : -20,   // Move to the other side
        y: Math.random() * 80 + 10,    // 10% to 90% of screen height
        duration: duration,
        splatted: false
      };
      
      setMonsters(prev => {
        if (prev.length >= 10) return prev; // Limit to 10 monsters!
        return [...prev, newMonster];
      });

      // Remove after it crosses the screen
      setTimeout(() => {
        setMonsters(prev => prev.filter(m => m.id !== newMonster.id));
      }, duration * 1000);

    }, 200); // Fast spawn rate for >20 monsters!

    return () => clearInterval(interval);
  }, [timeLeft, gameStarted]);

  // Boss trigger
  useEffect(() => {
    if ((scoreP1 + scoreP2) >= nextBossScore && !bossActive && timeLeft > 0) {
      setBossActive(true);
      setBossHits(0);
    }
  }, [scoreP1, scoreP2, bossActive, nextBossScore, timeLeft]);

  const handleHit = (id: number, isBoss: boolean = false) => {
    if (timeLeft <= 0 || !gameStarted) return;

    if (isBoss) {
      playBossHit();
      setShake(true);
      setTimeout(() => setShake(false), 300);

      const hitNumber = bossHits + 1;
      const newHitText = {
        id: Date.now() + Math.random(),
        text: `HIT NUMBER ${hitNumber}!`,
        x: Math.random() * 40 + 30,
        y: Math.random() * 20 + 30,
        colorClass: activePlayer === 1 ? 'text-red-500' : 'text-blue-500'
      };
      setFloatingTexts(prev => [...prev, newHitText]);
      setTimeout(() => {
        setFloatingTexts(prev => prev.filter(t => t.id !== newHitText.id));
      }, 1500);

      if (activePlayer === 1) setScoreP1(p => p + 50);
      else setScoreP2(p => p + 50);

      if (bossHits < 19) {
        setBossHits(prev => prev + 1);
        // Boss hit effect!
      } else {
        // Boss defeated!
        setBossActive(false);
        setBossHits(20);
        if (activePlayer === 1) setScoreP1(p => p + 500);
        else setScoreP2(p => p + 500);
        setNextBossScore(prev => prev + 1000); // Next boss in 1000 points
      }
      return;
    }

    playSplat();
    setMonsters(prev => prev.map(m => {
      if (m.id === id && !m.splatted) {
        if (activePlayer === 1) setScoreP1(s => s + m.type.points);
        else setScoreP2(s => s + m.type.points);
        return { ...m, splatted: true, hitBy: activePlayer };
      }
      return m;
    }));

    // Remove splatted monster after a short delay
    setTimeout(() => {
      setMonsters(prev => prev.filter(m => m.id !== id));
    }, 500);
  };

  if (!gameStarted) {
    return (
      <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <HauntedHouseBackground />
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-6xl font-black text-pink-500 mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-center">
            Eleanor's Haunted<br/>Monster Dash! 🏃‍♀️💨
          </h1>
          <button 
            onClick={() => {
              initAudio();
              startBGM();
              setGameStarted(true);
            }}
            className="bg-green-500 text-white text-5xl font-bold py-6 px-12 rounded-full hover:bg-green-600 active:scale-95 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.6)]"
          >
            START GAME! ▶️
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      animate={shake ? { x: [-15, 15, -15, 15, 0], y: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.3 }}
      className="w-screen h-screen bg-slate-950 overflow-hidden relative select-none touch-none font-sans"
    >
      <HauntedHouseBackground />

      {/* HUD */}
      <div className="absolute top-4 left-8 flex flex-col items-start z-50">
        <div className="text-5xl font-black text-red-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          P1 (RED): {scoreP1}
        </div>
      </div>

      <div className="absolute top-4 right-8 flex flex-col items-end z-50">
        <div className="text-5xl font-black text-blue-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          P2 (BLUE): {scoreP2}
        </div>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
        <div className="text-6xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Simulator Toggle (For Web Testing) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 p-4 rounded-full flex gap-4 z-50 border-4 border-slate-700">
        <button 
          onClick={() => setActivePlayer(1)}
          className={`px-6 py-3 rounded-full font-bold text-2xl transition-transform ${activePlayer === 1 ? 'bg-red-500 text-white scale-110 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-slate-700 text-slate-400'}`}
        >
          🔴 Throw Red Ball
        </button>
        <button 
          onClick={() => setActivePlayer(2)}
          className={`px-6 py-3 rounded-full font-bold text-2xl transition-transform ${activePlayer === 2 ? 'bg-blue-500 text-white scale-110 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-slate-700 text-slate-400'}`}
        >
          🔵 Throw Blue Ball
        </button>
      </div>

      {/* Little Monsters */}
      <AnimatePresence>
        {monsters.map(monster => (
          <motion.div
            key={monster.id}
            initial={{ x: `${monster.startX}vw`, y: 0, scale: 0, opacity: 0 }}
            animate={
              monster.splatted 
                ? { scale: 2, opacity: 0, rotate: 180 } // Splat animation!
                : { x: `${monster.endX}vw`, y: [0, -30, 0], rotate: [-10, 10, -10], scale: 1, opacity: 1 } // Creeping across
            }
            exit={{ scale: 0, opacity: 0 }}
            transition={
              monster.splatted
                ? { duration: 0.2 }
                : { 
                    x: { duration: monster.duration, ease: "linear" },
                    y: { repeat: Infinity, duration: 0.4, ease: "easeInOut" }, // Fast bobbing = tiptoeing/creeping
                    rotate: { repeat: Infinity, duration: 0.8, ease: "easeInOut" }, // Waddle
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.2 }
                  }
            }
            onClick={() => handleHit(monster.id)}
            onPointerDown={() => handleHit(monster.id)} // Better for touch/projector
            className="absolute cursor-pointer flex items-center justify-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] z-10"
            style={{
              left: 0,
              top: `${monster.y}%`,
              width: monster.type.size,
              height: monster.type.size,
            }}
          >
            {/* Simple representation of her drawings */}
            <monster.type.Component size={monster.type.size} />
            {monster.splatted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute w-full h-full rounded-full opacity-50 blur-md ${monster.hitBy === 1 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                <div className="text-6xl z-10">💥</div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* THE BOSS MONSTER! */}
      <AnimatePresence>
        {bossActive && (
          <motion.div
            initial={{ x: '-50vw', y: 0, scale: 0 }}
            animate={{ x: ['-50vw', '120vw', '-50vw'], y: [0, 40, 0], rotate: [-5, 5, -5], scale: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ 
              x: { repeat: Infinity, duration: 15, ease: "linear" },
              y: { repeat: Infinity, duration: 0.8, ease: "easeInOut" }, // Creeping bob
              rotate: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }, // Creeping waddle
              scale: { duration: 0.5 }
            }}
            onClick={() => handleHit(0, true)}
            onPointerDown={() => handleHit(0, true)}
            className="absolute top-1/3 cursor-pointer flex flex-col items-center justify-center drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] z-40"
            style={{
              width: 300,
              height: 350,
            }}
          >
            <BananaBoss size={300} />
            <div className="absolute -bottom-8 text-2xl font-black text-white bg-red-500 px-4 py-2 rounded-full whitespace-nowrap">
              BOSS HITS: {bossHits} / 20
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Hit Texts */}
      <AnimatePresence>
        {floatingTexts.map(ft => (
          <motion.div
            key={ft.id}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1.5 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={`absolute font-black text-5xl drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)] z-50 pointer-events-none whitespace-nowrap ${ft.colorClass}`}
            style={{ left: `${ft.x}%`, top: `${ft.y}%` }}
          >
            {ft.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Time's Up Screen */}
      {timeLeft <= 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-white p-12 rounded-3xl text-center shadow-2xl"
          >
            <div className="text-8xl mb-4">⏰🎉</div>
            <h1 className="text-6xl font-black text-purple-600 mb-4">TIME'S UP ELEANOR!</h1>
            <div className="flex justify-center gap-12 my-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500">PLAYER 1</div>
                <div className="text-6xl font-black text-red-600">{scoreP1}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">PLAYER 2</div>
                <div className="text-6xl font-black text-blue-600">{scoreP2}</div>
              </div>
            </div>
            <p className="text-5xl font-black text-yellow-500 mb-8">
              {scoreP1 > scoreP2 ? "🔴 PLAYER 1 WINS!" : scoreP2 > scoreP1 ? "🔵 PLAYER 2 WINS!" : "🤝 IT'S A TIE!"}
            </p>
            <button 
              onClick={() => { 
                setScoreP1(0); 
                setScoreP2(0); 
                setBossHits(0); 
                setBossActive(false); 
                setTimeLeft(600);
                setNextBossScore(200);
                setMonsters([]);
              }}
              className="mt-8 bg-green-500 text-white text-3xl font-bold py-4 px-8 rounded-full hover:bg-green-600 active:scale-95 transition-transform"
            >
              PLAY AGAIN! 🔄
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
