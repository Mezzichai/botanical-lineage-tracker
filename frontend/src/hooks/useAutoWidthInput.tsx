import React, { useEffect, useState } from 'react'

const useAutoWidthInput = (ref:React.RefObject<HTMLSpanElement>, title: string) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [title, ref]);

  return width
}

export default useAutoWidthInput