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
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none',
        'prose-headings:font-bold prose-headings:tracking-tight',
        'prose-p:leading-relaxed prose-p:text-sm',
        'prose-a:text-primary hover:prose-a:underline',
        'prose-strong:font-semibold prose-strong:text-foreground',
        'prose-code:text-xs prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        'prose-ul:my-2 prose-ol:my-2',
        'prose-li:my-0.5',
        className
      )}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-base sm:text-lg font-bold mt-3 sm:mt-4 mb-2 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm sm:text-base font-bold mt-2 sm:mt-3 mb-1.5 sm:mb-2 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-bold mt-2 mb-1 first:mt-0">{children}</h3>
        ),
        
        // Paragraphs
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed text-sm">{children}</p>
        ),
        
        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-outside mb-2 space-y-0.5 ml-4 sm:ml-5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside mb-2 space-y-0.5 ml-4 sm:ml-5">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed text-sm pl-1">{children}</li>
        ),
        
        // Code blocks
        code: ({ inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code
                className="bg-muted/80 px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-mono font-medium border border-border/50"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className={cn(
                'block bg-muted/80 p-2.5 sm:p-3 rounded-lg text-[11px] sm:text-xs font-mono overflow-x-auto my-2 border border-border/50',
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-muted/80 p-2.5 sm:p-3 rounded-lg overflow-x-auto my-2 border border-border/50 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {children}
          </pre>
        ),
        
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-3 sm:border-l-4 border-primary/60 pl-2.5 sm:pl-3 py-1 my-2 italic bg-muted/30 rounded-r">
            {children}
          </blockquote>
        ),
        
        // Links
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/50 hover:decoration-primary transition-colors font-medium text-sm"
          >
            {children}
          </a>
        ),
        
        // Strong/Bold
        strong: ({ children }) => (
          <strong className="font-bold text-foreground">{children}</strong>
        ),
        
        // Emphasis/Italic
        em: ({ children }) => (
          <em className="italic text-muted-foreground">{children}</em>
        ),
        
        // Horizontal rule
        hr: () => (
          <hr className="my-3 sm:my-4 border-border/60" />
        ),
        
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-2 rounded-lg border border-border">
            <table className="min-w-full border-collapse">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted/50">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="border-b border-border px-2 sm:px-3 py-1.5 sm:py-2 font-semibold text-left text-[11px] sm:text-xs">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-border px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

