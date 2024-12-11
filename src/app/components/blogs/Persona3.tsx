import Markdown from 'react-markdown'
import React from 'react'

const markdownContent = `# burn your dread

***CONTENT WARNING*** *This essay contains depictions of depression, suicidal thoughts and self-harm. Please proceed with caution. Additionally this essay will contains spoilers for Persona 3 Reload.*

## My College Experience

At some point during college, I stopped waking up happy. I cannot point to exactly when it was, but all I know is that there was a time in my life where I didn't dread waking up. Things are a little better now but I do not rest easy knowing how easy it is for me to slip into my old familar patterns of thought. 

## Persona 3

*Persona 3 Reload* is a game I heavily associate my last year of college with. In part, this is due to the fact I played this game as progressed though my final days of university. But it's more than that. I started playing this game around the same time I came to terms with my own depression and after that, I found that the story really resonated with me. 

It's hard to put into words how important this game is to me. Part of the reason is that sometimes I never wish I started playing it at all. I have been struggling with suicidal thoughts for almost a year now and the battle has never really been easy. As childish as it may seem, the scene of Makoto putting a gun to his head to activate his Persona replays in my head on a daily basis. The portrayal of suicide in *Persona 3 Reload* always made me very uneasy. I hated the idea of becoming so comfortable with such a grotesque imagery. I've always disliked it when people would jokes around the subject-- it's always been a trigger for me. So it's no surprise to me that this game and its imagery also made me feel unwell. 

## The End
`

export default function Persona3() {
    return (
        <div className="markdown-content">
            <Markdown>{markdownContent}</Markdown>
        </div>
    );
}