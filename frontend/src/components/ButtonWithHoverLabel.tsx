import React, { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode,
  ariaLabel: string, 
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  label: string
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  styles?: string, 
  id?: string,
}

const ButtonWithHoverLabel: React.FC<Props> = ({ariaLabel, styles, onClick, id, children, label, onMouseEnter, onMouseLeave}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}   
      className={styles}
    >
      <button
        aria-label={ariaLabel}
        className={`hoverButton`}
        id={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={(e) => onClick(e)}
      >
        {children}
        {isHovering &&
          <div className={`fadeInElementQuick buttonLabel`}>
            {label}
          </div>
        }
        
      </button>
    </div>
  )
}

export default ButtonWithHoverLabel