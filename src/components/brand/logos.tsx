// Brand SVG logos for integration cards (simplified, recognizable marks)
type P = { className?: string };

export const MicrosoftLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#F25022" d="M1 1h10v10H1z" />
    <path fill="#7FBA00" d="M13 1h10v10H13z" />
    <path fill="#00A4EF" d="M1 13h10v10H1z" />
    <path fill="#FFB900" d="M13 13h10v10H13z" />
  </svg>
);
export const GoogleDriveLogo = ({ className }: P) => (
  <svg viewBox="0 0 87.3 78" className={className}>
    <path
      fill="#0066da"
      d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"
    />
    <path
      fill="#00ac47"
      d="M43.65 25 30.9 3c-1.35.8-2.5 1.9-3.3 3.3l-26.4 45.7A9.06 9.06 0 0 0 0 55.5h27.5z"
    />
    <path
      fill="#ea4335"
      d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"
    />
    <path
      fill="#00832d"
      d="M43.65 25 56.4 3c-1.35-.8-2.9-1.2-4.5-1.2H35.4c-1.6 0-3.15.45-4.5 1.2z"
    />
    <path
      fill="#2684fc"
      d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
    />
    <path
      fill="#ffba00"
      d="M73.4 26.5 60.2 3.7c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
    />
  </svg>
);
export const SharePointLogo = ({ className }: P) => (
  <svg viewBox="0 0 32 32" className={className}>
    <circle cx="12" cy="10" r="8" fill="#036C70" />
    <circle cx="20" cy="16" r="7" fill="#1A9BA1" />
    <circle cx="16" cy="24" r="5.5" fill="#37C6D0" />
    <text
      x="12"
      y="14"
      textAnchor="middle"
      fontSize="9"
      fill="#fff"
      fontFamily="Arial"
      fontWeight="bold"
    >
      S
    </text>
  </svg>
);
export const DropboxLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#0061FF"
      d="M6 2 0 6l6 4 6-4zm12 0-6 4 6 4 6-4zM0 14l6 4 6-4-6-4zm18-4-6 4 6 4 6-4zM6 19l6 4 6-4-6-4z"
    />
  </svg>
);
export const SlackLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#E01E5A" d="M5 15a2 2 0 1 1 0-4h2v4zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0z" />
    <path fill="#36C5F0" d="M9 5a2 2 0 1 1 4 0v2H9zm0 1a2 2 0 1 1 0 4H4a2 2 0 1 1 0-4z" />
    <path fill="#2EB67D" d="M19 9a2 2 0 1 1 0 4h-2V9zm-1 0a2 2 0 1 1-4 0V4a2 2 0 1 1 4 0z" />
    <path fill="#ECB22E" d="M15 19a2 2 0 1 1-4 0v-2h4zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4z" />
  </svg>
);
export const SalesforceLogo = ({ className }: P) => (
  <svg viewBox="0 0 32 22" className={className}>
    <path
      fill="#00A1E0"
      d="M13.3 2.4a5.6 5.6 0 0 1 9.4 2 6.4 6.4 0 0 1 7.5 8.9 6.3 6.3 0 0 1-4.4 8.2 5 5 0 0 1-9.3 1.2 5.6 5.6 0 0 1-9.8-1 5.4 5.4 0 0 1-5.7-8.3A6 6 0 0 1 5.6 4a6 6 0 0 1 7.7-1.6"
    />
  </svg>
);
export const DocuSignLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#FFCC22" />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="14"
      fontWeight="900"
      fill="#000"
      fontFamily="Arial"
    >
      DS
    </text>
  </svg>
);
export const AdobeLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#EB1000" />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="12"
      fontWeight="900"
      fill="#fff"
      fontFamily="Arial"
    >
      A
    </text>
  </svg>
);
export const NotionLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#fff" />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="14"
      fontWeight="900"
      fill="#000"
      fontFamily="Georgia"
    >
      N
    </text>
  </svg>
);
export const JiraLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#2684FF" d="M12 2 2 12l5 5 5-5 5 5 5-5z" />
  </svg>
);
export const TeamsLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#4B53BC" />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="14"
      fontWeight="900"
      fill="#fff"
      fontFamily="Arial"
    >
      T
    </text>
  </svg>
);
export const OutlookLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#0072C6" />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="14"
      fontWeight="900"
      fill="#fff"
      fontFamily="Arial"
    >
      O
    </text>
  </svg>
);
export const GitHubLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#181717" />
    <path
      fill="#fff"
      transform="translate(3.5 3.5) scale(0.7)"
      d="M12 .5C5.6.5.5 5.6.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.3v3.4c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.6 18.4.5 12 .5z"
    />
  </svg>
);
export const GmailLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#EA4335" d="M12 13 2 6v12a2 2 0 0 0 2 2h4V11z" />
    <path fill="#FBBC04" d="M22 6 12 13 2 6l10-4z" />
    <path fill="#34A853" d="M16 20h4a2 2 0 0 0 2-2V6l-6 5z" />
  </svg>
);
export const OneDriveLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#0364B8"
      d="M4 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.4-2A5 5 0 0 1 24 13v1a4 4 0 0 1-4 4z"
    />
  </svg>
);
export const BoxLogo = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="4" fill="#0061D5" />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="10"
      fontWeight="900"
      fill="#fff"
      fontFamily="Arial"
    >
      box
    </text>
  </svg>
);
