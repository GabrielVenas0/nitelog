import { notify } from '../src/utility/toast_emiter'

export default function ToastTrigger(description, duration=300, direction, status="INFO") { 
    notify(
        {
            id: 1,
            description: description,
            duration_ms: duration,
            direction: direction,
            status: status
        }
    )
}