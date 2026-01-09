// RootLayout
import RootLayout from '@/layouts/RootLayout';

// HomePage
import HomePage from '@/pages/HomePage';

// lifestyle
import LifestylePage from '@/pages/lifestyle/LifestylePage';

// devices
import DeviceSearchPage from '@/pages/devices/DeviceSearchPage';
import DeviceDetailPage from '@/pages/devices/DeviceDetailPage';

// combination
import CombinationCreatePage from '@/pages/combination/CombinationCreatePage';
import CombinationCompletePage from '@/pages/combination/CombinationCompletePage';

// my
import MyPage from '@/pages/my/MyPage';
import MyCombinationDetailPage from '@/pages/my/MyCombinationDetailPage';
import MySettingsProfilePage from '@/pages/my/settings/ProfileEditPage';
import MySettingsPasswordPage from '@/pages/my/settings/PasswordEditPage';
import MyTrashPage from '@/pages/my/MyTrashPage';

export const AppRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // home
      { index: true, element: <HomePage /> },

      // lifestyle
      {
        path: 'lifestyle',
        element: <LifestylePage />,
      },

      // devices
      {
        path: 'devices',
        children: [
          { index: true, element: <DeviceSearchPage /> },
          { path: ':deviceId', element: <DeviceDetailPage /> },
        ],
      },

      // combination
      {
        path: 'combination',
        children: [
          { path: 'create', element: <CombinationCreatePage /> },
          { path: 'complete', element: <CombinationCompletePage /> },
        ],
      },

      // my page
      {
        path: 'my',
        children: [
          { index: true, element: <MyPage /> },
          { path: 'combinations/:id', element: <MyCombinationDetailPage /> },
          {
            path: 'settings',
            children: [
              { path: 'profile', element: <MySettingsProfilePage /> },
              { path: 'password', element: <MySettingsPasswordPage /> },
            ],
          },
          { path: 'trash', element: <MyTrashPage /> },
        ],
      },
    ],
  },
];
