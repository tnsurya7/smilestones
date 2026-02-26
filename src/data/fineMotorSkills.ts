// Type definitions
interface FineMotorSkill {
  id: string;
  text: string;
}

interface FineMotorSkillsByAge {
  [age: number]: FineMotorSkill[];
}

export const FINE_MOTOR_SKILLS: FineMotorSkillsByAge = {
  2: [
    { id: 'fm_2_1', text: 'Is your baby\'s hand usually tightly closed when he is awake? (If your baby used to do this but no longer does, mark "yes.")' },
    { id: 'fm_2_2', text: 'Does your baby grasp your finger if you touch the palm of her hand?' },
    { id: 'fm_2_3', text: 'When you put a toy in his hand, does your baby hold it in his hand briefly?' },
    { id: 'fm_2_4', text: 'Does your baby touch her face with her hands?' },
    { id: 'fm_2_5', text: 'Does your baby hold his hands open or partly open when he is awake (rather than in fists, as they were when he was a newborn)?' },
    { id: 'fm_2_6', text: 'Does your baby grab or scratch at her clothes?' }
  ],
  4: [
    { id: 'fm_4_1', text: 'Does your baby hold his hands open or partly open (rather than in fists, as they were when he was a newborn)?' },
    { id: 'fm_4_2', text: 'When you put a toy in her hand, does your baby wave it about, at least briefly?' },
    { id: 'fm_4_3', text: 'Does your baby grab or scratch at his clothes?' },
    { id: 'fm_4_4', text: 'When you put a toy in her hand, does your baby hold onto it for about 1 minute while looking at it, waving it about, or trying to chew it?' },
    { id: 'fm_4_5', text: 'Does your baby grab or scratch his fingers on a surface in front of him, either while being held in a sitting position or when he is on his tummy?' },
    { id: 'fm_4_6', text: 'When you hold your baby in a sitting position, does she reach for a toy on a table close by, even though her hand may not touch it?' }
  ],
  6: [
    { id: 'fm_6_1', text: 'Does your baby grab a toy you offer and look at it, wave it about, or chew on it for about 1 minute?' },
    { id: 'fm_6_2', text: 'Does your baby reach for or grasp a toy using both hands at once?' },
    { id: 'fm_6_3', text: 'Does your baby reach for a crumb or Cheerio and touch it with his finger or hand? (If he already picks up a small object the size of a pea, mark "yes" for this item.)' },
    { id: 'fm_6_4', text: 'Does your baby pick up a small toy, holding it in the center of her hand with her fingers around it?' },
    { id: 'fm_6_5', text: 'Does your baby try to pick up a crumb or Cheerio by using his thumb and all of his fingers in a raking motion, even if he isn\'t able to pick it up? (If he already picks up the crumb or Cheerio, mark "yes" for this item.)' },
    { id: 'fm_6_6', text: 'Does your baby pick up a small toy with only one hand?' }
  ],
  8: [
    { id: 'fm_8_1', text: 'Does your baby reach for a crumb or Cheerio and touch it with her finger or hand? (If she already picks up a small object, mark "yes" for this item.)' },
    { id: 'fm_8_2', text: 'Does your baby pick up a small toy, holding it in the centre of his hand with his fingers around it?' },
    { id: 'fm_8_3', text: 'Does your baby try to pick up a crumb or Cheerio by using her thumb and all of her fingers in a raking motion, even if she isn\'t able to pick it up? (If she already picks up a crumb or Cheerio, mark "yes" for this item.)' },
    { id: 'fm_8_4', text: 'Does your baby pick up a small toy with only one hand?' },
    { id: 'fm_8_5', text: 'Does your baby successfully pick up a crumb or Cheerio by using his thumb and all of his fingers in a raking motion? (If he already picks up a crumb or Cheerio, mark "yes" for this item.)' },
    { id: 'fm_8_6', text: 'Does your baby pick up a small toy with the tips of her thumb and fingers? (You should see a space between the toy and her palm.)' }
  ],
  9: [
    { id: 'fm_9_1', text: 'Does your baby pick up a small toy with only one hand?' },
    { id: 'fm_9_2', text: 'Does your baby successfully pick up a crumb or Cheerio by using her thumb and all of her fingers in a raking motion? (If she already picks up a crumb or Cheerio, mark "yes" for this item.)' },
    { id: 'fm_9_3', text: 'Does your baby pick up a small toy with the tips of his thumb and fingers? (You should see a space between the toy and his palm.)' },
    { id: 'fm_9_4', text: 'After one or two tries, does your baby pick up a piece of string with her first finger and thumb? (The string may be attached to a toy.)' },
    { id: 'fm_9_5', text: 'Does your baby pick up a crumb or Cheerio with the tips of his thumb and a finger? He may rest his arm or hand on the table while doing it.' },
    { id: 'fm_9_6', text: 'Does your baby put a small toy down, without dropping it, and then take her hand off the toy?' }
  ],
  10: [
    { id: 'fm_10_1', text: 'Does your baby pick up a small toy with only one hand?' },
    { id: 'fm_10_2', text: 'Does your baby successfully pick up a crumb or Cheerio by using her thumb and all of her fingers in a raking motion? (If she already picks up a crumb or Cheerio, mark "yes" for this item.)' },
    { id: 'fm_10_3', text: 'After one or two tries, does your baby pick up a piece of string with her first finger and thumb? (The string may be attached to a toy.)' },
    { id: 'fm_10_4', text: 'Does your baby pick up a crumb or Cheerio with the tips of his thumb and a finger? He may rest his arm or hand on the table while doing it.' },
    { id: 'fm_10_5', text: 'Does your baby put a small toy down, without dropping it, and then take her hand off the toy?' }
  ],
  12: [
    { id: 'fm_12_1', text: 'Drinks from a cup without a lid, as you hold it' },
    { id: 'fm_12_2', text: 'Picks things up between thumb and pointer finger, like small bits of food' },
    { id: 'fm_12_3', text: 'After one or two tries, does your baby pick up a piece of string with his first finger and thumb? (The string may be attached to a toy.)' },
    { id: 'fm_12_4', text: 'Does your baby pick up a crumb or Cheerio with the tips of her thumb and a finger? She may rest her arm or hand on the table while doing it.' },
    { id: 'fm_12_5', text: 'Does your baby put a small toy down, without dropping it, and then take his hand off the toy?' },
    { id: 'fm_12_6', text: 'Without resting her arm or hand on the table, does your baby pick up a crumb or Cheerio with the tips of her thumb and a finger?' },
    { id: 'fm_12_7', text: 'Does your baby throw a small ball with a forward arm motion? (If he simply drops the ball, mark "not yet" for this item.)' },
    { id: 'fm_12_8', text: 'Does your baby help turn the pages of a book? (You may lift a page for him to grasp.)' }
  ],
  14: [
    { id: 'fm_14_1', text: 'Without resting her arm or hand on the table, does your baby pick up a crumb or Cheerio with the tips of her thumb and a finger?' },
    { id: 'fm_14_2', text: 'Does your baby throw a small ball with a forward arm motion? (If he simply drops the ball, mark "not yet" for this item.)' },
    { id: 'fm_14_3', text: 'Does your baby help turn the pages of a book? (You may lift a page for her to grasp.)' },
    { id: 'fm_14_4', text: 'Does your baby stack a small block or toy on top of another one? (You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)' },
    { id: 'fm_14_5', text: 'Does your baby make a mark on the paper with the tip of a crayon (or pencil or pen) when trying to draw?' },
    { id: 'fm_14_6', text: 'Does your baby stack three small blocks or toys on top of each other by herself?' }
  ],
  15: [
    { id: 'fm_15_1', text: 'Uses fingers to feed herself some food' }
  ],
  16: [
    { id: 'fm_16_1', text: 'Does your child help turn the pages of a book? (You may lift a page for her to grasp.)' },
    { id: 'fm_16_2', text: 'Does your child throw a small ball with a forward arm motion? (If he simply drops the ball, mark "not yet" for this item.)' },
    { id: 'fm_16_3', text: 'Does your child stack a small block or toy on top of another one? (You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)' },
    { id: 'fm_16_4', text: 'Does your child stack three small blocks or toys on top of each other by herself?' },
    { id: 'fm_16_5', text: 'Does your child make a mark on the paper with the tip of a crayon (or pencil or pen) when trying to draw?' },
    { id: 'fm_16_6', text: 'Does your child turn the pages of a book by himself? (He may turn more than one page at a time.)' }
  ],
  18: [
    { id: 'fm_18_1', text: 'Pulls toys while walking' },
    { id: 'fm_18_2', text: 'Can help undress herself' },
    { id: 'fm_18_3', text: 'Drinks from a cup' },
    { id: 'fm_18_4', text: 'Eats with a spoon' },
    { id: 'fm_18_5', text: 'Does your child throw a small ball with a forward arm motion? (If he simply drops the ball, mark "not yet" for this item.)' },
    { id: 'fm_18_6', text: 'Does your child stack a small block or toy on top of another one? (You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)' },
    { id: 'fm_18_7', text: 'Does your child make a mark on the paper with the tip of a crayon (or pencil or pen) when trying to draw?' },
    { id: 'fm_18_8', text: 'Does your child stack three small blocks or toys on top of each other by himself?' },
    { id: 'fm_18_9', text: 'Does your child turn the pages of a book by himself? (He may turn more than one page at a time.)' },
    { id: 'fm_18_10', text: 'Does your child get a spoon into her mouth right side up so that the food usually doesn\'t spill?' }
  ],
  20: [
    { id: 'fm_20_1', text: 'Does your child make a mark on the paper with the tip of a crayon (or pencil or pen) when trying to draw?' },
    { id: 'fm_20_2', text: 'Does your child stack three small blocks or toys on top of each other by herself? (You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)' },
    { id: 'fm_20_3', text: 'Does your child turn the pages of a book by himself? (He may turn more than one page at a time.)' },
    { id: 'fm_20_4', text: 'Does your child get a spoon into her mouth right side up so that the food usually doesn\'t spill?' },
    { id: 'fm_20_5', text: 'Does your child stack six small blocks or toys on top of each other by himself?' },
    { id: 'fm_20_6', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, wind-up toys, twist tops, or screw lids on and off jars?' }
  ],
  22: [
    { id: 'fm_22_1', text: 'Does your child get a spoon into her mouth right side up so that the food usually doesn\'t spill?' },
    { id: 'fm_22_2', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, wind-up toys, twist tops, or screw lids on and off jars?' },
    { id: 'fm_22_3', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, wind-up toys, twist tops, or screw lids on and off jars?' },
    { id: 'fm_22_4', text: 'Does your child turn the pages of a book by himself? (He may turn more than one page at a time.)' },
    { id: 'fm_22_5', text: 'Does your child flip switch off and on?' },
    { id: 'fm_22_6', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?' }
  ],
  24: [
    { id: 'fm_24_1', text: 'Does your child get a spoon into his mouth right side up so that the food usually doesn\'t spill?' },
    { id: 'fm_24_2', text: 'Does your child turn the pages of a book by herself? (She may turn more than one page at a time.)' },
    { id: 'fm_24_3', text: 'Does your child use a turning motion with his hand while trying to turn doorknobs, wind-up toys, twist tops, or screw lids on and off jars?' },
    { id: 'fm_24_4', text: 'Does your child flip switch off and on?' },
    { id: 'fm_24_5', text: 'Does your child stack seven small blocks or toys on top of each other by herself? (You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)' },
    { id: 'fm_24_6', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?' }
  ],
  27: [
    { id: 'fm_27_1', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, windup toys, twist tops, or screw lids on and off jars?' },
    { id: 'fm_27_2', text: 'Does your child flip switch off and on?' },
    { id: 'fm_27_3', text: 'After your child watches you draw a line from the top of the paper to the bottom with a pencil, crayon, or pen, ask him to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a vertical direction?' },
    { id: 'fm_27_4', text: 'Does your child stack seven small blocks or toys on top of each other by herself? (You could also use spools of thread, small boxes, or toys that are about 1 inch in size.)' },
    { id: 'fm_27_5', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?' },
    { id: 'fm_27_6', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?' }
  ],
  30: [
    { id: 'fm_30_1', text: 'Uses hands to twist things, like turning doorknobs or unscrewing lids' },
    { id: 'fm_30_2', text: 'Turns book pages, one at a time, when you read to her' },
    { id: 'fm_30_3', text: 'Does your child use a turning motion with her hand while trying to turn doorknobs, wind-up toys, twist tops, or screw lids on and off jars?' },
    { id: 'fm_30_4', text: 'After your child watches you draw a line from the top of the paper to the bottom with a pencil, crayon, or pen, ask him to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a vertical direction?' },
    { id: 'fm_30_5', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?' },
    { id: 'fm_30_6', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?' },
    { id: 'fm_30_7', text: 'After your child watches you draw a single circle, ask him to make a circle like yours. Do not let him trace your circle. Does your child copy you by drawing a circle?' },
    { id: 'fm_30_8', text: 'Does your child turn pages in a book, one page at a time?' }
  ],
  33: [
    { id: 'fm_33_1', text: 'After your child watches you draw a line from the top of the paper to the bottom with a pencil, crayon, or pen, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a vertical direction?' },
    { id: 'fm_33_2', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?' },
    { id: 'fm_33_3', text: 'After your child watches you draw a line from one side of the paper to the other side, ask him to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?' },
    { id: 'fm_33_4', text: 'After your child watches you draw a single circle, ask her to make a circle like yours. Do not let her trace your circle. Does your child copy you by drawing a circle?' },
    { id: 'fm_33_5', text: 'Does your child turn pages in a book, one page at a time?' },
    { id: 'fm_33_6', text: 'Does your child try to cut paper with child-safe scissors? He does not need to cut the paper but must get the blades to open and close while holding the paper with the other hand. (You may show your child how to use scissors. Carefully watch your child\'s use of scissors for safety reasons.)' }
  ],
  36: [
    { id: 'fm_36_1', text: 'Uses a fork' },
    { id: 'fm_36_2', text: 'Strings items together, like large beads or macaroni' },
    { id: 'fm_36_3', text: 'After your child watches you draw a line from the top of the paper to the bottom with a pencil, crayon, or pen, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a vertical direction?' },
    { id: 'fm_36_4', text: 'Can your child string small items such as beads, macaroni, or pasta "wagon wheels" onto a string or shoelace?' },
    { id: 'fm_36_5', text: 'After your child watches you draw a single circle, ask him to make a circle like yours. Do not let him trace your circle. Does your child copy you by drawing a circle?' },
    { id: 'fm_36_6', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?' },
    { id: 'fm_36_7', text: 'Does your child try to cut paper with child-safe scissors? He does not need to cut the paper but must get the blades to open and close while holding the paper with the other hand. (You may show your child how to use scissors. Carefully watch your child\'s use of scissors for safety reasons.)' },
    { id: 'fm_36_8', text: 'When drawing, does your child hold a pencil, crayon, or pen between her fingers and thumb like an adult does?' }
  ],
  42: [
    { id: 'fm_42_1', text: 'After your child watches you draw a single circle with a pencil, crayon, or pen, ask him to make a circle like yours. Do not let him trace your circle. Does your child copy you by drawing a circle?' },
    { id: 'fm_42_2', text: 'After your child watches you draw a line from one side of the paper to the other side, ask her to make a line like yours. Do not let your child trace your line. Does your child copy you by drawing a single line in a horizontal direction?' },
    { id: 'fm_42_3', text: 'Does your child try to cut paper with child-safe scissors? He does not need to cut the paper but must get the blades to open and close while holding the paper with the other hand. (You may show your child how to use scissors. Carefully watch your child\'s use of scissors for safety reasons.)' },
    { id: 'fm_42_4', text: 'When drawing, does your child hold a pencil, crayon, or pen between her fingers and thumb like an adult does?' },
    { id: 'fm_42_5', text: 'Does your child put together a five- to seven-piece interlocking puzzle? (If one is not available, take a full-page picture from a magazine or catalogue and cut it into six pieces. Does your child put it back together correctly?)' },
    { id: 'fm_42_6', text: 'Using the shape at right to look at, does your child copy it onto a large piece of paper using a pencil, crayon, or pen, without tracing? (Your child\'s drawing should look like the design of the shape, except it may be different in size.)' }
  ],
  48: [
    { id: 'fm_48_1', text: 'Pours, cuts with supervision, and mashes own food' },
    { id: 'fm_48_2', text: 'Does your child put together a five- to seven-piece interlocking puzzle? (If one is not available, take a full-page picture from a magazine or catalog and cut it into six pieces. Does your child put it back together correctly?)' },
    { id: 'fm_48_3', text: 'Using child-safe scissors, does your child cut a paper in half on a more or less straight line, making the blades go up and down? (Carefully watch your child\'s use of scissors for safety reasons.)' },
    { id: 'fm_48_4', text: 'Using the shapes below to look at, does your child copy at least three shapes onto a large piece of paper using a pencil, crayon, or pen, without tracing? (Your child\'s drawings should look similar to the design of the shapes below, but they may be different in size.)' },
    { id: 'fm_48_5', text: 'Does your child unbutton one or more buttons? (Your child may use his own clothing or a doll\'s clothing.)' },
    { id: 'fm_48_6', text: 'Does your child draw pictures of people that have at least three of the following features: head, eyes, nose, mouth, neck, hair, trunk, arms, hands, legs, or feet?' },
    { id: 'fm_48_7', text: 'Does your child colour mostly within the lines in a coloring book or within the lines of a 2-inch circle that you draw? (Your child should not go more than 1/4 inch outside the lines on most of the picture.)' }
  ],
  54: [
    { id: 'fm_54_1', text: 'Using the shapes below to look at, does your child copy at least three shapes onto a large piece of paper using a pencil, crayon, or pen, without tracing? (Your child\'s drawings should look similar to the design of the shapes below, but they may be different in size.)' },
    { id: 'fm_54_2', text: 'Does your child unbutton one or more buttons? Your child may use his own clothing or a doll\'s clothing.' },
    { id: 'fm_54_3', text: 'Does your child colour mostly within the lines in a coloring book or within the lines of a 2-inch circle that you draw? (Your child should not go more than 1⁄4 inch outside the lines on most of the picture.)' },
    { id: 'fm_54_4', text: 'Ask your child to trace the line below with a pencil. Does your child trace on the line without going off the line more than two times? (Mark "sometimes" if your child goes off the line three times.)' },
    { id: 'fm_54_5', text: 'Ask your child to draw a picture of a person on a blank sheet of paper. You may ask your child, "Draw a picture of a girl or a boy." If your child draws a person with a head, body, arms, and legs, mark "yes." If your child draws a person with only three parts (head, body, arms, or legs), mark "sometimes." If your child draws a person with two or fewer parts (head, body, arms, or legs), mark "not yet." Be sure to include the sheet of paper with your child\'s drawing with this questionnaire.' },
    { id: 'fm_54_6', text: 'Draw a line across a piece of paper. Using child-safe scissors, does your child cut the paper in half on a more or less straight line, making the blades go up and down? (Carefully watch your child\'s use of scissors for safety reasons.)' }
  ],
  60: [
    { id: 'fm_60_1', text: 'Uses a fork and spoon and sometimes a table knife' },
    { id: 'fm_60_2', text: 'Ask your child to trace the line below with a pencil. Does your child trace on the line without going off the line more than two times? (Mark "sometimes" if your child goes off the line three times.)' },
    { id: 'fm_60_3', text: 'Ask your child to draw a picture of a person on a blank sheet of paper. You may ask your child, "Draw a picture of a girl or a boy." If your child draws a person with a head, body, arms, and legs, mark "yes." If your child draws a person with only three parts (head, body, arms, or legs), mark "sometimes." If your child draws a person with two or fewer parts (head, body, arms, or legs), mark "not yet." Be sure to include the sheet of paper with your child\'s drawing with this questionnaire.' },
    { id: 'fm_60_4', text: 'Draw a line across a piece of paper. Using child-safe scissors, does your child cut the paper in half on a more or less straight line, making the blades go up and down? (Carefully watch your child\'s use of scissors for safety reasons.)' },
    { id: 'fm_60_5', text: 'Using the shapes below to look at, does your child copy the shapes in the space below without tracing? (Your child\'s drawings should look similar to the design of the shapes below, but they may be different in size. Mark "yes" if she copies all three shapes; mark "sometimes" if your child copies two shapes.)' },
    { id: 'fm_60_6', text: 'Using the letters below to look at, does your child copy the letters without tracing? Cover up all of the letters except the letter being copied. (Mark "yes" if your child copies four of the letters and you can read them. Mark "sometimes" if your child copies two or three letters and you can read them.) V H T C A' },
    { id: 'fm_60_7', text: 'Print your child\'s first name. Can your child copy the letters? The letters may be large, backward, or reversed. (Mark "sometimes" if your child copies about half of the letters.)' }
  ]
};

export const FINE_MOTOR_AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
