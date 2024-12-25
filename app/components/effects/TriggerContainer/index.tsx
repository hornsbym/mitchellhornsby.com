'use client'
import { ReactNode, useEffect, useRef, useState } from "react"
import useIsVisible from "../../hooks/useIsVisible";

// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
export type RootMarginOffset =
  | `${number}px ${number}px`
  | `${number}% ${number}%`; // "<y> <x>"


type TriggerContainerProps = {
  type: string
  id?: string
  inAndOut?: boolean
}

interface VisibilityProps extends TriggerContainerProps {
  type: 'visibility'
  children?: ReactNode
  offset?: RootMarginOffset
  classNames?: IndividualComponentClassNameOverrides
}

interface GroupVisibilityProps extends TriggerContainerProps {
  type: 'group-visibility'
  createGroup?: (trigger: boolean) => React.ReactNode
  offset?: RootMarginOffset
  classNames?: ContainerClassNameOverrides
}

type ContainerClassNameOverrides = {
  container?: string
}

interface IndividualComponentClassNameOverrides extends ContainerClassNameOverrides {
  beforeTrigger?: string
  afterTrigger?: string
}

type Props = VisibilityProps | GroupVisibilityProps

export function TriggerContainer(props: Props) {
  const { type } = props

  switch (type) {
    case 'visibility':
      return <VisibilityTriggerContainer {...props} />
    case 'group-visibility':
      return <GroupVisibilityContainer {...props} />
    default:
      return <></>
  }
}

function GroupVisibilityContainer({
  id,
  createGroup = (trigger) => <></>,
  offset = '0px 0px',
  inAndOut = false,
  classNames = {}
}: GroupVisibilityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref, { rootMargin: offset })
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    if (inAndOut) setTrigger(isVisible)
    else if (isVisible === true) setTrigger(true)
  }, [isVisible])

  return (
    <div
      ref={ref}
      id={id ? id : undefined}
      className={`
        ${classNames.container ?? ''}
      `}
    >
      {createGroup(trigger)}
    </div>
  )
}

function VisibilityTriggerContainer({
  id,
  offset = '0px 0px',
  children,
  inAndOut = false,
  classNames = {}
}: VisibilityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref, { rootMargin: offset })
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    if (inAndOut) setTrigger(isVisible)
    else if (isVisible === true) setTrigger(true)
  }, [isVisible])

  return (
    <div
      ref={ref}
      id={id ? id : undefined}
      className={`
        ${classNames.container ?? ''} 
        ${trigger ? classNames.afterTrigger ?? '' : classNames.beforeTrigger ?? ''}
      `}
    >
      {children}
    </div>
  )
}

