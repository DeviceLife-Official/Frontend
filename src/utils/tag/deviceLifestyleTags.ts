import type { SearchDevice } from '@/types/devices';

/**
 * 기기 상세 정보의 specifications를 바탕으로 라이프스타일 스타일 태그를 생성합니다.
 */
export const getDeviceLifestyleTags = (device: SearchDevice): string[] => {
  const { deviceType, specifications: specs } = device;
  if (!specs) return [];

  const tags: string[] = [];

  switch (deviceType) {
    case 'SMARTPHONE':
    case 'TABLET':
      if (specs.storageGb) tags.push(`${specs.storageGb}GB`);
      if (specs.screenInch) tags.push(`${specs.screenInch}인치`);
      break;

    case 'LAPTOP':
      if (specs.cpu) tags.push(String(specs.cpu));
      if (specs.screenInch) tags.push(`${specs.screenInch}인치`);
      break;

    case 'SMARTWATCH':
      if (specs.caseSizeMm) tags.push(`${specs.caseSizeMm}mm`);
      if (specs.hasCellular !== undefined) {
        // 1이면 셀룰러, 0이면 GPS
        tags.push(Number(specs.hasCellular) === 1 ? '셀룰러' : 'GPS');
      }
      break;

    case 'AUDIO':
      if (Number(specs.hasAnc) === 1) tags.push('ANC');
      if (specs.totalBatteryLifeHours) tags.push(`${specs.totalBatteryLifeHours}시간`);
      break;

    case 'KEYBOARD':
      if (specs.switchType) {
        const switchMap: Record<string, string> = {
          BLUE: '청축',
          RED: '적축',
          BROWN: '갈축',
          SCISSOR: '펜타그래프',
        };
        const mapped = switchMap[String(specs.switchType).toUpperCase()];
        if (mapped) tags.push(mapped);
      }
      if (specs.connectionType) {
        tags.push(formatConnectionType(String(specs.connectionType)));
      }
      break;

    case 'MOUSE':
      if (specs.mouseType) {
        const mouseMap: Record<string, string> = {
          VERTICAL: '버티컬',
          TRACKBALL: '트랙볼',
        };
        const mapped = mouseMap[String(specs.mouseType).toUpperCase()];
        if (mapped) tags.push(mapped);
      }
      if (specs.connectionType) {
        tags.push(formatConnectionType(String(specs.connectionType)));
      }
      break;

    case 'CHARGER':
      if (specs.totalPowerW) tags.push(`${specs.totalPowerW}W`);
      if (Array.isArray(specs.portConfiguration)) {
        const portConfig = formatPortConfiguration(specs.portConfiguration);
        if (portConfig) tags.push(portConfig);
      }
      break;

    default:
      break;
  }

  return tags.filter(Boolean);
};

const formatConnectionType = (type: string): string => {
  const t = type.toUpperCase();
  if (t === 'BLUETOOTH') return '블루투스';
  if (t === 'WIRED') return '유선';
  // DONGLE이나 기타 무선 방식은 '무선'으로 표기
  return '무선';
};

const formatPortConfiguration = (ports: string[]): string => {
  let cCount = 0;
  let aCount = 0;

  ports.forEach((port) => {
    const p = port.toUpperCase();
    if (p.includes('USB_C')) cCount++;
    else if (p.includes('USB_A')) aCount++;
    else if (p.includes('C')) cCount++;
    else if (p.includes('A')) aCount++;
  });

  const result = [];
  if (cCount > 0) result.push(`${cCount}C`);
  if (aCount > 0) result.push(`${aCount}A`);

  return result.join('');
};
