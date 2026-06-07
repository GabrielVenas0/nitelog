import type { Theme, ThemeProps } from '@/types'
import { ThemeHook } from '@/hooks'
import { Save_Storage } from '@/utility'

type ThemeItemProps = {
  kind: string
  name: string
  props: ThemeProps
}

function SetTheme(
  fun: (value: React.SetStateAction<Theme>) => void,
  values: Theme,
) {
  Save_Storage('THEME', values)
  fun(values)
}

function ThemeItem({ kind, name, props }: ThemeItemProps) {
  const context = ThemeHook()

  const baseStyles =
    'flex items-center gap-3 p-3 rounded-md border transition-colors hover:cursor-pointer'

  const stateStyles =
    context.theme.name == name
      ? 'bg-(--accentedBg) border-(--border) text-(--accent) hover:bg-(--accentedBg)/50'
      : 'bg-(--accentedBg) border-(--border) text-(--accent) hover:bg-(--accentedBg)/50'

  return (
    <section
      onClick={() => SetTheme(context.setTheme, { kind, props, name })}
      className={`justify-between ${baseStyles} ${stateStyles}`}
    >
      <div className='flex gap-1'>
        <div className='rounded bg-(--bg) px-2 py-1 text-[10px] font-bold tracking-tighter uppercase'>
          {kind}
        </div>
        <div className='flex-1 truncate font-medium'>{name}</div>
      </div>
      <div className='flex items-center gap-2'>
        <span
          className={`h-9 w-9 rounded-full`}
          style={{ backgroundColor: props.bg }}
        ></span>
        <span
          className={`h-9 w-9 rounded-full`}
          style={{ backgroundColor: props.accent }}
        ></span>
        <span
          className={`h-9 w-9 rounded-full`}
          style={{ backgroundColor: props.fg }}
        ></span>
      </div>
    </section>
  )
}
type ThemeCardProps = {
  themes: Theme[]
}
export function ThemeCard({ themes }: ThemeCardProps) {
  return themes.map((theme, key) => (
    <ThemeItem
      key={key}
      kind={theme.kind}
      name={theme.name}
      props={theme.props}
    ></ThemeItem>
  ))
}
