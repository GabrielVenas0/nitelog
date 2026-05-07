import type { Toast_With_ID } from "@/types/toast";

type ToastEvent = {
    queue: Toast_With_ID[],
    callback: null | ((toast: Toast_With_ID) => any)
    emit: (a: Toast_With_ID) => void,
    subscribe: ((fn:(toast: Toast_With_ID) => void) => void)
}

export const toastEvents: ToastEvent = {
    queue: [],
    callback: null,

    emit(toast: Toast_With_ID) {
        if (this.callback) {
            this.callback(toast);
        } else {
            this.queue.push(toast);
        }
    },

    subscribe(callback: (toast: Toast_With_ID) => void) {
        this.callback = callback;
        while (this.queue.length > 0) {
            if (this.queue.shift()) {
                const element = this.queue.shift()
                if (element) {
                    this.callback(element);
                }
            }
        }
    }
};

export const notify = ({ id, description, duration_ms, direction, status, from }: Toast_With_ID) => toastEvents.emit({
    id,
    description,
    direction,
    duration_ms,
    status,
    from
});