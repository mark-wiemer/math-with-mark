# Roadmap

Plans for future development

## Motivation and vision

Overall, the purpose of this project is to make math problems feel more interactive. Currently, students are stuck with static views of a math problem and asked to understand each line by just looking and thinking. This is hard, boring work that doesn't reflect reality, and just isn't good learning.

Students should be able to play with the problems, to dive deep into why a certain value changed from one step to the next, to connect problems together, to take notes, to highlight, and generally toy around with the problem. It should feel like a thing that exists, not just symbols on paper.

Math with Mark will provide free, accessible, interactive math lessons.

Free: Students should be able to use this. Students are not historically rich people. I will figure out the financials later.

Accessible: This is primarily the opposite of "intimidating". I strive to take great care to ensure the presentation of problems is not overwhelming or frustrating. WCAG accessibility and accessibility in low-bandwidth or no-internet environments is also a priority.

Interactive: As stated, this site is not just another textbook. It should be a novel way of interacting with math problems so students actually, you know, interact with math problems.

Math: I'm a math major. I'm starting here. Who knows what the future may hold?

Lessons: I do want to integrate a sort of chatbot tutor, especially now that [Khan Academy stole my idea](https://openai.com/customer-stories/khan-academy) 😉 Though I don't think we need GPT-4 for most of the basic questions!

Also, please ignore the unfortunate acronym that comes with the removal of the word "math". I am not good at planning.

## User-facing

1. Support fractions
1. Custom interactive math expression renderer

## Technical

Internal changes not necessarily affecting end-users directly

1. Integrate with React micro-frontend
1. Migrate to ADO
1. Resolve [peer dependency issue with react-mathquill](https://github.com/viktorstrate/react-mathquill/issues/55)
