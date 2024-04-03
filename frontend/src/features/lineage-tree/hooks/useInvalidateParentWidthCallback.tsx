import { useCallback, useRef } from "react"

const useInvalidateParentWidthRefCallback = (callback: ((newULwidth: number, isNew?: boolean) => void) | undefined): [React.RefCallback<HTMLUListElement>] => {
  

  const ulRef = useRef<HTMLUListElement | null>(null)
  const isMounted = useRef<boolean>(false);

  const setRef = useCallback((node: HTMLUListElement) => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (callback && isMounted.current) {
        // callback(entry.contentBoxSize[0].inlineSize || 0, false)
      }
    })
    
    if (ulRef.current) {
      resizeObserver.unobserve(ulRef.current)
    }
    ulRef.current = node

    if (node) {
      if (ulRef.current) {
        resizeObserver.observe(ulRef.current)
        if (!isMounted.current) {
          if (callback) {    
            callback(ulRef.current.offsetWidth, true)
          }
        }
      }
    }
  }, [callback])
  return [setRef]
}

export default useInvalidateParentWidthRefCallback
