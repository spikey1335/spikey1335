import { useEffect, useState } from 'react'

// Persist a piece of React state to localStorage so the task board survives reloads.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write failures (e.g. private mode / quota) so the UI keeps working.
    }
  }, [key, value])

  return [value, setValue] as const
}
