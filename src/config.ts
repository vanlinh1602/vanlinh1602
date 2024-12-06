import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  Project,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Monsieur Kuma',
  subtitle: '',
  lang: 'en',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 250,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: false,
    src: 'assets/images/demo-banner.png',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: '',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  favicon: [    // Leave this array empty to use the default favicon
    {
      src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
      theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Blog,
    LinkPreset.Archive,
    LinkPreset.Projects,
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar.jpg',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Nguyễn Văn Linh',
  bio: 'Do something or nothing.',
  links: [
    {
      name: 'Facebook',
      icon: 'fa6-brands:facebook',       // Visit https://icones.js.org/ for icon codes
                                        // You will need to install the corresponding icon set if it's not already included
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://facebook.com/MonsieurKuma',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/vanlinh1602',
    },
    {
      name: 'Gmail',
      icon: 'fa6-regular:envelope',
      url: 'mailto:linhnv1622@gmail.com',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: false,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}


export const bioConfig = [
  {
    year: 2002,
    activities: [
      {
        date: '10/06/2002',
        message: 'Born in Ba Ria - Vung Tau, Vietnam',
      }
    ]
  },
  {
    year: 2020,
    activities: [
      {
        date: '09/2022',
        message: 'Study at UIT (University of Information Technology)',
      },
    ]
  },
  {
    year: 2022,
    activities: [
      {
        date: '10/2022',
        message: 'Work at Xbot JSC (to present)',
      },
    ]
  }
]

export const languagesAndTools = [
  'nodejs', 'express', 'nestjs', 
  'react','mui','bootstrap','html','css','js','ts','tailwind', 
  'mysql','sqlite','mongodb','firebase', 
  'bots','discordjs','bun','vite'
]

export const projects: Project[]  = [
  {
    title: 'QR Banking',
    description: 'Create and customize a QR code for banking transactions. Can be used for both personal and business purposes.',
    imgSrc: 'assets/projects/qr-banking.jpg',
    skills: ['react-light', 'vite-light', 'tailwindcss-light'],
    repoURL: 'https://github.com/vanlinh1602/qr-banking',
    demoURL: 'https://qr-banking.linhnv.online/',
    averageBrightness: 0.5,    
  },
]
