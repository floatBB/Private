import { useEffect, useRef } from 'react';

// 分镜版本日志：循环 faux-UI 动效，自播放、只能看不能点
export default function VersionLogDemo() {
  const winRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const verRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const win = winRef.current!;
    const cursor = cursorRef.current!;
    const row = rowRef.current!;
    const verEl = verRef.current!;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const centerOf = (el: HTMLElement) => {
      const f = win.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - f.left, y: r.top + r.height / 2 - f.top };
    };
    const moveTo = async (el: HTMLElement, dur: number) => {
      const p = centerOf(el);
      cursor.style.transition = `transform ${dur}ms cubic-bezier(.3,.7,.2,1)`;
      cursor.style.transform = `translate(${p.x - 4}px, ${p.y - 4}px)`;
      await sleep(dur);
    };
    const press = async () => {
      cursor.classList.add('pressing');
      await sleep(130);
      cursor.classList.remove('pressing');
    };
    const animateVal = (el: HTMLElement, from: number, to: number, dur: number, fmt: (v: number) => string) => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(from + (to - from) * e);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const reset = () => {
      cursor.style.transition = 'none';
      cursor.style.transform = 'translate(0,0)';
      row.classList.remove('is-hit');
      verEl.textContent = 'v14';
    };

    let cancelled = false;
    (async () => {
      while (!cancelled) {
        reset();
        await sleep(700);
        await moveTo(row, 400);
        await press();
        row.classList.add('is-hit');
        animateVal(verEl, 14, 15, 500, (n) => 'v' + Math.round(n));
        await sleep(900);
        win.classList.add('is-resetting');
        await sleep(300);
        reset();
        win.classList.remove('is-resetting');
        await sleep(300);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure className="demo">
      <div className="window" ref={winRef}>
        <div className="titlebar">
          <span className="t">分镜版本日志</span>
          <span className="f">THE CULLY HILL BOYS</span>
        </div>
        <div className="body">
          <div className="log-row" ref={rowRef}>
            <span className="log-id">102F</span>
            <span className="log-note">后台走廊 · 双人特写</span>
            <span className="log-ver" ref={verRef}>v14</span>
          </div>
          <div className="log-row">
            <span className="log-id">050B</span>
            <span className="log-note">俱乐部 · Oli 被拒</span>
            <span className="log-ver">v10</span>
          </div>
          <div className="log-row">
            <span className="log-id">047C</span>
            <span className="log-note">街道 · 追逐</span>
            <span className="log-ver">v9</span>
          </div>
        </div>
        <div className="cursor" ref={cursorRef}>
          <svg className="cursor-arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 3.2 L19 9.5 L12 12 L9.5 19 L5.5 3.2 Z" fill="#1a1a18" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <figcaption className="demo-note">循环演示 · 无需操作</figcaption>
    </figure>
  );
}
