type FloatingStyleSource = HTMLElement | null;

export const createFloating = ({
  text,
  startLeft,
  startTop,
  width,
  height,
  padding = 20,
}: {
  text: string;
  startLeft: number;
  startTop: number;
  width: number;
  height: number;
  padding?: number;
}) => {
  const floating = document.createElement('div');
  floating.textContent = text;
  floating.style.position = 'fixed';
  floating.style.left = `${startLeft}px`;
  floating.style.top = `${startTop}px`;
  floating.style.width = `${width}px`;
  floating.style.height = `${height}px`;
  floating.style.padding = `${padding}px`;
  floating.style.display = 'flex';
  floating.style.flexDirection = 'column';
  floating.style.justifyContent = 'center';
  floating.style.alignItems = 'center';
  floating.style.gap = '10px';
  floating.style.zIndex = '9999';
  floating.style.pointerEvents = 'none';
  floating.style.willChange = 'transform, opacity';
  floating.style.opacity = '1';
  document.body.appendChild(floating);
  return floating;
};

export const copyComputedStyle = (target: HTMLElement, source: FloatingStyleSource) => {
  if (!source) return;

  const cs = window.getComputedStyle(source);

  target.style.borderRadius = cs.borderRadius;
  target.style.boxShadow = cs.boxShadow;
  target.style.backgroundColor = cs.backgroundColor;
  target.style.border = cs.border;
  target.style.fontFamily = cs.fontFamily;
  target.style.fontSize = cs.fontSize;
  target.style.fontWeight = cs.fontWeight;
  target.style.lineHeight = cs.lineHeight;
  target.style.letterSpacing = cs.letterSpacing;
  target.style.color = cs.color;
  target.style.textAlign = cs.textAlign;
};

export const animateDrop = ({
  el,
  dx,
  dy,
  duration,
  easing,
}: {
  el: HTMLElement;
  dx: number;
  dy: number;
  duration: number;
  easing: string;
}) => {
  el.animate(
    [{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(${dx}px, ${dy}px, 0)` }],
    { duration, easing, fill: 'forwards' }
  );
};

export const fadeOutAndRemove = (el: HTMLElement, ms = 240) => {
  el.style.transition = `opacity ${ms}ms ease-out`;
  el.style.opacity = '0';
  window.setTimeout(() => el.remove(), ms + 20);
};
