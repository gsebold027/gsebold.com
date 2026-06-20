import { SVGProps } from 'react'

type CloseIconProps = {
  size?: number
} & SVGProps<SVGSVGElement>

const ShadcnIcon: React.FC<CloseIconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} {...props}>
    <line
      x1="208"
      y1="128"
      x2="128"
      y2="208"
      stroke="currentColor"
      strokeWidth="32"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <line
      x1="192"
      y1="40"
      x2="40"
      y2="192"
      stroke="currentColor"
      strokeWidth="32"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export { ShadcnIcon }
