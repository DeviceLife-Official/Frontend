import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GNB from '@/components/Home/GNB';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import SortDropdown from '@/components/Filter/SortDropdown';
import RoundedLifestyleTag from '@/components/Lifestyle/RoundedLifestyleTag';
import RecentlyViewedFloating from '@/components/RecentlyViewed/RecentlyViewedFloating';
import SettingIcon from '@/assets/icons/setting.svg?react';
import SupportIcon from '@/assets/icons/support.svg?react';
import SettingMoreIcon from '@/assets/icons/settingmore.svg?react';
import AlarmIcon from '@/assets/icons/alarm.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';
import BackIcon from '@/assets/icons/back.svg?react';
import CheckboxIcon from '@/assets/icons/checkbox.svg?react';
import CheckboxOnIcon from '@/assets/icons/checkbox_on.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';
import RemoveIcon from '@/assets/icons/remove.svg?react';
import SaveIcon from '@/assets/icons/save.svg?react';
import TopIcon from '@/assets/icons/top.svg?react';
import Logo from '@/assets/logos/logo.svg?react';
import { useGetCombos } from '@/apis/combo/getCombos';
import { useGetCombo } from '@/apis/combo/getCombo';
import { usePutCombo } from '@/apis/combo/putCombo';
import type { ComboListItem } from '@/types/combo/combo';

// 조합 평가 Mock 데이터
const MOCK_EVALUATION = {
  connectivity: {
    rating: '최상',
    description: 'Apple 기기 간의 연동성이 완벽합니다. AirDrop, Handoff, Universal Control 등의 기능을 자유롭게 사용할 수 있습니다.',
    tags: ['AirDrop', 'Handoff', 'Universal Control', 'iCloud 동기화'],
  },
  convenience: {
    rating: '최상',
    description: '모든 기기가 USB-C 포트를 사용합니다. 하나의 충전기와 케이블로 모든 기기를 충전할 수 있습니다.',
    tags: ['USB-C', 'N개 기기 해당'],
  },
  lifestyle: {
    rating: '최상',
    description: '모든 기기가 USB-C 포트를 사용합니다. 하나의 충전기와 케이블로 모든 기기를 충전할 수 있습니다.',
    tags: ['#Game'],
  },
};

const MYPAGE_SORT_OPTIONS = [
  { value: 'latest', label: '최근생성순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'alphabetical', label: '가나다순' },
];

// 날짜 포맷 함수 (ISO -> YYYY.MM.DD)
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const MyPage = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('latest');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [detailViewComboId, setDetailViewComboId] = useState<number | null>(null);
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCombinationDeleteModal, setShowCombinationDeleteModal] = useState(false);
  const [deleteTargetComboId, setDeleteTargetComboId] = useState<number | null>(null);
  const [editingComboId, setEditingComboId] = useState<number | null>(null);
  const [editingCombinationName, setEditingCombinationName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const combinationListRef = useRef<HTMLDivElement>(null);

  // API 호출
  const { data: combos = [], isLoading, isError } = useGetCombos();
  const { data: comboDetail } = useGetCombo(detailViewComboId);
  const { mutate: updateCombo, isPending: isUpdating } = usePutCombo();

  // 정렬된 조합 목록
  const sortedCombos = useMemo(() => {
    const sorted = [...combos];

    // 먼저 isPinned 기준으로 정렬 (즐겨찾기가 상단)
    sorted.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

    // 그 다음 선택된 정렬 옵션 적용
    const pinnedCombos = sorted.filter(c => c.isPinned);
    const unpinnedCombos = sorted.filter(c => !c.isPinned);

    const sortUnpinned = (arr: ComboListItem[]) => {
      switch (sortOption) {
        case 'latest':
          return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'oldest':
          return arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'alphabetical':
          return arr.sort((a, b) => a.comboName.localeCompare(b.comboName, 'ko'));
        default:
          return arr;
      }
    };

    return [...pinnedCombos, ...sortUnpinned(unpinnedCombos)];
  }, [combos, sortOption]);

  // 스크롤 감지 (하단 그라데이션용 + Top 버튼용)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 50);

      // 조합 3개 정도 스크롤 시 Top 버튼 표시 (약 800px)
      if (combinationListRef.current) {
        const listTop = combinationListRef.current.offsetTop;
        const thirdCombinationVisible = scrollTop + windowHeight >= listTop + 800;
        setShowTopButton(thirdCombinationVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 브레이크포인트 감지 (칼럼 수 반응형)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1536px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setColumns(e.matches ? 4 : 3);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
        setHoveredMenuItem(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 자세히보기 클릭 핸들러
  const handleDetailView = (comboId: number) => {
    setSavedScrollPosition(window.scrollY);
    setDetailViewComboId(comboId);
    setOpenMenuIndex(null);
    setSelectedDevices([]);
    window.scrollTo(0, 0);
  };

  // 뒤로가기 핸들러
  const handleBackToNormal = () => {
    setDetailViewComboId(null);
    setSelectedDevices([]);
    window.scrollTo(0, savedScrollPosition);
  };

  // 전체 선택 핸들러
  const handleSelectAll = (deviceIds: number[]) => {
    if (selectedDevices.length === deviceIds.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(deviceIds);
    }
  };

  // 개별 선택 핸들러
  const handleSelectDevice = (deviceId: number) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
    );
  };

  // 선택된 기기 삭제 핸들러
  const handleDeleteDevices = () => {
    // API 연동 시 실제 삭제 로직 추가
    console.log('Nove ==== 삭제할 기기 ID:', selectedDevices);
    setSelectedDevices([]);
    setShowDeleteModal(false);
  };

  // 휴지통 클릭 핸들러
  const handleTrashClick = () => {
    if (selectedDevices.length > 0) {
      setShowDeleteModal(true);
    }
  };

  // 조합 삭제 핸들러
  const handleDeleteCombination = () => {
    // API 연동 시 실제 삭제 로직 추가
    console.log('삭제할 조합 comboId:', deleteTargetComboId);
    setShowCombinationDeleteModal(false);
    setDeleteTargetComboId(null);
    // 자세히보기 모드였다면 일반 모드로 복귀
    if (detailViewComboId !== null) {
      setDetailViewComboId(null);
      setSelectedDevices([]);
    }
  };

  // 조합명 저장 핸들러
  const handleSaveCombinationName = () => {
    if (editingComboId === null) return;

    updateCombo(
      { comboId: editingComboId, comboName: editingCombinationName },
      {
        onSuccess: () => {
          setShowSaveModal(false);
          setEditingComboId(null);
        },
        onError: (error) => {
          console.error('조합명 수정 실패:', error);
        },
      }
    );
  };

  // 맨 위로 스크롤
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-white relative ${isAtBottom ? 'bg-effect-fade-bottom' : ''}`}>
      <GNB />

      <div className="flex pt-52">
        {/* 좌측 사이드바 */}
        <aside
          className="flex-shrink-0 pt-64 w-280"
          style={{ marginLeft: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)' }}
        >
          {/* 사이드바 콘텐츠 wrapper */}
          <div ref={sidebarContentRef}>
            {/* MY Page 헤더 */}
            <div className="flex items-center justify-between h-72">
              <h1 className="font-heading-2 text-black">MY Page</h1>
              <div className="flex items-center gap-8">
                <a
                  href="https://lovely-potassium-7f2.notion.site/2f0c82f125c980fa8fa0d2ef430bbe79?pvs=74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-42 h-42 flex items-center justify-center cursor-pointer hover:opacity-80">
                  <SupportIcon className="w-42 h-42 text-black" />
                </a>
                <button
                  onClick={() => navigate('/my/settings/profile')}
                  className="w-44 h-44 flex items-center justify-center cursor-pointer hover:opacity-80"
                >
                  <SettingIcon className="w-44 h-44 text-black" />
                </button>
              </div>
            </div>

            {/* 프로필 카드 */}
            <div className="mt-60 h-100 rounded-card border border-blue-300 flex items-center justify-center gap-30">
              <Logo className="w-48 h-48 flex-shrink-0" />
              <p className="font-heading-2 text-black">000 님</p>
            </div>

            {/* 사용자 정보 */}
            <div className="mt-44 flex flex-col gap-16">
              <div className="flex items-center gap-24">
                <p className="font-body-2-sm text-black whitespace-nowrap">가입일</p>
                <p className="font-body-2-r text-black">2023.12.22</p>
              </div>
              <div className="flex items-center gap-24">
                <p className="font-body-2-sm text-black whitespace-nowrap">이메일</p>
                <p className="font-body-2-r text-black truncate">example@devicelife.com</p>
              </div>
              <div className="flex items-center gap-24">
                <p className="font-body-2-sm text-black whitespace-nowrap">라이프스타일</p>
                <div className="flex flex-wrap gap-12 content-start">
                  <RoundedLifestyleTag label="Office" />
                </div>
              </div>
            </div>
          </div>

          {/* 최근에 본 기기 플로팅 섹션 */}
          <RecentlyViewedFloating
            userName="000"
            sidebarContentRef={sidebarContentRef}
          />
        </aside>

        {/* 우측 메인 콘텐츠 */}
        <main
          className="flex-1 pt-64"
          style={{
            paddingLeft: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)',
            paddingRight: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)',
          }}
        >
          {/* 헤더: 내 조합 + 새 조합 추가하기 / 조합 삭제하기 */}
          <div className="flex items-center justify-between h-72">
            <h2 className="font-heading-2 text-black">내 조합</h2>
            {detailViewComboId !== null ? (
              <button
                onClick={() => {
                  setDeleteTargetComboId(detailViewComboId);
                  setShowCombinationDeleteModal(true);
                }}
                className="w-280 h-52 border-2 border-warning rounded-button flex items-center justify-center cursor-pointer hover:bg-warning/10 transition-colors"
              >
                <span className="font-body-2-sm text-warning">조합 삭제하기</span>
              </button>
            ) : (
              <PrimaryButton
                text="새 조합 추가하기"
                className="w-280 bg-blue-600 hover:bg-blue-500"
              />
            )}
          </div>

          {/* 조합 카드 목록 */}
          <div ref={combinationListRef} className="mt-76 flex flex-col gap-40">
            {isLoading && (
              <div className="flex items-center justify-center py-100">
                <p className="font-body-2-r text-gray-400">조합 목록을 불러오는 중...</p>
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center py-100">
                <p className="font-body-2-r text-warning">조합 목록을 불러오는데 실패했습니다.</p>
              </div>
            )}
            {!isLoading && !isError && sortedCombos.length === 0 && (
              <div className="flex items-center justify-center py-100">
                <p className="font-body-2-r text-gray-400">등록된 조합이 없습니다.</p>
              </div>
            )}
            {sortedCombos.map((combination, index) => {
              const isDetailView = detailViewComboId === combination.comboId;
              const hasDevices = combination.deviceCount > 0;

              // 상세보기 모드: 선택된 조합만 표시하고, 상세 정보의 devices 사용
              const devices = isDetailView && comboDetail ? comboDetail.devices : [];
              const deviceIds = devices.map((d) => d.deviceId);

              // 상세보기 모드일 때 선택된 조합만 표시
              if (detailViewComboId !== null && !isDetailView) {
                return null;
              }

              return (
                <div key={combination.comboId}>
                  {/* 추천 메시지 + 정렬 필터 - 상세보기 모드가 아닐 때만 표시 */}
                  {!isDetailView && (
                    <div className="flex items-center justify-between mb-24">
                      <div className="flex items-center gap-16">
                        <AlarmIcon className="w-36 h-36 text-blue-600 flex-shrink-0" />
                        <p className="font-body-2-r text-blue-600">
                          {hasDevices
                            ? '추천하는 조합입니다. 기기 간 호환성이 우수하며 만족도가 높을 것입니다.'
                            : '-'}
                        </p>
                      </div>
                      {index === 0 && sortedCombos.length > 1 && (
                        <SortDropdown
                          options={MYPAGE_SORT_OPTIONS}
                          selectedValue={sortOption}
                          onSelect={setSortOption}
                        />
                      )}
                    </div>
                  )}

                  {/* 조합 카드 */}
                  <div
                    onClick={() => !isDetailView && editingComboId !== combination.comboId && hasDevices && handleDetailView(combination.comboId)}
                    className={`rounded-card relative ${
                      isDetailView
                        ? 'bg-blue-100'
                        : `bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-colors ${hasDevices ? 'cursor-pointer hover:bg-gray-50' : ''}`
                    }`}
                  >
                    {/* 일반 모드: Setting More 버튼 + 드롭다운 또는 저장하기 버튼 */}
                    {!isDetailView && (
                      <div
                        ref={openMenuIndex === combination.comboId ? menuRef : null}
                        className={`absolute right-56 ${editingComboId === combination.comboId ? 'top-28' : 'top-36'}`}
                      >
                        {editingComboId === combination.comboId ? (
                          /* 수정 모드: 저장하기 버튼 */
                          <SecondaryButton
                            text="저장하기"
                            onClick={() => {
                              setShowSaveModal(true);
                            }}
                            className="w-150"
                          />
                        ) : (
                          /* 일반 모드: ... 버튼 */
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuIndex(openMenuIndex === combination.comboId ? null : combination.comboId);
                            }}
                            className="cursor-pointer hover:opacity-80"
                          >
                            <SettingMoreIcon className="w-36 h-36 text-gray-400" />
                          </button>
                        )}

                        {/* 드롭다운 메뉴 */}
                        {openMenuIndex === combination.comboId && (
                          <div className="absolute right-0 top-full mt-8 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-8 z-12 flex flex-col">
                            {/* 삭제하기 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTargetComboId(combination.comboId);
                                setShowCombinationDeleteModal(true);
                                setOpenMenuIndex(null);
                              }}
                              onMouseEnter={() => setHoveredMenuItem('delete')}
                              onMouseLeave={() => setHoveredMenuItem(null)}
                              className="relative font-body-1-sm text-red-500 text-left py-12 whitespace-nowrap cursor-pointer border-b border-black/50"
                            >
                              {hoveredMenuItem === 'delete' && (
                                <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
                              )}
                              삭제하기
                            </button>

                            {/* 조합명 수정하기 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingComboId(combination.comboId);
                                setEditingCombinationName(combination.comboName);
                                setOpenMenuIndex(null);
                              }}
                              onMouseEnter={() => setHoveredMenuItem('rename')}
                              onMouseLeave={() => setHoveredMenuItem(null)}
                              className={`relative font-body-1-sm text-black text-left py-12 whitespace-nowrap cursor-pointer ${hasDevices ? 'border-b border-black/50' : ''}`}
                            >
                              {hoveredMenuItem === 'rename' && (
                                <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
                              )}
                              조합명 수정하기
                            </button>

                            {/* 자세히보기 - 기기가 있을 때만 표시 */}
                            {hasDevices && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDetailView(combination.comboId);
                                }}
                                onMouseEnter={() => setHoveredMenuItem('detail')}
                                onMouseLeave={() => setHoveredMenuItem(null)}
                                className="relative font-body-1-sm text-black text-left py-12 whitespace-nowrap cursor-pointer"
                              >
                                {hoveredMenuItem === 'detail' && (
                                  <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
                                )}
                                자세히보기
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 상세보기 모드 */}
                    {isDetailView ? (
                      <div className="pt-16 cursor-auto" onClick={(e) => e.stopPropagation()}>
                        {/* 뒤로가기 버튼 */}
                        <div className="px-36 pt-20">
                          <button
                            onClick={handleBackToNormal}
                            className="p-10 cursor-pointer hover:opacity-80"
                          >
                            <BackIcon className="w-34 h-34 text-gray-400 [&>rect]:hidden" />
                          </button>
                        </div>

                        {/* 조합 정보 */}
                        <div className="flex flex-col gap-24 pl-56 py-24">
                          <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-16">
                              <p className="font-body-2-r text-gray-400">조합{index + 1}</p>
                              <p className="font-body-2-r text-gray-400">
                                생성일: {formatDate(combination.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center gap-8">
                              <p className="font-heading-3 text-black">{combination.comboName}</p>
                              {combination.isPinned && <StarIcon className="w-27 h-27" />}
                            </div>
                          </div>
                        </div>

                        {/* 전체 선택 + 휴지통 */}
                        <div className="px-56">
                          <div className="flex items-center justify-between pb-16 border-b border-gray-300">
                            <div className="flex items-center gap-8">
                              <button
                                onClick={() => handleSelectAll(deviceIds)}
                                className="cursor-pointer"
                              >
                                {selectedDevices.length === devices.length && devices.length > 0 ? (
                                  <CheckboxOnIcon className="w-28 h-28" />
                                ) : (
                                  <CheckboxIcon className="w-28 h-28" />
                                )}
                              </button>
                              <p className="font-body-1-r text-black">전체 선택하기</p>
                            </div>
                            <button
                              onClick={handleTrashClick}
                              className="cursor-pointer hover:opacity-80"
                            >
                              <TrashIcon className="w-28 h-28 text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* 안내 텍스트 */}
                        <p className="px-56 pt-36 font-caption-r text-blue-800">
                          *마우스를 기기 위에 올려서 기기 상세정보를 확인하실 수도 있습니다.
                        </p>

                        {/* 기기 그리드 (체크박스 포함) */}
                        <div className="px-56 pt-36 pb-36">
                          <div
                            className={`grid ${columns === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-x-28 gap-y-12`}
                          >
                            {devices.map((device) => (
                              <div
                                key={device.deviceId}
                                onClick={() => window.open(`/devices?productId=${device.deviceId}`, '_blank')}
                                className={`bg-white rounded-card shadow-[0_0_4px_rgba(0,0,0,0.1)] p-12 w-244 flex items-center gap-12 border cursor-pointer hover:shadow-[0_0_7px_#57a0ff] transition-shadow ${selectedDevices.includes(device.deviceId) ? 'border-blue-600' : 'border-transparent'}`}
                              >
                                <div className="w-64 h-64 bg-gray-200 flex-shrink-0 relative group/image">
                                  {/* 호버 오버레이 */}
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white px-8 py-4 rounded-tag font-caption-r text-black">
                                      보기
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-4 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-body-3-sm text-black truncate w-120">
                                      {device.name}
                                    </p>
                                    {/* 체크박스 - 기기명과 같은 높이 */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectDevice(device.deviceId);
                                      }}
                                      className="cursor-pointer flex-shrink-0"
                                    >
                                      {selectedDevices.includes(device.deviceId) ? (
                                        <CheckboxOnIcon className="w-24 h-24" />
                                      ) : (
                                        <CheckboxIcon className="w-24 h-24" />
                                      )}
                                    </button>
                                  </div>
                                  <p className="font-body-4-r text-gray-300">{device.brandName || '-'}</p>
                                  <p className="font-body-3-r text-gray-300">{device.deviceType || '-'}</p>
                                </div>
                              </div>
                            ))}
                            {/* 기기 추가 버튼 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/devices');
                              }}
                              className="cursor-pointer hover:opacity-80"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                        </div>

                        {/* 총 가격 */}
                        <div className="px-56 pb-36">
                          <div className="flex items-center gap-24 p-20">
                            <p className="font-body-1-sm text-black">총 가격</p>
                            <div className="flex items-center gap-4">
                              <p className="font-body-1-sm text-blue-600">₩</p>
                              <p className="font-body-1-sm text-blue-600">
                                {(comboDetail?.totalPrice ?? combination.totalPrice).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 구분선 */}
                        <div className="mx-44 border-t border-gray-300" />

                        {/* 조합 평가 정보 */}
                        <div className="px-56 py-56">
                          <div className="flex items-center justify-end gap-16 mb-32">
                            <p className="font-body-2-r text-gray-400 underline">조합평가 전문보기</p>
                          </div>

                          <div className="flex flex-col gap-20">
                            {/* 연동성 */}
                            <div className="bg-white rounded-card px-42 py-30 flex flex-col gap-30">
                              <div className="flex items-center gap-16">
                                <p className="font-heading-4 text-black">연동성:</p>
                                <p className="font-heading-4 text-blue-600">
                                  {MOCK_EVALUATION.connectivity.rating}
                                </p>
                              </div>
                              <p className="font-body-3-r text-black leading-28">
                                {MOCK_EVALUATION.connectivity.description}
                              </p>
                              <div className="flex gap-8 -ml-4">
                                {MOCK_EVALUATION.connectivity.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-blue-200 text-blue-700 font-body-2-sm px-12 py-8 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* 편의성 */}
                            <div className="bg-white rounded-card px-42 py-30 flex flex-col gap-30">
                              <div className="flex items-center gap-16">
                                <p className="font-heading-4 text-black">편의성:</p>
                                <p className="font-heading-4 text-blue-600">
                                  {MOCK_EVALUATION.convenience.rating}
                                </p>
                              </div>
                              <p className="font-body-3-r text-black leading-28">
                                {MOCK_EVALUATION.convenience.description}
                              </p>
                              <div className="flex gap-8 -ml-4">
                                {MOCK_EVALUATION.convenience.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-[#bdf8e1] text-[#00719f] font-body-2-sm px-12 py-8 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* 라이프스타일 */}
                            <div className="bg-white rounded-card px-42 py-30 flex flex-col gap-30">
                              <div className="flex items-center gap-16">
                                <p className="font-heading-4 text-black">라이프스타일:</p>
                                <p className="font-heading-4 text-blue-600">
                                  {MOCK_EVALUATION.lifestyle.rating}
                                </p>
                              </div>
                              <p className="font-body-3-r text-black leading-28">
                                {MOCK_EVALUATION.lifestyle.description}
                              </p>
                              <div className="flex gap-8 -ml-4">
                                {MOCK_EVALUATION.lifestyle.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-[#fee8c3] text-[#fb7104] font-body-2-sm px-12 py-8 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* 일반 모드 */
                      <>
                        {hasDevices ? (
                          <div className="px-36 pt-24 pb-36">
                            {/* 조합 정보 (생성일 포함) */}
                            <div className="flex flex-col gap-13 pl-20 py-24">
                              {editingComboId === combination.comboId ? (
                                /* 수정 모드: 인풋박스 + 별 아이콘 */
                                <div className="flex items-center gap-8 min-h-48">
                                  <input
                                    type="text"
                                    value={editingCombinationName}
                                    onChange={(e) => setEditingCombinationName(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-52 px-12 border border-blue-600 rounded-button font-body-1-sm text-gray-300 focus:outline-none"
                                  />
                                  {combination.isPinned && <StarIcon className="w-22 h-22" />}
                                </div>
                              ) : (
                                /* 일반 모드: 조합 번호 + 생성일 + 조합명 */
                                <div className="flex flex-col gap-8">
                                  <div className="flex items-center gap-16">
                                    <p className="font-body-3-r text-gray-400">조합{index + 1}</p>
                                    <p className="font-body-3-r text-gray-400">
                                      생성일: {formatDate(combination.createdAt)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-8">
                                    <p className="font-body-1-sm text-black">{combination.comboName}</p>
                                    {combination.isPinned && <StarIcon className="w-27 h-27" />}
                                  </div>
                                </div>
                              )}
                              {/* Tags - API에서 태그 정보 제공 시 구현 */}
                            </div>

                            {/* 기기 그리드 - 일반 모드에서는 deviceCount만 표시 */}
                            <div className="pl-8 mt-24 relative">
                              <div className="flex items-center gap-8">
                                <p className="font-body-2-r text-gray-400">
                                  등록된 기기: {combination.deviceCount}개
                                </p>
                                <p className="font-body-2-r text-gray-400">|</p>
                                <p className="font-body-2-r text-gray-400">
                                  자세히 보려면 클릭하세요
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="px-36 pt-24 pb-36">
                            {/* 조합 정보 (생성일 포함) */}
                            <div className="flex flex-col gap-24 pl-20 py-24">
                              {/* 조합 번호 + 생성일 + 조합명 */}
                              <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-16">
                                  <p className="font-body-4-r text-gray-400">조합{index + 1}</p>
                                  <p className="font-body-4-r text-gray-400">
                                    생성일: {formatDate(combination.createdAt)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-8">
                                  <p className="font-body-1-sm text-black">{combination.comboName}</p>
                                  {combination.isPinned && <StarIcon className="w-27 h-27" />}
                                </div>
                              </div>
                              {/* Tags - API에서 태그 정보 제공 시 구현 */}
                            </div>

                            {/* 빈 조합: 기기 추가 버튼 */}
                            <div className="pl-8 mt-24">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // 카드 클릭 전파 방지 (상세보기 진입 막기)
                                  navigate('/devices');
                                }}
                                className="cursor-pointer hover:opacity-80"
                              >
                                <PlusIcon />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Button - 조합 3개 정도 스크롤 시 표시 */}
          {showTopButton && (
            <button
              onClick={handleScrollToTop}
              className="fixed right-48 bottom-48 w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300"
              aria-label="맨 위로 이동"
            >
              <TopIcon className="w-48 h-48 text-gray-300" />
            </button>
          )}

          {/* 하단 여백 */}
          <div className="h-268" />
        </main>
      </div>

      {/* 기기 삭제 확인 모달 */}
      {showDeleteModal && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 z-60"
            onClick={() => setShowDeleteModal(false)}
          />
          {/* 모달 */}
          <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-none">
            <div
              className="bg-white rounded-card w-460 px-36 py-44 flex flex-col items-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 아이콘 */}
              <RemoveIcon className="w-58 h-58" />

              {/* 텍스트 */}
              <p className="font-body-2-r text-black mt-36">
                선택한 기기들을 삭제하시겠습니까?
              </p>

              {/* 버튼 그룹 */}
              <div className="flex gap-20 mt-60">
                <button
                  onClick={handleDeleteDevices}
                  className="w-168 h-52 bg-red-500 hover:bg-red-400 rounded-button flex items-center justify-center cursor-pointer transition-colors"
                >
                  <span className="font-body-2-sm text-white">삭제</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-168 h-52 bg-gray-100 hover:bg-gray-200 rounded-button flex items-center justify-center cursor-pointer transition-colors"
                >
                  <span className="font-body-2-sm text-black">취소</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 조합 삭제 확인 모달 */}
      {showCombinationDeleteModal && deleteTargetComboId !== null && (() => {
        const targetCombo = sortedCombos.find(c => c.comboId === deleteTargetComboId);
        if (!targetCombo) return null;
        return (
          <>
            {/* 배경 오버레이 */}
            <div
              className="fixed inset-0 bg-black/50 z-60"
              onClick={() => {
                setShowCombinationDeleteModal(false);
                setDeleteTargetComboId(null);
              }}
            />
            {/* 모달 */}
            <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-none">
              <div
                className="bg-white rounded-card w-460 px-36 py-44 flex flex-col items-center pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 아이콘 */}
                <RemoveIcon className="w-58 h-58" />

                {/* 텍스트 */}
                <p className="font-body-2-r text-black mt-36">
                  '<span className="font-body-2-sm">{targetCombo.comboName}</span>'을 삭제하시겠습니까?
                </p>

                {/* 버튼 그룹 */}
                <div className="flex gap-20 mt-60">
                  <button
                    onClick={handleDeleteCombination}
                    className="w-168 h-52 bg-red-500 hover:bg-red-400 rounded-button flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <span className="font-body-2-sm text-white">삭제</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowCombinationDeleteModal(false);
                      setDeleteTargetComboId(null);
                    }}
                    className="w-168 h-52 bg-gray-100 hover:bg-gray-200 rounded-button flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <span className="font-body-2-sm text-black">취소</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })()}

      {/* 조합명 저장 확인 모달 */}
      {showSaveModal && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 z-60"
            onClick={() => setShowSaveModal(false)}
          />
          {/* 모달 */}
          <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-none">
            <div
              className="bg-white rounded-card w-460 px-36 py-44 flex flex-col items-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 아이콘 */}
              <SaveIcon className="w-58 h-58 text-blue-600" />

              {/* 텍스트 */}
              <p className="font-body-2-r text-black mt-36">
                조합명을 저장하시겠습니까?
              </p>

              {/* 버튼 그룹 */}
              <div className="flex gap-20 mt-60">
                <button
                  onClick={handleSaveCombinationName}
                  disabled={isUpdating}
                  className="w-168 h-52 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-button flex items-center justify-center cursor-pointer transition-colors"
                >
                  <span className="font-body-2-sm text-white">
                    {isUpdating ? '저장 중...' : '확인'}
                  </span>
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  disabled={isUpdating}
                  className="w-168 h-52 bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed rounded-button flex items-center justify-center cursor-pointer transition-colors"
                >
                  <span className="font-body-2-sm text-black">취소</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPage;