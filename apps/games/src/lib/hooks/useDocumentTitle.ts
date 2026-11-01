import { useEffect } from 'react'

// index.html already carries a <title> for crawlers and link previews; a React 19 <title> would
// be a second one, and document.title reads the first. So pages set it imperatively.
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
