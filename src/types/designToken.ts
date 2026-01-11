export type ColorToken =
  /* Main Color */
  | 'blue-100'
  | 'blue-200'
  | 'blue-300'
  | 'blue-400'
  | 'blue-500'
  | 'blue-600'
  | 'blue-700'
  | 'blue-800'
  | 'blue-900'

  /* gray scale */
  | 'white'
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'black'
  | 'black-50'

  /* Warning */
  | 'warning'

  /* sub1 (tag color) */
  | 'light-green'
  | 'dark-green'
  | 'light-yellow'
  | 'dark-yellow'
  | 'light-purple'
  | 'dark-purple'

  /* sub2 (tag status color) */
  | 'optimal'
  | 'normal'
  | 'poor';

export type TypographyToken =
  /* Service Name */
  | 'font-service-name'
  | 'font-service-name-sm'

  /* Heading */
  | 'font-heading-1'
  | 'font-heading-2'
  | 'font-heading-3'

  /* Body (bold) */
  | 'font-body-1-b'

  /* Body (semibold) */
  | 'font-body-1-sm'
  | 'font-body-2-sm'
  | 'font-body-3-sm'
  | 'font-body-4-sm'

  /* body (regular) */
  | 'font-body-1-r'
  | 'font-body-2-r'
  | 'font-body-3-r'
  | 'font-body-4-r'

  /* Caption */
  | 'font-caption-sm'
  | 'font-caption-r';
