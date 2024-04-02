import { useCallback, useRef } from "react"

const useInvalidateParentWidthRefCallback = (callback: (newULwidth: number) => void): [React.RefCallback<HTMLUListElement>] => {
  

  const ulRef = useRef<HTMLUListElement | null>(null)
  const setRef = useCallback((node: HTMLUListElement) => {

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]

      callback(entry.contentBoxSize[0].inlineSize)
    })

    if (ulRef.current) {
      resizeObserver.unobserve(ulRef.current)
    }
    ulRef.current = node
    if (node) {
      if (ulRef.current) {
        resizeObserver.observe(ulRef.current)
      }
    }
  }, [callback])
  return [setRef]
}

export default useInvalidateParentWidthRefCallback
