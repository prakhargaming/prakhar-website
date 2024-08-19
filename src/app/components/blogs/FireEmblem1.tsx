import Markdown from 'react-markdown'
import React from 'react'

const markdownContent = `# Fire Emblem Engage: The Never-ending Journey.
At the time of writing, it has only been a few hours since I finished the main story of Fire Emblem Engage. After properly reminiscing about the game, doing what feels like my 30th listen of the OST, and talking about the game extensively with my brother-- I decided I wanted to write a love letter of sorts to this game that I hold close to my heart.

I bought Engage very close to launch. I remember telling my brother and all my friends "Oh, this game looks so unpolished and boring I'm probably not gonna pick it up." This was my first mistake. I have a short but fruitful history with the series. I was introduced through Fire Emblem Heroes (it could be argued this was my original mistake) and had a blast with it. Shortly following, I played the game that would forever change my brain chemistry: Fire Emblem Three Houses. FETH is not a perfect game. But that being said, I would be lying if I still didn't think about it years after I finished it. To this day I'm still not sure what that game did to make me feel this way but I can't deny the impact that it left on me. I think about the story of the three lords so often and I have this deep nostalgia for it I can't really explain. It was one of the first games in which I felt compelled to try its highest difficulty. Maddening mode was an incredibly painful experience but I loved the game so much that I put in my best effort. To this day that save file remains unfinished.

When the trailer for Engage dropped, I remember feeling a roller coaster of emotions. I heard Engage's rendition of the Fire Emblem theme and immediately thought to myself: this might be the greatest game of all time. However, as we saw more content about the game my interest started to rapidly decline. I just thought it looked so goofy and childish. Why would I want to play something like this after three houses? Regardless, I caved and purchased the game on the e-shop when it was released.

I booted up the game and was assaulted by the main theme, Emblem Engage! I had similar thoughts to those that I had before, why is it so silly? But I couldn't deny the animations were really good. I loved how expressive and bright the characters were. I played through a few sections of the game and remember laughing at Lumera's death. I immediately recognized the map design and additional gameplay mechanics were really cool but the story was really silly and the characters were one note. I told my brother "The game is good but I can't help but think about Three Houses every time I play the game." This was probably my biggest mistake with this game. I went into it expecting something it was not. Something it was never trying to be.

I started this game in the fall quarter of my junior year of college. It was a really tough time for me. I had just switched majors, I started a middle-distance relationship and I was a wreck emotionally. It was a lot of change at once for me to handle and I was constantly overwhelmed. I always felt I was spread way too thin. I constantly felt like I was sacrificing one thing for the sake of another. If I give more time to my girlfriend I won't have as much time for school. If I give more time to my school then I won't have as much time to sleep. If I give more time to sleep I won't have time to give to my club. The list goes on. It was always an impossible balancing act.

Regardless, I started this game around this time. I didn't have that much time for it. I barely got 30 minutes in every few days. I always had something else that demanded my time but looking back some of my more fond memories this academic year were when I was able to sit down, clear my head, and just play Engage for 30 minutes. As the school year pushed on, so did my progress with the game. I think the fact I played this game over such a long period of time just helped me appreciate it that much more. I fondly remember hearing "Bold Bright Sandstorm" for the first time and instantly felt such a warm feeling of wonder and whimsy. The chord progressions and tone of the song just made me feel such a sense of happiness and exploration. It was then that I realized just how much fun I was having with this game. I loved seeing how much love and care went into the character designs, dialogue, music, and maps. They all felt so vibrant and alive. Indeed, that is how I would describe most of the game and how it made me feel.

I grew a lot over the past year and this game watched me through it all. It was always there for me when I was feeling stressed and when I just needed something to help me calm down, I would go back to Engage. Unironically, when I broke up with my girlfriend, Engage was there. When I did poorly on an exam, Engage was there. We persevered through thick and thin together.

I finally defeated Sombron and after a few more cutscenes, the song "The Journey is Finally..." played. The song that plays in the background as the game tells you where all your units ended up in the future.

This song broke me.

It might be my favorite Fire Emblem song ever composed. It so masterfully wove together all the different themes and motifs that were present throughout the game and it was symbolic of your journey across Elyos since the motifs played in the order you encountered them. As I listened to it, a thought finally clicked in my head: "the journey is over". This game, that had been with me through it all, this never-ending journey-- it had reached its conclusion.

I am eternally grateful this game exists. I went into it thinking it would be something it was not. Ultimately, as with many things in life, it was special and unique in its own way. I look back on it very fondly and eagerly await the next game in the series. This game, in a lot of ways, taught me to love playing games again and that makes me really happy.

I hope other people were able to find the same sort of enjoyment that I found in this game. Thank you for reading and thank you Tsutomu Tei for directing such a fun and meaningful experience.`

export default function FireEmblem1() {
    return (
        <div className="markdown-content">
            <Markdown>{markdownContent}</Markdown>
        </div>
    );
}