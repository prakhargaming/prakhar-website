import Markdown from 'react-markdown'
import React from 'react'

const markdownContent = `# burn your dread
Place holder for WIP blog post
`

export default function Persona3() {
    return (
        <div className="markdown-content">
            <Markdown>{markdownContent}</Markdown>
        </div>
    );
}