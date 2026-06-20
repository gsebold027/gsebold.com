import { SVGProps } from 'react'

type FramerMotionIconProps = {
  size?: number
} & SVGProps<SVGSVGElement>

const FramerMotionIcon: React.FC<FramerMotionIconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 341 511.492"
    className={className}
    {...props}>
    <g fillRule="nonzero">
      <path fill="#0162FF" d="M0 340.992h170.5v170.5z" />
      <path fill="#01A3FF" d="M0 170.5h170.5L341 340.999l-341-.007z" />
      <path fill="#67DBFF" d="M0 0h341v170.5H170.5z" />
    </g>
  </svg>
)

export { FramerMotionIcon }
