import container from "markdown-it-container";
import MarkdownIt from "markdown-it";

export function dawsContainers(md: MarkdownIt) {
    function labeledBox(
        name: string,
        className: string,
        kicker: string,
        defaultSub: string,
    ) {
        md.use(container, name, {
            render(tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    const sub =
                        tokens[idx].info
                            .trim()
                            .replace(new RegExp(`^${name}\\s*`, 'i'), '')
                            .trim() || defaultSub
                    return `<div class="${className}">
<p class="${className}__kicker">${md.utils.escapeHtml(kicker)}</p>
<p class="${className}__sub">${md.utils.escapeHtml(sub)}</p>
<div class="${className}__body">\n`
                }
                return '</div></div>\n'
            },
        })
    }

    labeledBox('objetivos', 'daws-objetivos', 'Objetivos', 'Qué veremos aquí')
    labeledBox(
        'finalidad',
        'daws-finalidad',
        'Finalidad',
        'Al terminar el tema deberás…',
    )
    labeledBox(
        'referencias',
        'daws-referencias',
        'Referencias',
        'Dónde buscar información',
    )
    // labeledBox('definicion', 'daws-definicion', 'Definición', 'Concepto')
    labeledBox('previo', 'daws-previo', 'Conocimiento previo', 'Antes de seguir')
    labeledBox('actividad', 'daws-actividad', 'Actividad', 'Para hacer ahora')
    labeledBox('pregunta', 'daws-pregunta', 'Pregunta', 'Para pensar en clase')
    md.use(container, 'pageinfo', {
        render(tokens, idx) {
            if (tokens[idx].nesting === 1) {
                const title = tokens[idx].info
                    .trim()
                    .replace(/^pageinfo\s*/i, '')
                    .trim()

                return `
                    <div class="daws-pageinfo">
                    <strong>${md.utils.escapeHtml(title || 'Información Adicional')}</strong>
                    <div class="daws-pageinfo__body">
`
            }

            return '</div></div>\n'
        },
    })


    md.use(container, 'definicion', {
        render(tokens, idx) {
            if (tokens[idx].nesting === 1) {
                const info = tokens[idx].info
                    .trim()
                    .replace(/^definicion\s*/i, '')
                    .trim()
                const [title, icon = 'fa-solid fa-circle-info'] = info
                    .split('|')
                    .map(value => value.trim())


                return `<div class="daws-definicion">
                                <div class="daws-definicion__header">
                                    <i class="${md.utils.escapeHtml(icon)}" aria-hidden="true"></i>
                                    <strong>${md.utils.escapeHtml(title || 'Definición')}</strong>
                                </div>
                            <div class="daws-definicion__body">\n`
            }

            return '</div>  ' +
                '</div>\n'
        },
    }),
        md.use(container, 'objetivos', {
            render(tokens: any[], idx: number) {
                if (tokens[idx].nesting === 1) {
                    const info = tokens[idx].info
                        .trim()
                        .replace(/^objetivos\s*/i, '')
                        .trim()

                    const [title, icon = 'fa-solid fa-list-check'] = info
                        .split('|')
                        .map(value => value.trim())

                    return `
                <div class="daws-objetivos">
                    <div class="daws-objetivos__header">
                        <i class="${md.utils.escapeHtml(icon)}" aria-hidden="true"></i>
                        <span>Objetivos</span>
                    </div>

                    <div class="daws-objetivos__content">
                        <div class="daws-objetivos__title">
                            ${md.utils.escapeHtml(title || 'Objetivos')}
                        </div>

                        <div class="daws-objetivos__body">
`
                }

                return `
                        </div>
                    </div>
                </div>
`
            },
        }),
        md.use(container, 'recuerda', {
            render(tokens: any[], idx: number) {
                if (tokens[idx].nesting === 1) {
                    const info = tokens[idx].info
                        .trim()
                        .replace(/^recuerda\s*/i, '')
                        .trim()

                    const [title, icon = 'fa-solid fa-lightbulb'] = info
                        .split('|')
                        .map(value => value.trim())

                    return `
                <div class="daws-recuerda">
                    <div class="daws-recuerda__header">
                        <i class="${md.utils.escapeHtml(icon)}" aria-hidden="true"></i>
                        <span>${md.utils.escapeHtml(title || 'Recuerda')}</span>
                    </div>

                    <div class="daws-recuerda__body">
`
                }

                return `
                    </div>
                </div>
`
            },
        }),
        md.use(container, 'practica', {
            render(tokens: any[], idx: number) {
                if (tokens[idx].nesting === 1) {
                    const info = tokens[idx].info
                        .trim()
                        .replace(/^practica\s*/i, '')
                        .trim()

                    const [title, icon = 'fa-solid fa-keyboard'] = info
                        .split('|')
                        .map(value => value.trim())

                    return `
                <div class="daws-practica">
                    <div class="daws-practica__header">
                        <i class="${md.utils.escapeHtml(icon)}" aria-hidden="true"></i>
                        <span>${md.utils.escapeHtml(title || 'Ahora practica tú')}</span>
                    </div>

                    <div class="daws-practica__body">
`
                }

                return `
                    </div>
                </div>
`
            },
        })
}