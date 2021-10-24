import React from "react"

export const suspenseComponent = (OtherComponent, fallback, props = {}) => {
  return () => {
    return (
      <React.Suspense fallback={fallback}>
        <OtherComponent {...props} />
      </React.Suspense>
    )
  }
}