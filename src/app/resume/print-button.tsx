"use client"

export function PrintButton() {
return (
<button
onClick={() => window.print()}
className="text-xs font-medium px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
>
Print / Save PDF
</button>
)
}