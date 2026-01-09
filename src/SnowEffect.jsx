import { useEffect, useState } from "react";

const SN1 = "/backend/image/SN1.png";
const SN2 = "/backend/image/SN2.png";

function SnowEffect({ count = 50 }) {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = (id) => ({
      id,
      left: Math.random() * 100,
      fallDuration: Math.random() * 4 + 4,
      fallDelay: Math.random() * 6,
      spinX: Math.random() * 170,  // rotateX 랜덤
      spinY: Math.random() * 170,  // rotateY 랜덤
      spinDuration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.2 + 0.8,
      size: Math.random() * 40 + 40,
    });

    const initial = Array.from({ length: count }, (_, i) => createSnowflake(i));
    setSnowflakes(initial);

    const interval = setInterval(() => {
      setSnowflakes((prev) =>
        prev.map((f) => ({ ...createSnowflake(f.id), id: f.id }))
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [count]);

  const snowImages = [SN1, SN2];

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-15vh); }
          100% { transform: translateY(120vh); }
        }

        /* 3D 회전용 키프레임 */
        @keyframes spin3d {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        .snow-root {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 9999;
          perspective: 600px; /* 3D 효과 강화 */
        }

        .snow-wrap {
          color: white;
          position: absolute;
          top: 0;
          will-change: transform;
          text-shadow:
            0 0 5px rgba(255, 255, 255, 0.9),
            0 0 10px rgba(255, 255, 255, 0.7),
            0 0 15px rgba(255, 255, 255, 0.5),
            2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .emoji {
          display: inline-block;
          transform-style: preserve-3d; /* 3D 유지 */
          will-change: transform;
        }
      `}</style>

      <div className="snow-root">
        {snowflakes.map((f) => {
          const snowImage = snowImages[Math.floor(Math.random() * snowImages.length)];
          return (
            <div
              key={f.id}
              className="snow-wrap"
              style={{
                left: `${f.left}%`,
                opacity: f.opacity,
                animation: `fall ${f.fallDuration}s linear ${f.fallDelay}s infinite`,
                top: "-15vh"
              }}
            >
              <img
                src={snowImage}
                alt="snow"
                className="emoji"
                style={{
                  width: `${f.size}px`,
                  height: `${f.size}px`,
                  animation: `spin3d ${f.spinDuration}s linear infinite`,
                  transform: `rotateX(${f.spinX}deg) rotateY(${f.spinY}deg)`
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SnowEffect;
