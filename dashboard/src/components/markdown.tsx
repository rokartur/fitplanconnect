import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

type MarkdownTypes = {
	className?: string
	children: string
}

const Markdown = ({ className, children }: MarkdownTypes) => (
	<ReactMarkdown className={className} children={children} skipHtml={false} remarkPlugins={[remarkGfm, remarkHtml]} />
)

export default Markdown
