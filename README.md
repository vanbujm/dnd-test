# DnD Code test
Hello nerds! This is my submission for the take home test.

So I made some decisions when tackling this problem. For the record, I don't believe I took the most 
pragmatic decisions either, things like I used both the graphql API and the rest API for fun.
I also didn't use any design systems like Material UI or Bootstrap, mostly because they are super boring.

## Setup/Install

Getting things installed
- `yarn` or `npm i` (going to assume yarn from now on)

Running the tests
- `yarn test`

Take a look at Storybook!
- `yarn storybook`

Run the local server
- `yarn start`

[View the real deal](https://dnd-test.vercel.app/)

### Known Issues
So you can actually filter the spell lists by what spells are available at that level if you hit the
`/spells/{spellName}` API endpoint. Cooler kids than me would have, but stitching together rest data is a 
pain and its pretty expensive to hit the API for each spell (there are 319 spells...) without using a global 
store or some such.

The class popup panels are supposed to never clip outside the screen. However, I did not have time to add a 
window resize listener, so if you resize the window and make it smaller it will break.
