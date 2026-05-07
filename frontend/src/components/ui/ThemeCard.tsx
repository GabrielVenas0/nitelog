import type{  Theme, ThemeProps } from "@/types";
import { ThemeHook } from "@/hooks";
import { Save_Storage } from "@/utility";


type ThemeItemProps = {
    kind:string,
    name:string,
    props: ThemeProps
}

function SetTheme(fun: (value: React.SetStateAction<Theme>) => void, values:Theme){
    Save_Storage("THEME", values)
    fun(values)
}

function ThemeItem({ kind, name, props }: ThemeItemProps) {
    const context = ThemeHook()

    const baseStyles = "flex items-center gap-3 p-3 rounded-md border transition-colors hover:cursor-pointer";

    const stateStyles = context.theme.name == name 
        ? "bg-(--bg) border-(--accent) text-(--accent)" 
        : "bg-(--bg) border-gray-200 text-(--accent) hover:bg-(--bg) hover:brightness-80";


    return (
        <section 
        onClick={() => SetTheme(context.setTheme, {kind, props, name})}
        className={`justify-between  ${baseStyles} ${stateStyles}`}
        > 
        <div className="flex gap-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-tighter bg-(--bg) rounded">
                {kind}
            </div>
            <div className="flex-1 font-medium truncate">
                {name}
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <span className={`h-9 w-9 rounded-full`} style={{backgroundColor: props.bg}}></span>
            <span className={`h-9 w-9 rounded-full`} style={{backgroundColor: props.accent}}></span>
            <span className={`h-9 w-9 rounded-full`} style={{backgroundColor: props.fg}}></span>
        </div>
        </section>
    );
}
type ThemeCardProps = {
    themes: Theme[]
}
export  function ThemeCard({themes}:ThemeCardProps){
    return(
        themes.map((theme, key) => (
           <ThemeItem key={key} kind={theme.kind} name={theme.name} props={theme.props}></ThemeItem>
        ))
    )
}