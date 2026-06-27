import { SVGProps } from 'react'

type IconProps = {
  size?: number
} & SVGProps<SVGSVGElement>

const PowerBIIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 630 630" className={className} {...props}>
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="powerbi-1">
        <stop stopColor="#EBBB14" offset="0%"></stop>
        <stop stopColor="#B25400" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="powerbi-2">
        <stop stopColor="#F9E583" offset="0%"></stop>
        <stop stopColor="#DE9800" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="powerbi-3">
        <stop stopColor="#F9E68B" offset="0%"></stop>
        <stop stopColor="#F3CD32" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g transform="translate(77.5, 0)" fill="none" fillRule="evenodd">
      <rect fill="url(#powerbi-1)" x="256" y="0" width="219" height="630" rx="26"></rect>
      <path
        d="M346,604 L346,630 L320,630 L153,630 C138.64,630 127,618.36 127,604 L127,183 C127,168.64 138.64,157 153,157 L320,157 C334.36,157 346,168.64 346,183 L346,604 Z"
        fill="url(#powerbi-2)"
        fillRule="evenodd"></path>
      <path
        d="M219,604 L219,630 L193,630 L26,630 C11.64,630 0,618.36 0,604 L0,341 C0,326.64 11.64,315 26,315 L193,315 C207.36,315 219,326.64 219,341 L219,604 Z"
        fill="url(#powerbi-3)"></path>
    </g>
  </svg>
)

export { PowerBIIcon }
