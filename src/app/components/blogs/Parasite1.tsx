import Markdown from 'react-markdown'
import React from 'react'

const markdownContent = `# Parasite

*This essay contains spoilers for NieR Replicant and Parasite*

At the time of writing, I am on an airplane have just finished the movie *Parasite*, directed by Bong Joon-ho and staring Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jang Hye-jin, Park Myung-hoon, and Lee Jung-eun. *Parasite* is a truly dystopian piece of fiction. I feel as if it will haunt me for the rest of my life. I beleive that *Parasite* is  movie about the human condition in its most decepit form. It is a story that depicts real lives of real people, not just in Korea, but all across the world. *Parasite* is a movie about poverty. 

I am not someone who is qualified to speak about the stuggles these characters go through. I grew up to an upper class family and, as such, have never had to face the horrors that are depicted in *Parasite*. However, I can speak about how this movie made feel. 

It made me feel sick.

*Parasite*, from beginning to end, is a very sad movie. It starts by depicting the living conditions of the main family the movie is based around. They live in a dingy apartment that halfway between being a basement and not. It is horribly cramped, there are bugs and they have only a small window to the outside world. This is all the family can afford. They are all unemployed and are desperately trying to make it out of their situation by trying out random side jobs but struggle to make ends meet. 

This seems to be the side of Korea that people often overlook in the west. Beyond the K-dramas and K-pop there is a horrific crisis in Korea that is affecting young people all accross the country. Young people in Korea desperately want to make it out because there seems to be no hope of making it in a country where the capitalist mega corperations control nearly the entire governent and are squeezing these people for all the are worth are more. A society such as this pushes people to extremes. 

People do not have to be evil to do horrible things. They just need to beleive that they are right. This is one of the strongest messages in the game NieR Replicant, directed by Yoko Taro. In this game, the main character, Nier, guarentees the extinction of humanity in a quest to save his sister. He is not an evil person. Over the course of the game, you see him help people and save lives, but he is blinded by his rage against the people who stole his sister and makes rash decision whilst being consumed by hatred.

*Parasite* is not dissimilar. You see the family in the movie try their best to maintain normalcy despite their crumbling circumstances. They are grateful for everything and only wish to make it out of their situation. But poverty chips away at them. Forces them to do whatever they need to do to survive. Even if that means murder. How long can you maintain your sense of self and who you are if you struggle to find food to eat everyday? This movie depicts a raw and horrible part of the human condition. A part that illustrates how people will do what they feel is right in order to survive and protect their family. 

There are only losers in this movie. No one deserved what happened to them. It leaves you feeling horribly unsatisified; there is no justice here. And I think that's the point. Just like there was no justice for what happened to everyone in the movie, there is no justice for those that were dealt the wrong hand in life and forced to live with poverty's chains while trying to break free.

Towards the end of the movie, a news broadcaster poses the question: What was the motive behind this string of murders? The irony is not lost on me and the answer is painfully obvious. An answer that most people, like the news broadcaster, will avert their gaze from. The answer states them in the face and they look the other way.`

export default function Parasite1() {
    return (
        <div className="markdown-content">
            <Markdown>{markdownContent}</Markdown>
        </div>
    );
}