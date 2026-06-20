import { SVGProps } from 'react'

type LogoProps = {
  size?: number
} & SVGProps<SVGSVGElement>

const Logo: React.FC<LogoProps> = ({ size = 32, color = '#1b54da', className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 139.75 92"
    fill="none"
    className={className}
    {...props}>
    <rect fill={color} x="71.75" y="71" width="68" height="21" rx="5" ry="5" />
    <path
      fill={color}
      d="M1.1,85.65c-2.34,2.34-.68,6.35,2.63,6.35h19.48c.99,0,1.93-.39,2.63-1.09l41.38-41.38c1.95-1.95,1.95-5.12,0-7.07L25.84,1.09c-.7-.7-1.64-1.09-2.63-1.09H3.73C.41,0-1.25,4.01,1.1,6.35l39.8,37.89c1.01.96,1.01,2.56,0,3.52L1.1,85.65Z"
    />
  </svg>
)

export { Logo }
