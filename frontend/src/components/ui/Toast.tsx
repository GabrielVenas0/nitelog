import type { Toast_With_ID, Direction } from "@/types/toast";

// Definindo os tipos de direção possíveis

type ToastProps = {
    props: Toast_With_ID & { direction?: Direction }
}

const animationClasses: Record<Direction, string> = {
    UP: "animate-slide-top",
    DOWN: "animate-slide-bottom",
    LEFT: "animate-slide-left",
    RIGHT: "animate-slide-right",
};

export function Toast({ props }: ToastProps) {
    const directionClass = animationClasses[props.direction || "RIGHT"];

    return(
        <div className={`w-80 h-auto text-(--accent) p-4 bg-(--bg) brightness-110 border-(--fg)  border rounded shadow-lg ${directionClass}`}>
            <div className="font-bold">{props.status}</div>
            <div className="text-sm">{props.description}</div>
            
            {props.from && (
                <div className="mt-2 text-xs text-(--accent)">
                    <div>{props.from.user}</div>
                    {props.from.project && <div>{props.from.project}</div>}
                </div>
            )}
        </div>
    )
}