# My Google Fivers Adventure
This is the code I used to participate in creativelab5.com

There are a bunch of things I did. I'm a coder so of course it's less beautiful but more hack'ish 🤓

## Final Version
Look here:  
https://www.creativelab5.com/s/9RwmTD

The story? Well we have an intruder. A pink circle which shouldn't be part of the google logo. What happens? Yeah of course, the google logo gets angry, very angry! But it doesn't help and on the google logo is just bewildered in the end. And just in this moment of confusion I reveal the image of the spiral which wasn't visible before- as it was white on white. `Woooooooowww` suprise, it's a rasterized version of me.

Everything is going pretty quick as time is precious but I hope you like it.

## Process
I started playing around with the given objects. Pretty soon I discovered the console 
messages (Some Hello World stuff) and I immediately downloaded the minified JS code. After making it pretty I looked through it, identified the involved libraries and isolated the core of the application code. This alone was so much fun. If you wonder about the involved libraries: The most important parts are: Paper JS, React, Quill (Timeline)  and chancejs for the internal random names.

While I was looking through the files I discovered that the HelloWorld message was not the only message. There was a chain of messages which were triggered one after one- by somem triggers. And yeah, that's when I recognized that I should actually use the console to interact with the creative5 app.

I worked through the whole puzzle and earned the crab- reserved for us hackers 👊 From now on I understood that I should do much more than inetracting with the console. I decided to rebuild the app locally by downloading all necessary files. Now I was able to monkey patch parts of the source files to improve my udnerstanding of the code and it also enabled me to add some convenient callbacks so I could interact much better with the source. 

With that being said I soon created my own classes to make my life easier with those tasks:
+ Create my own shapes by code
+ Create my own keyframes by code
+ Try some other fancy tricks around path building (image raster) and path aniamtion (tweenmax and math based calcualtions)

It was so exciting to dig deeper and deeper and I digged soooo deep and created so much stuff:
+ I rasterized an image of me based on this examples (http://paperjs.org/examples/spiral-raster/)
+ I animated that whole spiral. This generated far too many keyframes (as the generated path is VERY huge and the creative5 engine is based around single points per keyframe, not path properties like rotation/translation)

+  I created my own classes of keyframes and shapes with corresponding parsers and serializers so I can create my own data structure which can be read by the iven creative5 engine again- this step is manually. I open the lab page, go to dev panel > resources > Local Storage and replace the given data with my locally generated data.

+ I read in my own svg paths, populated key shortcuts with KeyboardJS to make my life easier, used chroma js for soem beautiful hsl colors

+ I also created a TimelineMax (gsap) scanning utility which would translate any prepared gsap animation in a keyframe data sequences- which would conform to the creative5 engine for easy copy pasting.

## Final Version Implementation
There are only 540 frames. I found no way of extending the duration as the relevant parameters are hard coded and not part of the "protocol".

There are also only 10 given keyframes. But by using my own keyframing process - decoupled fron the main timeline - I was able to use any frame between 0 and 540 it was just interpolated fine.

I included two main parts: 
The spiral and an animation with the given shapes and an additional pink shape.

Regardign the spiral:
As a coder my result of generating the spiral with my own image was kind of naturally. But I couldn't do any aniamtion/keyframing with that spiral as it would multiplicate the already large amount of points. There is some maximum size on the endpoint for saving your creation and I could a lot of errors with the status code 500. This is a clear sign that I created to much data. So I limited myself to a single spiral with no keyframes. Just static.

The main animation:
That story is very easy (see my final version note). To manage the different states
of the google logo parts I used my keyboard shortcut based system together with a state manager. My workflow was like this: Save with `j` the state of any selected object to the local storage, copy the content into a text file. Load all those filles and apply them during startup after a reload. With this I could extend the whole animation step after step. The end result was always available for copy past in the localStorage. 

The only thing I did: Run my hint runner to get the crab badge of course.

## Conclusion
I spend sooooo much time for such a silly animation- but I felt my passion burning so I regret NOTHING and I learned a lot- especially about Paper JS. Thanks a lot fivers, you all did a great job with the that engine. 


High five fivers. 🙌

Georgios Kaleadis
2vc.org