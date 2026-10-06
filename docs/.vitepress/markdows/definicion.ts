import container from "markdown-it-container";


/* md es un objeto de markdownIt.
Es una instancia de MarkdownIt que está utilizando vitepress para convertir el Markdown a HTML
Aquí lo que estamos haciendo es añadir el markdown una nueva funcionalidad para convertirlo a html
 */


export function definicionContainer(md: MarkdownIt){
    md.use(
        container, 'definicion',{
            //tokens es la representación sintáctica del markdown
            render (tokens :any[], idx: number){

            }

        }
    );


}