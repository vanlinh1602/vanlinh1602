import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
  SkillsConfig,
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
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}

export const skillsConfig: SkillsConfig = {
  enable: true,
  category: [
    {
      name: 'Frontend',
      skills: [
        {
          name: 'HTML',
          icon: 'fa5-brands:html5',
        },
        {
          name: 'CSS',
          icon: 'fa5-brands:css3',
        },
        {
          name: 'JavaScript',
          icon: 'fa5-brands:js',
        },
        {
          name: 'TypeScript',
          icon: 'fa5-brands:typescript',
        },
        {
          name: 'React',
          icon: 'fa5-brands:react',
        },
        {
          name: "Tailwind CSS",
          icon: "fa5-brands:tailwindcss",
        },
        {
          name: "Ant Design",
          icon: "fa5-brands:ant-design",
        },
      ],
    }, 
    {
      name: 'Backend',
      skills: [
        {
          name: 'Node.js',
          icon: 'fa5-brands:node-js',
        },
        {
          name: 'Express',
          icon: 'fa5-brands:node-js',
        },
        {
          name: 'NestJS',
          icon: 'fa5-brands:node-js',
        },
        {
          name: 'REST API',
          icon: 'fa5-solid:server',
        },
        {
          name: 'GraphQL',
          icon: 'fa5-brands:graphql',
        },
        {
          name: 'MongoDB',
          icon: 'fa5-brands:mongodb',
        },
      ],
    },
    {
      name: 'Tools',
      skills: [
        {
          name: 'Git',
          icon: 'fa5-brands:git',
        },
        {
          name: 'GitHub',
          icon: 'fa5-brands:github',
        },
        {
          name: 'VS Code',
          icon: 'fa5-brands:visual-studio-code',
        },
      ],
    }
  ]
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
