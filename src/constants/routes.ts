// 앱 전체 라우트 경로를 한 곳에서 관리하기 위한 상수 모음

export const ROUTES = {
  // root
  home: '/',

  // auth flow
  auth: {
    base: '/auth',
    login: '/auth/login',
    findId: '/auth/find/id',
    findIdResult: '/auth/find/id/result',
    findPassword: '/auth/find/password',
    signup: {
      base: '/auth/signup',
      account: '/auth/signup/account',
      profile: '/auth/signup/profile',
    },
  },

  // onboarding
  onboarding: {
    lifestyle: '/onboarding/lifestyle',
    recommendation: '/onboarding/recommendation',
    combination: '/onboarding/combination',
    complete: '/onboarding/complete',
  },

  // lifestyle
  lifestyle: '/lifestyle',

  // devices
  devices: '/devices',
  deviceDetail: (deviceId: string) => `/devices/${deviceId}`,
  //navigate(ROUTES.deviceDetail(deviceId)); 이런식으로 사용 가능

  // combination
  combination: {
    create: '/combination/create',
  },

  // my
  my: {
    base: '/my',
    combinationDetail: (id: string) => `/my/combinations/${id}`,
    // navigate(ROUTES.my.combinationDetail(id)); 이런식으로 사용 가능
    settings: {
      profile: '/my/settings/profile',
      password: '/my/settings/password',
    },
    trash: '/my/trash',
  },

  // support (footer / settings 공용)
  // support: {
  //   base: '/support',
  //   customerCenter: '/support/customer-center',
  //   faq: '/support/faq',
  //   notices: '/support/notices',
  //   terms: '/support/terms',
  //   privacyPolicy: '/support/privacy-policy',
  // },
} as const;
