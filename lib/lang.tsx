'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'sv' | 'en'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Accepts strings or JSX — returns sv or en depending on current lang */
  t: <T extends ReactNode>(sv: T, en: T) => T
}

const LangContext = createContext<LangContextType>({
  lang: 'sv',
  setLang: () => {},
  t: (sv) => sv,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('sv')
  const t = <T extends ReactNode>(sv: T, en: T): T => (lang === 'sv' ? sv : en)
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
