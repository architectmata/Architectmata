import type {SVGProps} from 'react';
type IconProps = SVGProps<SVGSVGElement> & {size?: number};
function Icon({size=20,children,...props}:IconProps){return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>}
export function ArrowRight(p:IconProps){return <Icon {...p}><path d="M5 12h14M14 7l5 5-5 5"/></Icon>}
export function ArrowUpRight(p:IconProps){return <Icon {...p}><path d="M7 17 17 7M8 7h9v9"/></Icon>}
export function DownloadSimple(p:IconProps){return <Icon {...p}><path d="M12 3v12M7 10l5 5 5-5M5 20h14"/></Icon>}
export function MagnifyingGlass(p:IconProps){return <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></Icon>}
export function Moon(p:IconProps){return <Icon {...p}><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></Icon>}
export function Sun(p:IconProps){return <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Icon>}
export function List(p:IconProps){return <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>}
export function X(p:IconProps){return <Icon {...p}><path d="m5 5 14 14M19 5 5 19"/></Icon>}
export function Instagram(p:IconProps){return <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></Icon>}
export function EnvelopeSimple(p:IconProps){return <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></Icon>}
