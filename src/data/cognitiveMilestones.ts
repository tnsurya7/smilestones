export interface CognitiveMilestone {
  id: string;
  text: string;
  type: 'yes_no' | 'input';
}

export const COGNITIVE_MILESTONES: Record<number, CognitiveMilestone[]> = {
  2: [
    { id: 'cm_2_1', text: 'Watches you as you move', type: 'yes_no' },
    { id: 'cm_2_2', text: 'Looks at a toy for several seconds', type: 'yes_no' },
    { id: 'cm_2_3', text: 'Does your baby look at objects that are 8–10 inches away?', type: 'yes_no' },
    { id: 'cm_2_4', text: 'When you move around, does your baby follow you with his eyes?', type: 'yes_no' },
    { id: 'cm_2_5', text: 'When you move a toy slowly from side to side in front of your baby\'s face (about 10 inches away), does your baby follow the toy with her eyes, sometimes turning head?', type: 'yes_no' },
    { id: 'cm_2_6', text: 'When you move a small toy up and down slowly in front of your baby\'s face (about 10 inches away), does your baby follow the toy with his eyes?', type: 'yes_no' },
    { id: 'cm_2_7', text: 'When you hold your baby in a sitting position, does she look at a toy (About the size of a cup or rattle) that you place on the table or floor in front of her?', type: 'yes_no' },
    { id: 'cm_2_8', text: 'When you dangle a toy above your baby while he is lying on his back, does he wave his arms toward the toy', type: 'yes_no' }
  ],
  4: [
    { id: 'cm_4_1', text: 'If hungry, opens mouth when she sees breast or bottle', type: 'yes_no' },
    { id: 'cm_4_2', text: 'Looks at his hands with interest', type: 'yes_no' },
    { id: 'cm_4_3', text: 'When you move a toy slowly from side to side in front of your baby\'s face (about 10 inches away), does your baby follow the toy with his eyes, sometimes turning his head?', type: 'yes_no' },
    { id: 'cm_4_4', text: 'When you move a small toy up and down slowly in front of your baby\'s face (about 10 inches away), does your baby follow the toy with her eyes?', type: 'yes_no' },
    { id: 'cm_4_5', text: 'When you hold your baby in a sitting position, does he look at a toy (About the size of a cup or rattle) that you place on the table or floor in front of him?', type: 'yes_no' },
    { id: 'cm_4_6', text: 'When you put a toy in her hand, does your baby look at it?', type: 'yes_no' },
    { id: 'cm_4_7', text: 'When you put a toy in his hand, does your baby put the toy in his mouth?', type: 'yes_no' }
  ],
  6: [
    { id: 'cm_6_1', text: 'Puts things in her mouth to explore them', type: 'yes_no' },
    { id: 'cm_6_2', text: 'Reaches to grab a toy he wants', type: 'yes_no' },
    { id: 'cm_6_3', text: 'Closes lips to show she doesn\'t want more food', type: 'yes_no' },
    { id: 'cm_6_4', text: 'When a toy is in front of your baby, does she reach for it with both hands?', type: 'yes_no' },
    { id: 'cm_6_5', text: 'When your baby is on his back, does he turn his head to look for a toy when he drops it? (If he already picks it up, mark "yes" for this item.)', type: 'yes_no' },
    { id: 'cm_6_6', text: 'When your baby is on her back, does she try to get a toy she has dropped if she can see it? Does your baby pick up a toy and put it in his mouth?', type: 'yes_no' },
    { id: 'cm_6_7', text: 'Does your baby pass a toy back and forth from one hand to the other?', type: 'yes_no' },
    { id: 'cm_6_8', text: 'Does your baby play by banging a toy up and down on the floor or table?', type: 'yes_no' }
  ],
  8: [
    { id: 'cm_8_1', text: 'Does your baby pick up a toy and put it in his mouth?', type: 'yes_no' },
    { id: 'cm_8_2', text: 'When your baby is on her back, does she try to get a toy she has dropped if she can see it? Does your baby play by banging a toy up and down on the floor or table?', type: 'yes_no' },
    { id: 'cm_8_3', text: 'Does your baby pass a toy back and forth from one hand to the other?', type: 'yes_no' },
    { id: 'cm_8_4', text: 'Does your baby pick up two small toys, one in each hand, and hold on to them for about 1 minute?', type: 'yes_no' },
    { id: 'cm_8_5', text: 'When holding a toy in his hand, does your baby bang it against another toy on the table', type: 'yes_no' }
  ],
  9: [
    { id: 'cm_9_1', text: 'Looks for objects when dropped out of sight (like his spoon or toy)', type: 'yes_no' },
    { id: 'cm_9_2', text: 'Bangs two things together', type: 'yes_no' },
    { id: 'cm_9_3', text: 'Does your baby pass a toy back and forth from one hand to the other?', type: 'yes_no' },
    { id: 'cm_9_4', text: 'Does your baby pick up two small toys, one in each hand, and hold on to them for about 1 minute?', type: 'yes_no' },
    { id: 'cm_9_5', text: 'When holding a toy in his hand, does your baby bang it against another toy on the table? While holding a small toy in each hand, does your baby clap the toys together (like "Pat-a-cake")?', type: 'yes_no' },
    { id: 'cm_9_6', text: 'Does your baby poke at or try to get a crumb or Cheerio that is inside a clear bottle (such as a plastic soda-pop bottle or baby bottle)?', type: 'yes_no' },
    { id: 'cm_9_7', text: 'After watching you hide a small toy under a piece of paper or cloth, does your baby find it? (Be sure the toy is completely hidden.)', type: 'yes_no' }
  ],
  10: [
    { id: 'cm_10_1', text: 'Does your baby pass a toy back and forth from one hand to the other?', type: 'yes_no' },
    { id: 'cm_10_2', text: 'Does your baby pick up two small toys, one in each hand, and hold on to them for about 1 minute?', type: 'yes_no' },
    { id: 'cm_10_3', text: 'When holding a toy in his hand, does your baby bang it against another toy on the table? While holding a small toy in each hand, does your baby clap the toys together (like "Pat-a-cake")?', type: 'yes_no' },
    { id: 'cm_10_4', text: 'Does your baby poke at or try to get a crumb or Cheerio that is inside a clear bottle?', type: 'yes_no' },
    { id: 'cm_10_5', text: 'After watching you hide a small toy under a piece of paper or cloth, does your baby find it?', type: 'yes_no' }
  ],
  12: [
    { id: 'cm_12_1', text: 'Puts something in a container, like a block in a cup', type: 'yes_no' },
    { id: 'cm_12_2', text: 'Looks for things he sees you hide, like a toy under a blanket', type: 'yes_no' },
    { id: 'cm_12_3', text: 'When holding a small toy in each hand, does your baby clap the toys together (like "Pat-a-cake")?', type: 'yes_no' },
    { id: 'cm_12_4', text: 'Does your baby poke at or try to get a crumb or Cheerio that is inside a clear bottle? After watching you hide a small toy under a piece of paper or cloth, does your baby find it?', type: 'yes_no' },
    { id: 'cm_12_5', text: 'If you put a small toy into a bowl or box, does your baby copy you by putting in a toy, although she may not let go of it?', type: 'yes_no' },
    { id: 'cm_12_6', text: 'Does your baby drop two small toys, one after the other, into a container like a bowl or box?', type: 'yes_no' },
    { id: 'cm_12_7', text: 'After you scribble back and forth on paper with a crayon (or a pencil or pen), does your baby copy you by scribbling?', type: 'yes_no' }
  ],
  14: [
    { id: 'cm_14_1', text: 'If you put a small toy into a bowl or box, does your baby copy you by putting in a toy, although he may not let go of it? Does your baby drop two small toys, one after the other, into a container like a bowl or box?', type: 'yes_no' },
    { id: 'cm_14_2', text: 'After you scribble back and forth on paper with a crayon (or a pencil or pen), does your baby copy you by scribbling?', type: 'yes_no' },
    { id: 'cm_14_3', text: 'Can your baby drop a crumb or Cheerio into a small, clear?', type: 'yes_no' },
    { id: 'cm_14_4', text: 'Does your baby drop several small toys, one after another, into a container like a bowl or box?', type: 'yes_no' },
    { id: 'cm_14_5', text: 'After you have shown your baby how, does he try to get a small toy that is slightly out of reach by using a spoon, stick, or similar tool?', type: 'yes_no' }
  ],
  15: [
    { id: 'cm_15_1', text: 'Tries to use things the right way, like a phone, cup, or book', type: 'yes_no' },
    { id: 'cm_15_2', text: 'Stacks at least two small objects, like blocks', type: 'yes_no' }
  ],
  16: [
    { id: 'cm_16_1', text: 'After you scribble back and forth on paper with a crayon (or pencil or pen), does your child copy you by scribbling?', type: 'yes_no' },
    { id: 'cm_16_2', text: 'Can your child drop a crumb or Cheerio into a small, clear bottle?', type: 'yes_no' },
    { id: 'cm_16_3', text: 'Does your child drop several small toys, one after another, into a container like a bowl or box?', type: 'yes_no' },
    { id: 'cm_16_4', text: 'After you have shown your child how, does she try to get a small toy that is slightly out of reach by using a spoon, stick, or similar tool?', type: 'yes_no' },
    { id: 'cm_16_5', text: 'Without your showing him how, does your child scribble back and forth when you give him a crayon (or pencil or pen)?', type: 'yes_no' },
    { id: 'cm_16_6', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turns the bottle upside down to dump it out?', type: 'yes_no' }
  ],
  18: [
    { id: 'cm_18_1', text: 'Copies you doing chores, like sweeping with a broom', type: 'yes_no' },
    { id: 'cm_18_2', text: 'Plays with toys in a simple way, like pushing a toy car', type: 'yes_no' },
    { id: 'cm_18_3', text: 'Does your child drop several small toys, one after another, into a container like a bowl or box?', type: 'yes_no' },
    { id: 'cm_18_4', text: 'After you have shown your child how, does she try to get a small toy that is slightly out of reach by using a spoon, stick, or similar tool?', type: 'yes_no' },
    { id: 'cm_18_5', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turns the bottle over to dump it out? Without your showing her how, does your child scribble back and forth when you give her a crayon (or pencil or pen)?', type: 'yes_no' },
    { id: 'cm_18_6', text: 'After watching you draw a line from the top of the paper to the bottom with a crayon (or pencil or pen), does your child copy you by drawing a single line on the paper in any direction?', type: 'yes_no' },
    { id: 'cm_18_7', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turns the bottle upside down to dump out the crumb or Cheerio?', type: 'yes_no' }
  ],
  20: [
    { id: 'cm_20_1', text: 'Without your showing him how, does your child scribble back and forth when you give him a crayon (or pencil or pen)?', type: 'yes_no' },
    { id: 'cm_20_2', text: 'After watching you draw a line from the top of the paper to the bottom with a crayon (or pencil or pen), does your child copy you by drawing a single line on the paper in any direction?', type: 'yes_no' },
    { id: 'cm_20_3', text: 'If you do any of the following gestures, does your child copy at least one of them? a) Open and close your mouth. b) Blink your eyes. c) Pull on your earlobe. d) Pat your cheek.', type: 'yes_no' },
    { id: 'cm_20_4', text: 'If you give your child a bottle, spoon, or pencil upside down, does she turn it right side up so that she can use it properly?', type: 'yes_no' },
    { id: 'cm_20_5', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up at least two blocks side by side?', type: 'yes_no' },
    { id: 'cm_20_6', text: 'If your child wants something he cannot reach, does he find a chair or box to stand on to reach it?', type: 'yes_no' }
  ],
  22: [
    { id: 'cm_22_1', text: 'Without you showing her how, does your child scribble back and forth when you give her a crayon (or pencil or pen)?', type: 'yes_no' },
    { id: 'cm_22_2', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up at least two blocks side by side?', type: 'yes_no' },
    { id: 'cm_22_3', text: 'Does your child pretend objects are something else? For example, does your child hold a cup to his ear, pretending it is a telephone? Does he put a box on his head, pretending it is a hat? Does he use a block or small toy to stir food?', type: 'yes_no' },
    { id: 'cm_22_4', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turns the bottle upside down to dump out the crumb or Cheerio?', type: 'yes_no' },
    { id: 'cm_22_5', text: 'If you give your child a bottle, spoon, or pencil upside down, does he turn it right side up so that he can use it properly?', type: 'yes_no' }
  ],
  24: [
    { id: 'cm_24_1', text: 'Holds something in one hand while using the other hand; for example, holding a container and taking the lid off Tries to use switches, knobs, or buttons on a toy', type: 'yes_no' },
    { id: 'cm_24_2', text: 'Plays with more than one toy at the same time, like putting toy food on a toy plate', type: 'yes_no' },
    { id: 'cm_24_3', text: 'After watching you draw a line from the top of the paper to the bottom with a crayon (or pencil or pen), does your child copy you by drawing a single line on the paper in any direction?', type: 'yes_no' },
    { id: 'cm_24_4', text: 'After a crumb or Cheerio is dropped into a small, clear bottle, does your child turns the bottle upside down to dump out the crumb or Cheerio?', type: 'yes_no' },
    { id: 'cm_24_5', text: 'Does your child pretend objects are something else? For example, does your child hold a cup to her ear, pretending it is a telephone? Does she put a box on her head, pretending it is a hat? Does she use a block or small toy to stir food?', type: 'yes_no' },
    { id: 'cm_24_6', text: 'Does your child put things away where they belong? For example, does he knows his toys belong on the toy shelf, his blanket goes on his bed, and dishes go in the kitchen?', type: 'yes_no' },
    { id: 'cm_24_7', text: 'If your child wants something she cannot reach, does she find a chair or box to stand on to reach it?', type: 'yes_no' },
    { id: 'cm_24_8', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row?', type: 'yes_no' }
  ],
  27: [
    { id: 'cm_27_1', text: 'Does your child pretend objects are something else? For example, does your child hold a cup to his ear, pretending it is a telephone? Does he put a box on her head, pretending it is a hat? Does he use a block or small toy to stir food?', type: 'yes_no' },
    { id: 'cm_27_2', text: 'Does your child put things away where they belong?', type: 'yes_no' },
    { id: 'cm_27_3', text: 'When looking in the mirror, ask "Where is _____?" (Use your child\'s name.) Does your child point to his image in the mirror?', type: 'yes_no' },
    { id: 'cm_27_4', text: 'If your child wants something she cannot reach, does she find a chair or box to stand on to reach it?', type: 'yes_no' },
    { id: 'cm_27_5', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row?', type: 'yes_no' },
    { id: 'cm_27_6', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar', type: 'yes_no' }
  ],
  30: [
    { id: 'cm_30_1', text: 'When looking in the mirror, ask, "Where is ______?" (Use your child\'s name.) Does your child point to her image in the mirror?', type: 'yes_no' },
    { id: 'cm_30_2', text: 'If your child wants something he cannot reach, does he find a chair or box to stand on to reach it?', type: 'yes_no' },
    { id: 'cm_30_3', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row?', type: 'yes_no' },
    { id: 'cm_30_4', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? Please write your child\'s response here', type: 'input' }
  ],
  33: [
    { id: 'cm_33_1', text: 'When looking in the mirror, ask, "Where is _______?" (Use your child\'s name.) Does your child point to her image in the mirror?', type: 'yes_no' },
    { id: 'cm_33_2', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row?', type: 'yes_no' },
    { id: 'cm_33_3', text: 'If your child wants something he cannot reach, does he find a chair or box to stand on to reach it?', type: 'yes_no' },
    { id: 'cm_33_4', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? Please write your child\'s response here:', type: 'input' },
    { id: 'cm_33_5', text: 'When you say, "Say \'seven three,\'" does your child repeat just the two numbers in the same order? Do not repeat the numbers. If necessary, try another pair of numbers and say, "Say \'eight two.\'" (Your child must repeat just one series of two numbers for you to answer "yes" to this question.)', type: 'yes_no' },
    { id: 'cm_33_6', text: 'After your child draws a "picture," even a simple scribble, does she tell you what she drew? (You may say, "Tell me about your picture," or ask, "What is this?" to prompt her.)', type: 'yes_no' }
  ],
  36: [
    { id: 'cm_36_1', text: 'Draws a circle, when you show him how', type: 'yes_no' },
    { id: 'cm_36_2', text: 'Avoids touching hot objects, like a stove, when you warn her', type: 'yes_no' },
    { id: 'cm_36_3', text: 'While your child watches, line up four objects like blocks or cars in a row. Does your child copy or imitate you and line up four objects in a row?', type: 'yes_no' },
    { id: 'cm_36_4', text: 'If your child wants something he cannot reach, does he find a chair or box to stand on to reach it?', type: 'yes_no' },
    { id: 'cm_36_5', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? Please write your child\'s response here:', type: 'input' },
    { id: 'cm_36_6', text: 'Show your child how to make a bridge with blocks, boxes, or cans, like the example. Does your child copy you by making one like it?', type: 'yes_no' },
    { id: 'cm_36_7', text: 'When you say, "Say \'five eight three,\'" does your child repeat just the three numbers in the same order? Do not repeat the numbers. If necessary, try another series of numbers and say, "Say \'six nine two.\'" (Your child must repeat just one series of three numbers for you to answer "yes" to this question.)', type: 'yes_no' }
  ],
  42: [
    { id: 'cm_42_1', text: 'When you point to the figure and ask your child, "What is this?" does your child say a word that means a person or something similar? Please write your child\'s response here:', type: 'input' },
    { id: 'cm_42_2', text: 'When you say, "Say \'seven three,\'" does your child repeat just the two numbers in the same order? Do not repeat the numbers. If necessary, try another pair of numbers and say, "Say \'eight two.\'" (Your child must repeat just one series of two numbers for you to answer "yes" to this question.)', type: 'yes_no' },
    { id: 'cm_42_3', text: 'Show your child how to make a bridge with blocks, boxes, or cans, like the example. Does your child copy you by making one like it?', type: 'yes_no' },
    { id: 'cm_42_4', text: 'When you say, "Say \'five eight three,\'" does your child repeat just the three numbers in the same order? Do not repeat the numbers. If necessary, try another series of numbers and say, "Say \'six nine two.\'" (Your child must repeat just one series of three numbers for you to answer "yes" to this question.)', type: 'yes_no' },
    { id: 'cm_42_5', text: 'When asked, "Which circle is the smallest?" does your child point to the smallest circle? (Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)', type: 'yes_no' },
    { id: 'cm_42_6', text: 'Does your child dress up and "play-act," pretending to be someone or something else? For example, your child may dress up in different clothes and pretend to be a mommy, daddy, brother or sister, or an imaginary animal or figure.', type: 'yes_no' }
  ],
  48: [
    { id: 'cm_48_1', text: 'Names a few colors of items', type: 'yes_no' },
    { id: 'cm_48_2', text: 'Tells what comes next in a well-known story', type: 'yes_no' },
    { id: 'cm_48_3', text: 'Draws a person with three or more body parts', type: 'yes_no' },
    { id: 'cm_48_4', text: 'When you say, "Say \'five eight three,\'" does your child repeat just the three numbers in the same order? Do not repeat the numbers. If necessary, try another series of numbers and say, "Say \'six nine two.\'" (Your child must repeat just one series of three numbers to answer "yes" to this question.)', type: 'yes_no' },
    { id: 'cm_48_5', text: 'When asked, "Which circle is the smallest?" does your child point to the smallest circle? (Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)', type: 'yes_no' },
    { id: 'cm_48_6', text: 'Without your giving help by pointing, does your child follow three different directions using the words "under," "between," and "middle"? For example, ask your child to put the shoe "under the couch." Then ask her to put the ball "between the chairs" and the book "in the middle of the table."', type: 'yes_no' },
    { id: 'cm_48_7', text: 'When shown objects and asked, "What color is this?" does your child name five different colors, like red, blue, yellow, orange, black, white, or pink? (Mark "yes" only if your child answers the question correctly using five colors.)', type: 'yes_no' },
    { id: 'cm_48_8', text: 'Does your child dress up and "play-act," pretending to be someone or something else? For example, your child may dress up in different clothes and pretend to be a mommy, daddy, brother, or sister, or an imaginary animal or figure.', type: 'yes_no' },
    { id: 'cm_48_9', text: 'If you place five objects in front of your child, can he count them by saying, "one, two, three, four, five," in order? (Ask this question without providing help by pointing, gesturing, or naming.)', type: 'yes_no' }
  ],
  54: [
    { id: 'cm_54_1', text: 'When shown objects and asked, "What color is this?" does your child name five different colors, like red, blue, yellow, orange, black, white, or pink? (Mark "yes" only if your child answers the question correctly using five colors.)', type: 'yes_no' },
    { id: 'cm_54_2', text: 'Does your child dress up and "play-act," pretending to be someone or something else? For example, your child may dress up in different clothes and pretend to be a mommy, daddy, brother, sister, or an imaginary animal or figure.', type: 'yes_no' },
    { id: 'cm_54_3', text: 'If you place five objects in front of your child, can she count them by saying, "One, two, three, four, five" in order? (Ask this question without providing help by pointing, gesturing, or naming.)', type: 'yes_no' },
    { id: 'cm_54_4', text: 'When asked, "Which circle is smallest?" does your child point to the smallest circle? (Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)', type: 'yes_no' },
    { id: 'cm_54_5', text: 'Does your child count up to 15 without making mistakes? If so, mark "Yes." If your child counts to 12 without making mistakes, mark "sometimes."', type: 'yes_no' },
    { id: 'cm_54_6', text: 'Does your child know the names of numbers? (Mark "yes" if he identifies the three numbers below. Mark "sometimes" if he identifies two numbers.)', type: 'yes_no' }
  ],
  60: [
    { id: 'cm_60_1', text: 'Counts to 10', type: 'yes_no' },
    { id: 'cm_60_2', text: 'Names some numbers between 1 and 5 when you point to them', type: 'yes_no' },
    { id: 'cm_60_3', text: 'Uses words about time, like "yesterday," "tomorrow," "morning," or "night"', type: 'yes_no' },
    { id: 'cm_60_4', text: 'Pays attention for 5 to 10 minutes during activities. For example, during story time or making arts and crafts (screen time does not count)', type: 'yes_no' },
    { id: 'cm_60_5', text: 'Writes some letters in her name', type: 'yes_no' },
    { id: 'cm_60_6', text: 'Names some letters when you point to them', type: 'yes_no' },
    { id: 'cm_60_7', text: 'When asked, "Which circle is smallest?" does your child point to the smallest circle? (Ask this question without providing help by pointing, gesturing, or looking at the smallest circle.)', type: 'yes_no' },
    { id: 'cm_60_8', text: 'When shown objects and asked, "What color is this?" does your child name five different colors like red, blue, yellow, orange, black, white, or pink? (Mark "yes" only if your child answers the question correctly using five colors.)', type: 'yes_no' },
    { id: 'cm_60_9', text: 'Does your child count up to 15 without making mistakes? If so, mark "yes." If your child counts to 12 without making mistakes, mark "Sometimes."', type: 'yes_no' },
    { id: 'cm_60_10', text: 'Does your child finish the following sentences using a word that means the opposite of the word that is italicized? For example: "A rock is hard, and a pillow is soft." Please write your child\'s responses below: A cow is big, and a mouse is ___ Ice is cold, and fire is ___ We see stars at night, and we see the sun during the ___ When I throw the ball up, it comes ___ (Mark "yes" if he finishes three of four sentences correctly. Mark "sometimes" if he finishes two of four sentences correctly.)', type: 'input' },
    { id: 'cm_60_11', text: 'Does your child know the names of numbers? (Mark "yes" if she identifies the three numbers below. Mark "sometimes" if she identifies two numbers.) 3 1 2', type: 'yes_no' },
    { id: 'cm_60_12', text: 'Does your child\'s name at least four letters in her name? Point to the letters and ask, "What letter is this?" (Point to the letters out of order.)', type: 'yes_no' }
  ]
};

export const COGNITIVE_AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
