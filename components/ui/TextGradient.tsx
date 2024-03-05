type TextGradientProps = {
    text: string
    from?: string
    via?: string
    to?: string
    class?: string
}

export default function TextGradient(props: TextGradientProps) {
    const from = props.from || 'from-info'
    const via = props.via || 'via-secondary'
    const to = props.to || 'to-accent'
    const c = props.class || ''

    return (
        <h1
            className={`bg-gradient-to-r ${from} ${via} ${to} text-transparent font-GilroyBlack text-4xl bg-clip-text bg-300% animate-gradient ${c}`}
        >
            {props.text}
        </h1>
    )
}