import React from 'react';
import Markdown from 'react-markdown';

const markdownContent = `
# Jade Legacy and the Hope of Kaul Nikoyan

*This essay contains spoilers for parts of the Green Bone Saga.*

## Introduction

Time waits for no man or woman. This is a sentiment I feel very strongly as a near the end of my college undergraduate education. The world moves on. As the arrow of time moves forward, I see the world around me change—the people around me change. I see technology rapidly progress towards an uncertain future that I, as a computer science major, do not agree with. More personally, however, I see people around me change even more so. It seems my friends come to me everyday with ever more exciting news: internships, publications, job offers, and all the like. I am very happy for them. They are my most cherished friends and what kind of person would I be to not want to see them succeed. However, I’m struck by an idea that becomes more and more self-evident the longer I live and the longer I dwell on it. I feel like I don’t belong here. I feel so different and so estranged from my peers sometimes. The longer I am in school and the more people grow up, the more I feel like I am being left behind. The world is moving forward and it is not waiting for me to catch up.
A place where I do find acceptance is in fiction. I know the characters in these books go through struggles and hardships, the likes of which I could not imagine. However, the glimpses of myself I do see in them make me want to cry. They make me want to cry because they give me hope there is a place in the world for me if I keep searching. This has never felt more real to me than when reading The Green Bone Saga by Fonda Lee.

## The Green Bone Saga and Nikoyan

In the words of Lee herself, she describes The Green Bone Saga as an “epic urban fantasy gangster family saga”. To further clarify what she may have meant by this, the series follows the Kauls, the gangster family aforementioned that rules half of Janloon an island nation that controls the export and use of “Bioenergetic Jade” a mineral that, when interacted with by certain people, grants them enhanced physical prowess and senses. This is grossly oversimplifying the series, but a summary is not what I am here to provide you with. The Kauls are a dynasty the oversees the No Peak clan. And through a series of complicated and heart wrenching events, Nikoyan Kaul is born and is destined to claim his birthright as the next Pillar of No Peak. 
Niko was a very interesting character to me and one, frankly, I did not like at first. He felt insufferable and arrogant. However, he also did not know either of his parents. Both of his parents were murdered under sad circumstances and he was adopted by his uncle and aunt. His parents sacrificed everything for him so that maybe he could live a better life. He was thrust into the Green Bone way of life at a young age and under intense pressure. As the son of the previous pillar, who was widely loved, Niko had many expectations to meet or exceed the performance and reputation of his father. His life was predestined from the moment that he was brought into this world. 
He struggled with this immensely. He felt different or disconnected from everyone else around him. He was the son of one of the most important men in the world and was expected to uphold that legacy. Few people understood his nature. His uncle, who took up his father’s post after his death, was hot-headed, violent, and ambitious. Niko was a bit slower, deliberate and thoughtful. But his uncle, Hilo, did not see this. He, instead, saw Niko as lazy. His other siblings were making their own mark on the world. Ru was going to college and expanding his mind and Jaya was clawing through the ranks of No Peak to become one of their fiercest warriors. What was Niko doing? He was a pretty good fighter and did what was asked of him. But beyond that, no one saw him as anyone remarkable. 
Niko did not know who he was. He searched for answers within the clan and never found anything. He was lost and troubled by many things. He never seemed to live up to anyone expectations people didn’t understand him. That is why he ran away. 
Niko ran away from his destiny and joined a private security company instead. His actions were condemned by his family and everyone else around him. He sought meaning to his life outside of the clan and, in doing so, turned his back on those who supported him his entire life. 

## Me

When I look at Niko, I see reflections of myself. Although the circumstances of our lives are very different, part of the beauty of art is that it is up to the interpretation of the people that consume it. When I try on Niko’s shoes and I realize that they feel like they fit quite well.
Niko is a man who is deeply disillusioned and lost. He comes from a family that sacrificed life and limb for him so that he could have a better future. However, as he grows up, he also struggles with the expectations and burdens that are placed upon him as he grew older. In a way, this does not seem very different from the experiences of many second-generation U.S. citizens, whose parents immigrated here. Although my family did not sacrifice life and limb for me, they might as well have. They gave up everything they knew to immigrate to a new and foreign land that might have not been very hospitable to them. In the search of socio-economic mobility and a better life for their children, they left their homeland that they felt most comfortable with. Although I grew up in the U.S., I cannot help but feel a deep bond to India. Sometimes, rather than having the best of both worlds and feeling like a belong in both countries, I feel as if I do not belong in either. I am too American to belong in India and too Indian to belong in America. 
My parents sacrificed so much to bring me to where I am today. Because of this, I cannot help but feel extreme guilt that I am unable to live up to my own expectations. Why is it that I’ve had to struggle so much to get to where I am today and I feel as if I am nowhere near the peaks that my parents have climbed? Why is it that my life is so much easier than theirs’ and yet I struggle to achieve, even half, of what they have? This expectation is something I don’t think I have ever made peace with. Even worse, it seems that all of my peers have something to show for except for me. They have all done so much and it seems that I have done so little. 
All of these circumstances culminated into something that deeply troubles me. I don’t feel understood. As much as I can write these words into an essay and as much as I can try to convince you, the reader, what I am feeling, this is the fact of the matter. Despite the setbacks I have encountered in my academic career, I can still raise my head up high and confidently claim I love to learn. I enjoy studying mathematics no matter what a professor or a class tries to tell me. But in spite of this, I feel very slow on the uptake. I like to think about things. Niko’s situation really spoke to me in this sense. I was able to see so much of myself in him that his journey as a character impacted my profoundly. 


`;

export default function JadeLegacy() {
    return (
        <div className="markdown-content">
            <Markdown>{markdownContent}</Markdown>
        </div>
    );
}
