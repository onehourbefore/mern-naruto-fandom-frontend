import React from "react"
import { StatusModel } from "../models/StatusModel"

export const useScroll = (childRefCurrent: HTMLDivElement | null, statusLoading: string, page: number, callback: () => void) => {
    const observer = React.useRef <IntersectionObserver | null> (null)

    React.useEffect (() => {
        if (statusLoading === StatusModel.LOADING) return
        if (observer.current) observer.current.disconnect ()
        observer.current = new IntersectionObserver (([target]) => {
            if (target.isIntersecting && page <= 5) {
                callback ()
            }
        })

        if (childRefCurrent) observer.current.observe (childRefCurrent)

        return () => {
            if (observer.current && childRefCurrent) {
                observer.current.unobserve (childRefCurrent)
            }
        }
    }, [statusLoading])
}