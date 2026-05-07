

export type Direction = "UP"| "DOWN"| "LEFT"| "RIGHT"

/**
 * user that triggered the notification |
 * the project where it come from(if it were from a project and not from a global event)
 */
type From = {
    user: string,
    project?: string
}

export type ToastType = {
    status: "WARN" | "INFO"| "ERROR",
    description: string,
    direction: Direction // where it will come from
    duration_ms: number
    from?: From,
}

export type Toast_With_ID = {
    id: number,
    status: "WARN" | "INFO"| "ERROR",
    description: string,
    direction: Direction // where it will come from
    duration_ms: number
    from?: From,
}
