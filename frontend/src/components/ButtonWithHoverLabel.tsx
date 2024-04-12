import React, { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode,
  label: string
  positioningStyles?: string, 
  id?: string,
}

const ButtonWithHoverLabel: React.FC<Props> = ({positioningStyles, children, label}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}   
      className={positioningStyles || "defaultPositioning"}
    >
      {children}
      {isHovering &&
        <div className={`fadeInElementQuick buttonLabel`}>
          {label}
        </div>
      }
    </div>
  )
}

export default ButtonWithHoverLabel