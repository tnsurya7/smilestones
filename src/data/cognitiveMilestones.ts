// Type definitions
interface CognitiveMilestone {
  id: string;
  text: string;
  type: 'yesno' | 'input'; // yesno for Yes/No radio buttons, input for text input
}

interface CognitiveMilestonesByAge {
  [age: number]: CognitiveMilestone[];
}

export const COGNITIVE_MILESTONES: CognitiveMilestonesByAge = {
  2: [
    { id: 'cm_2_1', text: 'Points to objects or pictures when they are named', type: 'yesno' },
    { id: 'cm_2_2', text: 'Knows names of familiar people and body parts', type: 'yesno' },
    { id: 'cm_2_3', text: 'Says sentences with 2 to 4 words', type: 'yesno' },
    { id: 'cm_2_4', text: 'Follows simple instructions', type: 'yesno' },
    { id: 'cm_2_5', text: 'Repeats words overheard in conversation', type: 'yesno' },
    { id: 'cm_2_6', text: 'Points to things in a book', type: 'yesno' }
  ],
  4: [
    { id: 'cm_4_1', text: 'Copies circle with pencil or crayon', type: 'yesno' },
    { id: 'cm_4_2', text: 'Plays board or card games', type: 'yesno' },
    { id: 'cm_4_3', text: 'Tells you what he thinks is going to happen next in a book', type: 'yesno' },
    { id: 'cm_4_4', text: 'Understands the idea of counting', type: 'yesno' },
    { id: 'cm_4_5', text: 'Draws a person with 2 to 4 body parts', type: 'yesno' },
    { id: 'cm_4_6', text: 'Uses scissors', type: 'yesno' },
    { id: 'cm_4_7', text: 'Starts to copy some capital letters', type: 'yesno' }
  ],
  6: [
    { id: 'cm_6_1', text: 'Knows about things used every day, like money and food', type: 'yesno' },
    { id: 'cm_6_2', text: 'Can count 10 or more things', type: 'yesno' },
    { id: 'cm_6_3', text: 'Can draw a person with at least 6 body parts', type: 'yesno' },
    { id: 'cm_6_4', text: 'Can print some letters or numbers', type: 'yesno' },
    { id: 'cm_6_5', text: 'Copies triangle and other geometric shapes', type: 'yesno' },
    { id: 'cm_6_6', text: 'Knows about time', type: 'yesno' }
  ],
  8: [
    { id: 'cm_8_1', text: 'Responds to own name', type: 'yesno' },
    { id: 'cm_8_2', text: 'Recognizes familiar faces', type: 'yesno' },
    { id: 'cm_8_3', text: 'Looks where you point', type: 'yesno' },
    { id: 'cm_8_4', text: 'Plays games like peek-a-boo', type: 'yesno' },
    { id: 'cm_8_5', text: 'Puts things in mouth to explore them', type: 'yesno' }
  ],
  9: [
    { id: 'cm_9_1', text: 'Watches the path of something as it falls', type: 'yesno' },
    { id: 'cm_9_2', text: 'Looks for things he sees you hide', type: 'yesno' },
    { id: 'cm_9_3', text: 'Plays peek-a-boo', type: 'yesno' },
    { id: 'cm_9_4', text: 'Puts things in a container, takes things out of a container', type: 'yesno' }
  ],
  10: [
    { id: 'cm_10_1', text: 'Explores things in different ways, like shaking, banging, throwing', type: 'yesno' },
    { id: 'cm_10_2', text: 'Finds hidden things easily', type: 'yesno' },
    { id: 'cm_10_3', text: 'Looks at the right picture or thing when it\'s named', type: 'yesno' },
    { id: 'cm_10_4', text: 'Copies gestures', type: 'yesno' },
    { id: 'cm_10_5', text: 'Uses things correctly (cup, spoon, phone)', type: 'yesno' }
  ],
  12: [
    { id: 'cm_12_1', text: 'Knows what ordinary things are for (telephone, brush, spoon)', type: 'yesno' },
    { id: 'cm_12_2', text: 'Points to get the attention of others', type: 'yesno' },
    { id: 'cm_12_3', text: 'Shows interest in a doll or stuffed animal by pretending to feed', type: 'yesno' },
    { id: 'cm_12_4', text: 'Points to one body part', type: 'yesno' },
    { id: 'cm_12_5', text: 'Scribbles on own', type: 'yesno' },
    { id: 'cm_12_6', text: 'Can follow 1-step verbal commands without any gestures', type: 'yesno' }
  ],
  14: [
    { id: 'cm_14_1', text: 'Shows affection to familiar people', type: 'yesno' },
    { id: 'cm_14_2', text: 'Plays simple pretend, such as feeding a doll', type: 'yesno' },
    { id: 'cm_14_3', text: 'May point to show others something interesting', type: 'yesno' },
    { id: 'cm_14_4', text: 'Explores alone but with parent close by', type: 'yesno' }
  ],
  15: [
    { id: 'cm_15_1', text: 'Copies you doing chores, like sweeping with a broom', type: 'yesno' },
    { id: 'cm_15_2', text: 'Plays with toys in a simple way, like pushing a toy car', type: 'yesno' },
    { id: 'cm_15_3', text: 'Walks alone', type: 'yesno' },
    { id: 'cm_15_4', text: 'May walk up steps and run', type: 'yesno' }
  ],
  16: [
    { id: 'cm_16_1', text: 'Points to show someone what he wants', type: 'yesno' },
    { id: 'cm_16_2', text: 'Says and shakes head "no"', type: 'yesno' },
    { id: 'cm_16_3', text: 'Points to one body part when asked', type: 'yesno' },
    { id: 'cm_16_4', text: 'Tries to use switches, knobs, or buttons on a toy', type: 'yesno' }
  ],
  18: [
    { id: 'cm_18_1', text: 'Knows what ordinary things are for (telephone, brush, spoon)', type: 'yesno' },
    { id: 'cm_18_2', text: 'Points to get the attention of others', type: 'yesno' },
    { id: 'cm_18_3', text: 'Shows interest in a doll or stuffed animal by pretending to feed', type: 'yesno' },
    { id: 'cm_18_4', text: 'Points to one body part', type: 'yesno' },
    { id: 'cm_18_5', text: 'Scribbles on own', type: 'yesno' },
    { id: 'cm_18_6', text: 'Can follow 1-step verbal commands without any gestures', type: 'yesno' }
  ],
  20: [
    { id: 'cm_20_1', text: 'Copies others, especially adults and older children', type: 'yesno' },
    { id: 'cm_20_2', text: 'Gets excited when with other children', type: 'yesno' },
    { id: 'cm_20_3', text: 'Shows more and more independence', type: 'yesno' },
    { id: 'cm_20_4', text: 'Shows defiant behavior', type: 'yesno' },
    { id: 'cm_20_5', text: 'Plays mainly beside other children', type: 'yesno' }
  ],
  22: [
    { id: 'cm_22_1', text: 'Finds things even when hidden under two or three covers', type: 'yesno' },
    { id: 'cm_22_2', text: 'Begins to sort shapes and colors', type: 'yesno' },
    { id: 'cm_22_3', text: 'Completes sentences and rhymes in familiar books', type: 'yesno' },
    { id: 'cm_22_4', text: 'Plays simple make-believe games', type: 'yesno' },
    { id: 'cm_22_5', text: 'Builds towers of 4 or more blocks', type: 'yesno' }
  ],
  24: [
    { id: 'cm_24_1', text: 'Finds things even when hidden under two or three covers', type: 'yesno' },
    { id: 'cm_24_2', text: 'Begins to sort shapes and colors', type: 'yesno' },
    { id: 'cm_24_3', text: 'Completes sentences and rhymes in familiar books', type: 'yesno' },
    { id: 'cm_24_4', text: 'Plays simple make-believe games', type: 'yesno' },
    { id: 'cm_24_5', text: 'Builds towers of 4 or more blocks', type: 'yesno' },
    { id: 'cm_24_6', text: 'Might use one hand more than the other', type: 'yesno' },
    { id: 'cm_24_7', text: 'Follows two-step instructions', type: 'yesno' },
    { id: 'cm_24_8', text: 'Names items in a picture book', type: 'yesno' }
  ],
  27: [
    { id: 'cm_27_1', text: 'Copies adults and friends', type: 'yesno' },
    { id: 'cm_27_2', text: 'Shows affection for friends without prompting', type: 'yesno' },
    { id: 'cm_27_3', text: 'Takes turns in games', type: 'yesno' },
    { id: 'cm_27_4', text: 'Shows concern for crying friend', type: 'yesno' },
    { id: 'cm_27_5', text: 'Understands the idea of "mine" and "his" or "hers"', type: 'yesno' }
  ],
  30: [
    { id: 'cm_30_1', text: 'Can work toys with buttons, levers, and moving parts', type: 'yesno' },
    { id: 'cm_30_2', text: 'Plays make-believe with dolls, animals, and people', type: 'yesno' },
    { id: 'cm_30_3', text: 'Does puzzles with 3 or 4 pieces', type: 'yesno' },
    { id: 'cm_30_4', text: 'Understands what "two" means', type: 'yesno' },
    { id: 'cm_30_5', text: 'Copies a circle with pencil or crayon', type: 'yesno' },
    { id: 'cm_30_6', text: 'Turns book pages one at a time', type: 'yesno' },
    { id: 'cm_30_7', text: 'Builds towers of more than 6 blocks', type: 'yesno' },
    { id: 'cm_30_8', text: 'Screws and unscrews jar lids or turns door handle', type: 'yesno' }
  ],
  33: [
    { id: 'cm_33_1', text: 'Shows affection for friends without prompting', type: 'yesno' },
    { id: 'cm_33_2', text: 'Takes turns in games', type: 'yesno' },
    { id: 'cm_33_3', text: 'Shows concern for crying friend', type: 'yesno' },
    { id: 'cm_33_4', text: 'Understands the idea of "mine" and "his" or "hers"', type: 'yesno' },
    { id: 'cm_33_5', text: 'Shows a wide range of emotions', type: 'yesno' }
  ],
  36: [
    { id: 'cm_36_1', text: 'Can work toys with buttons, levers, and moving parts', type: 'yesno' },
    { id: 'cm_36_2', text: 'Plays make-believe with dolls, animals, and people', type: 'yesno' },
    { id: 'cm_36_3', text: 'Does puzzles with 3 or 4 pieces', type: 'yesno' },
    { id: 'cm_36_4', text: 'Understands what "two" means', type: 'yesno' },
    { id: 'cm_36_5', text: 'Copies a circle with pencil or crayon', type: 'yesno' },
    { id: 'cm_36_6', text: 'Turns book pages one at a time', type: 'yesno' },
    { id: 'cm_36_7', text: 'Builds towers of more than 6 blocks', type: 'yesno' },
    { id: 'cm_36_8', text: 'Screws and unscrews jar lids or turns door handle', type: 'yesno' }
  ],
  42: [
    { id: 'cm_42_1', text: 'Copies circle with pencil or crayon', type: 'yesno' },
    { id: 'cm_42_2', text: 'Plays board or card games', type: 'yesno' },
    { id: 'cm_42_3', text: 'Tells you what he thinks is going to happen next in a book', type: 'yesno' },
    { id: 'cm_42_4', text: 'Understands the idea of counting', type: 'yesno' },
    { id: 'cm_42_5', text: 'Draws a person with 2 to 4 body parts', type: 'yesno' },
    { id: 'cm_42_6', text: 'Uses scissors', type: 'yesno' },
    { id: 'cm_42_7', text: 'Starts to copy some capital letters', type: 'yesno' },
    { id: 'cm_42_8', text: 'Plays "Mom" and "Dad"', type: 'yesno' }
  ],
  48: [
    { id: 'cm_48_1', text: 'Names some colors and some numbers', type: 'yesno' },
    { id: 'cm_48_2', text: 'Understands the idea of counting', type: 'yesno' },
    { id: 'cm_48_3', text: 'Starts to understand time', type: 'yesno' },
    { id: 'cm_48_4', text: 'Remembers parts of a story', type: 'yesno' },
    { id: 'cm_48_5', text: 'Understands the idea of "same" and "different"', type: 'yesno' },
    { id: 'cm_48_6', text: 'Draws a person with 2 to 4 body parts', type: 'yesno' },
    { id: 'cm_48_7', text: 'Uses scissors', type: 'yesno' },
    { id: 'cm_48_8', text: 'Starts to copy some capital letters', type: 'yesno' },
    { id: 'cm_48_9', text: 'Plays board or card games', type: 'yesno' },
    { id: 'cm_48_10', text: 'Tells you what he thinks is going to happen next in a book', type: 'yesno' }
  ],
  54: [
    { id: 'cm_54_1', text: 'Wants to please friends', type: 'yesno' },
    { id: 'cm_54_2', text: 'Wants to be like friends', type: 'yesno' },
    { id: 'cm_54_3', text: 'More likely to agree with rules', type: 'yesno' },
    { id: 'cm_54_4', text: 'Likes to sing, dance, and act', type: 'yesno' },
    { id: 'cm_54_5', text: 'Is aware of gender', type: 'yesno' },
    { id: 'cm_54_6', text: 'Can tell what\'s real and what\'s make-believe', type: 'yesno' },
    { id: 'cm_54_7', text: 'Shows more independence', type: 'yesno' }
  ],
  60: [
    { id: 'cm_60_1', text: 'Knows about things used every day, like money and food', type: 'yesno' },
    { id: 'cm_60_2', text: 'Can count 10 or more things', type: 'yesno' },
    { id: 'cm_60_3', text: 'Can draw a person with at least 6 body parts', type: 'yesno' },
    { id: 'cm_60_4', text: 'Can print some letters or numbers', type: 'yesno' },
    { id: 'cm_60_5', text: 'Copies triangle and other geometric shapes', type: 'yesno' },
    { id: 'cm_60_6', text: 'Knows about time', type: 'yesno' },
    { id: 'cm_60_7', text: 'Wants to please friends', type: 'yesno' },
    { id: 'cm_60_8', text: 'Wants to be like friends', type: 'yesno' },
    { id: 'cm_60_9', text: 'More likely to agree with rules', type: 'yesno' },
    { id: 'cm_60_10', text: 'Likes to sing, dance, and act', type: 'yesno' }
  ]
};

export const AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
