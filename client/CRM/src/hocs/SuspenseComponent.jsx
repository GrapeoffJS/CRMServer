import React from "react"

export const SuspenseComponent = (fallback, OtherComponent, props = {}) => {
  return () => {
    return (
      <React.Suspense fallback={fallback}>
        <OtherComponent {...props} />
      </React.Suspense>
    )
  }
}