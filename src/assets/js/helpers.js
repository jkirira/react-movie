import { format } from "date-fns";

export function getFormattedDate(date, format_as = 'eeee do MMMM yyyy') {
    return format(new Date(date), format_as)
}