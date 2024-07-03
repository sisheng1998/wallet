import { useCallback, useState } from "react"
import Cookies from "js-cookie"

const useCookie = (name: string) => {
  const [value, setValue] = useState<string | undefined>(() =>
    Cookies.get(name)
  )

  const setCookie = useCallback(
    (value: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(name, value, options)
      setValue(value)
    },
    [name]
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(name)
    setValue(undefined)
  }, [name])

  return { value, setCookie, deleteCookie }
}

export default useCookie
