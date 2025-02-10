export function formatMsgTime(date: string) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    });
}