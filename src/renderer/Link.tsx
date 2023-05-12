import React from 'react'
import { usePageContext } from '@/renderer/usePageContext'

export { Link }

function Link(props: { href?: string; className?: string; children: React.ReactNode }) {
  // eslint-disable-next-line
  const pageContext = usePageContext()
  // eslint-disable-next-line
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')
  return <a {...props} className={className} />
}
