import { useState, useCallback, useRef, useEffect } from 'react';
import useInterval from '@/hooks/useInterval';

// 타이머 옵션 타입
type UseTimerOptions = {
  /** 초기 시간 (초) */
  initialSeconds: number;
  /** 타이머가 만료되었을 때 호출될 콜백 */
  onExpire?: () => void;
  /** 타이머가 실행 중인지 여부 */
  enabled?: boolean;
};

// 타이머 반환 타입
type UseTimerReturn = {
  /** 남은 시간 (초) */
  timeLeft: number;
  /** 타이머 시작 함수 (처음 시작·재시작 모두 동일) */
  start: () => void;
  /** 타이머 정지 함수 */
  stop: () => void;
  /** 타이머가 실행 중인지 여부 */
  isRunning: boolean;
};

// 타이머 훅
const useTimer = ({ initialSeconds, onExpire, enabled = true }: UseTimerOptions): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onExpireRef = useRef(onExpire);

  // onExpire 콜백을 ref에 저장 (의존성 배열에 넣지 않아도 됨)
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // 매초마다 실행될 콜백
  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        // 시간이 만료되면 타이머 정지
        setIsRunning(false);
        // 만료 콜백 호출
        onExpireRef.current?.();
        return 0;
      }
      return prev - 1;
    });
  }, []);

  // useInterval로 매초마다 tick 실행
  // delay가 null이면 interval이 멈춤
  useInterval(tick, enabled && isRunning ? 1000 : null);

  // 타이머 시작 (처음 시작·재시작 모두 동일)
  const start = useCallback(() => {
    setTimeLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    timeLeft,
    start,
    stop,
    isRunning,
  };
};

export default useTimer;
