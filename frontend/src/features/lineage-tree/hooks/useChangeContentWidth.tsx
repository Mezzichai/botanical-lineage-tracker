import {  useLayoutEffect, useRef } from 'react'

const useChangeContentWidth = (container: HTMLLIElement | null, widthToTransitionFrom: number, conditionToRun: boolean, dependencies: Array<string>) => {
  const isAnimating = useRef<boolean>(false)
  useLayoutEffect(() => {
    if (conditionToRun && container) {
      isAnimating.current = true;
      const liWidth = container?.offsetWidth;
      const newContentWidth = liWidth - widthToTransitionFrom;
      const elementTransition = container?.style.transition;
      container.style.transition = "";
      container.style.width = widthToTransitionFrom + "px"

      requestAnimationFrame(() => {
        if (container) {
          container.style.width = widthToTransitionFrom + "px"
          container.style.transition = elementTransition;
        }
      
         // On the next frame, transition the height to include the new content
        requestAnimationFrame(function() {
          if (container) {
            container.style.width = (widthToTransitionFrom+ newContentWidth) + 'px';
          }
        });
      })

      container.addEventListener('transitionend', function transitionEndHandler(e) {   
        container.removeEventListener('transitionend', transitionEndHandler);   
        isAnimating.current = false;
        container.style.width = "";
      });

    }
  }, [container, widthToTransitionFrom, conditionToRun, ...dependencies])
  return isAnimating.current
}

export default useChangeContentWidth