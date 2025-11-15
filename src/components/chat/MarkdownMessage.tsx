import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={cn('prose prose-sm dark:prose-invert max-w-none', className)}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-lg font-bold mt-4 mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-bold mt-3 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>
        ),
        
        // Paragraphs
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
        
        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-2 space-y-1 ml-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-2 space-y-1 ml-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        
        // Code blocks
        code: ({ inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code
                className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className={cn(
                'block bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto my-2',
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-muted p-3 rounded-lg overflow-x-auto my-2">
            {children}
          </pre>
        ),
        
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-3 py-1 my-2 italic">
            {children}
          </blockquote>
        ),
        
        // Links
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            {children}
          </a>
        ),
        
        // Strong/Bold
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        
        // Emphasis/Italic
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        
        // Horizontal rule
        hr: () => (
          <hr className="my-3 border-border" />
        ),
        
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="min-w-full border-collapse border border-border">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border px-2 py-1 bg-muted font-semibold text-left text-xs">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-2 py-1 text-xs">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

