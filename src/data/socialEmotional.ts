export interface SocialEmotionalSkill {
  id: string;
  text: string;
  type: 'yes_no' | 'input';
}

export const SOCIAL_EMOTIONAL: Record<number, SocialEmotionalSkill[]> = {
  2: [
    { id: 'se_2_1', text: 'Calms down when spoken to or picked up', type: 'yes_no' },
    { id: 'se_2_2', text: 'Looks at your face', type: 'yes_no' },
    { id: 'se_2_3', text: 'Seems happy to see you when you walk up to her', type: 'yes_no' },
    { id: 'se_2_4', text: 'Smiles when you talk to or smile at her', type: 'yes_no' },
    { id: 'se_2_5', text: 'Does your baby smile at you?', type: 'yes_no' },
    { id: 'se_2_6', text: "Does your baby sometimes try to suck, even when she's not feeding?", type: 'yes_no' },
    { id: 'se_2_7', text: 'When you smile at your baby, does she smile back?', type: 'yes_no' },
    { id: 'se_2_8', text: 'Does your baby cry when he is hungry, wet, tired, or wants to be held?', type: 'yes_no' },
    { id: 'se_2_9', text: 'Does your baby watch his hands?', type: 'yes_no' },
    { id: 'se_2_10', text: 'When your baby sees the breast or bottle, does she seem to know she is about to be fed?', type: 'yes_no' }
  ],
  4: [
    { id: 'se_4_1', text: 'Smiles on his own to get your attention', type: 'yes_no' },
    { id: 'se_4_2', text: 'Chuckles (not yet a full laugh) when you try to make her laugh', type: 'yes_no' },
    { id: 'se_4_3', text: 'Looks at you, moves, or makes sounds to get or keep your attention', type: 'yes_no' },
    { id: 'se_4_4', text: 'Does your baby watch his hands?', type: 'yes_no' },
    { id: 'se_4_5', text: 'When your baby has her hands together, does she play with her fingers?', type: 'yes_no' },
    { id: 'se_4_6', text: 'When your baby sees the breast or bottle, does he seem to know he is about to be fed?', type: 'yes_no' },
    { id: 'se_4_7', text: 'Does your baby help hold the bottle with both hands at once, or when nursing, does she hold the breast with her free hand?', type: 'yes_no' },
    { id: 'se_4_8', text: 'Before you smile or talk to your baby, does he smile when he sees you nearby?', type: 'yes_no' }
  ],
  6: [
    { id: 'se_6_1', text: 'Knows familiar people', type: 'yes_no' },
    { id: 'se_6_2', text: 'Likes to look at himself in a mirror', type: 'yes_no' },
    { id: 'se_6_3', text: 'Laughs', type: 'yes_no' },
    { id: 'se_6_4', text: 'When lying on her back, does your baby play by grabbing her foot?', type: 'yes_no' },
    { id: 'se_6_5', text: 'While your baby is on her back, does she put her foot in her mouth?', type: 'yes_no' },
    { id: 'se_6_6', text: 'When in front of a large mirror, does your baby reach out to pat the mirror?', type: 'yes_no' },
    { id: 'se_6_7', text: 'Does your baby try to get a toy that is out of reach? (He may roll, pivot on his tummy, or crawl to get it.)', type: 'yes_no' },
    { id: 'se_6_8', text: 'Does your baby drink water, juice, or formula from a cup while you hold it?', type: 'yes_no' },
    { id: 'se_6_9', text: 'Does your baby feed himself a cracker or a cookie?', type: 'yes_no' }
  ],
  8: [
    { id: 'se_8_1', text: 'While your baby is on her back, does she put her foot in her mouth?', type: 'yes_no' },
    { id: 'se_8_2', text: 'Does your baby drink water, juice, or formula from a cup while you hold it?', type: 'yes_no' },
    { id: 'se_8_3', text: 'Does your baby feed himself a cracker or a cookie?', type: 'yes_no' },
    { id: 'se_8_4', text: "When you hold out your hand and ask for her toy, does your baby offer it to you even if she doesn't let go of it? (If she already let's go of the toy into your hand, mark \"yes\" for this item.)", type: 'yes_no' },
    { id: 'se_8_5', text: 'When you dress your baby, does he push his arm through a sleeve once his arm is started in the hole of the sleeve?', type: 'yes_no' },
    { id: 'se_8_6', text: 'When you hold out your hand and ask for her toy, does your baby let go of it into your hand?', type: 'yes_no' }
  ],
  9: [
    { id: 'se_9_1', text: 'Is shy, clingy, or fearful around strangers', type: 'yes_no' },
    { id: 'se_9_2', text: 'Shows several facial expressions, like happy, sad, angry, and surprised', type: 'yes_no' },
    { id: 'se_9_3', text: 'Looks when you call her name', type: 'yes_no' },
    { id: 'se_9_4', text: 'Reacts when you leave (looks, reaches for you, or cries)', type: 'yes_no' },
    { id: 'se_9_5', text: 'Smiles or laughs when you play peek-a-boo', type: 'yes_no' },
    { id: 'se_9_6', text: 'While your baby is on her back, does she put her foot in her mouth?', type: 'yes_no' },
    { id: 'se_9_7', text: 'Does your baby drink water, juice, or formula from a cup while you hold it?', type: 'yes_no' },
    { id: 'se_9_8', text: 'Does your baby feed himself a cracker or a cookie?', type: 'yes_no' },
    { id: 'se_9_9', text: 'Has favourite toys', type: 'yes_no' },
    { id: 'se_9_10', text: "When you hold out your hand and ask for her toy, does your baby offer it to you even if she doesn't let go of it? (If she already let's go of the toy into your hand, mark \"yes\" for this item.)", type: 'yes_no' },
    { id: 'se_9_11', text: 'When you hold out your hand and ask for her toy, does your baby let go of it into your hand?', type: 'yes_no' },
    { id: 'se_9_12', text: 'When you dress your baby, does he push his arm through a sleeve once his arm is started in the hole of the sleeve?', type: 'yes_no' }
  ],
  10: [
    { id: 'se_10_1', text: 'While your baby is on her back, does she put her foot in her mouth?', type: 'yes_no' },
    { id: 'se_10_2', text: 'Does your baby drink water, juice, or formula from a cup while you hold it?', type: 'yes_no' },
    { id: 'se_10_3', text: 'Does your baby feed himself a cracker or a cookie?', type: 'yes_no' },
    { id: 'se_10_4', text: "When you hold out your hand and ask for her toy, does your baby offer it to you even if she doesn't let go of it? (If she already let's go of the toy into your hand, mark \"yes\" for this item.)", type: 'yes_no' },
    { id: 'se_10_5', text: 'When you dress your baby, does he push his arm through a sleeve once his arm is started in the hole of the sleeve?', type: 'yes_no' },
    { id: 'se_10_6', text: 'When you hold out your hand and ask for her toy, does your baby let go of it into your hand?', type: 'yes_no' }
  ],
  12: [
    { id: 'se_12_1', text: 'Plays games with you, like pat-a-cake', type: 'yes_no' },
    { id: 'se_12_2', text: "When you hold out your hand and ask for his toy, does your baby offer it to you even if he doesn't let go of it? (If he already let's go of the toy into your hand, mark \"yes\" for this item.)", type: 'yes_no' },
    { id: 'se_12_3', text: 'When you hold out your hand and ask for his toy, does your baby let go of it into your hand?', type: 'yes_no' },
    { id: 'se_12_4', text: 'Puts out arm or leg to help with dressing', type: 'yes_no' },
    { id: 'se_12_5', text: 'When you dress your baby, does she push her arm through a sleeve once her arm is started in the hole of the sleeve?', type: 'yes_no' },
    { id: 'se_12_6', text: 'When you dress your baby, does she lift her foot for her shoe, sock, or pant leg?', type: 'yes_no' },
    { id: 'se_12_7', text: 'Does your baby roll or throw a ball back to you so that you can return it to him?', type: 'yes_no' },
    { id: 'se_12_8', text: 'Does your baby play with a doll or stuffed animal by hugging it?', type: 'yes_no' }
  ],
  14: [
    { id: 'se_14_1', text: 'When you dress your baby, does she lift her foot for her shoe, sock, or pant leg?', type: 'yes_no' },
    { id: 'se_14_2', text: 'Does your baby roll or throw a ball back to you so that you can return it to him?', type: 'yes_no' },
    { id: 'se_14_3', text: 'Does your baby play with a doll or stuffed animal by hugging it?', type: 'yes_no' },
    { id: 'se_14_4', text: 'Does your baby feed herself with a spoon, even though she may spill some food?', type: 'yes_no' },
    { id: 'se_14_5', text: 'Does your baby help undress himself by taking off clothes like socks, hat, shoes, or mittens?', type: 'yes_no' },
    { id: 'se_14_6', text: 'Does your baby get your attention or try to show you something by pulling on your hand or clothes?', type: 'yes_no' }
  ],
  15: [
    { id: 'se_15_1', text: 'Copies other children while playing, like taking toys out of a container when another child does', type: 'yes_no' },
    { id: 'se_15_2', text: 'Shows you an object she likes', type: 'yes_no' },
    { id: 'se_15_3', text: 'Claps when excited', type: 'yes_no' },
    { id: 'se_15_4', text: 'Hugs stuffed doll or another toy', type: 'yes_no' },
    { id: 'se_15_5', text: 'Shows you affection (hugs, cuddles, or kisses you)', type: 'yes_no' }
  ],
  16: [
    { id: 'se_16_1', text: 'Does your child feed himself with a spoon, even though he may spill some food?', type: 'yes_no' },
    { id: 'se_16_2', text: 'Does your child help undress herself by taking off clothes like socks, hat, shoes, or mittens?', type: 'yes_no' },
    { id: 'se_16_3', text: 'Does your child play with a doll or stuffed animal by hugging it?', type: 'yes_no' },
    { id: 'se_16_4', text: 'While looking at himself in the mirror, does your child offer a toy to his own image?', type: 'yes_no' },
    { id: 'se_16_5', text: 'Does your child get your attention or try to show you something by pulling on your hand or clothes?', type: 'yes_no' },
    { id: 'se_16_6', text: 'Does your child come to you when she needs help, such as with winding up a toy or unscrewing a lid from a jar?', type: 'yes_no' }
  ],
  18: [
    { id: 'se_18_1', text: 'Moves away from you, but looks to make sure you are close by', type: 'yes_no' },
    { id: 'se_18_2', text: 'Points to show you something interesting', type: 'yes_no' },
    { id: 'se_18_3', text: 'Puts hands out for you to wash them', type: 'yes_no' },
    { id: 'se_18_4', text: 'Looks at a few pages in a book with you', type: 'yes_no' },
    { id: 'se_18_5', text: 'Plays simple pretend, such as feeding a doll', type: 'yes_no' },
    { id: 'se_18_6', text: 'Helps you dress him by pushing arm through sleeve or lifting up foot', type: 'yes_no' },
    { id: 'se_18_7', text: 'While looking at herself in the mirror, does your child offer a toy to her own image?', type: 'yes_no' },
    { id: 'se_18_8', text: 'Does your child play with a doll or stuffed animal by hugging it?', type: 'yes_no' },
    { id: 'se_18_9', text: 'Does your child get your attention or try to show you something by pulling on your hand or clothes?', type: 'yes_no' },
    { id: 'se_18_10', text: 'Does your child drink from a cup or glass, putting it down again with little spilling?', type: 'yes_no' },
    { id: 'se_18_11', text: 'Does your child copy the activities you do, such as wipe up a spill, sweep, shave, or comb hair?', type: 'yes_no' }
  ],
  20: [
    { id: 'se_20_1', text: 'Does your child feed herself with a spoon, even though she may spill some food?', type: 'yes_no' },
    { id: 'se_20_2', text: 'Does your child get your attention or try to show you something by pulling on your hand or clothes?', type: 'yes_no' },
    { id: 'se_20_3', text: 'Does your child drink from a cup or glass, putting it down again with little spilling?', type: 'yes_no' },
    { id: 'se_20_4', text: 'Does your child copy the activities you do, such as wipe up a spill, sweep, shave, or comb hair?', type: 'yes_no' },
    { id: 'se_20_5', text: 'When playing with either a stuffed animal or a doll, does your child pretend to rock it, feed it, change its diapers, put it to bed, and so forth?', type: 'yes_no' },
    { id: 'se_20_6', text: 'Does your child eat with a fork?', type: 'yes_no' }
  ],
  22: [
    { id: 'se_22_1', text: 'Does your child copy the activities you do, such as wipe up a spill, sweep, shave, or comb hair?', type: 'yes_no' },
    { id: 'se_22_2', text: 'If you do any of the following gestures, does your child copy at least one of them? a) Open and close your mouth b) Blink your eyes c) Pull on your earlobe d) Pat your cheek', type: 'yes_no' },
    { id: 'se_22_3', text: 'Does your child eat with a fork?', type: 'yes_no' },
    { id: 'se_22_4', text: 'Does your child drink from a cup or glass, putting it down again with little spilling?', type: 'yes_no' },
    { id: 'se_22_5', text: 'When playing with either a stuffed animal or a doll, does your child pretend to rock it, feed it, change its diapers, put it to bed, and so forth?', type: 'yes_no' },
    { id: 'se_22_6', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if she cannot turn?', type: 'yes_no' }
  ],
  24: [
    { id: 'se_24_1', text: 'Notices when others are hurt or upset, like pausing or looking sad when someone is crying', type: 'yes_no' },
    { id: 'se_24_2', text: 'Looks at your face to see how to react in a new situation', type: 'yes_no' },
    { id: 'se_24_3', text: 'Does your child drink from a cup or glass, putting it down again with little spilling?', type: 'yes_no' },
    { id: 'se_24_4', text: 'Does your child copy the activities you do, such as wipe up a spill, sweep, shave, or comb hair?', type: 'yes_no' },
    { id: 'se_24_5', text: 'Does your child eat with a fork?', type: 'yes_no' },
    { id: 'se_24_6', text: 'When playing with either a stuffed animal or a doll, does your child pretend to rock it, feed it, change its diapers, put it to bed, and so forth?', type: 'yes_no' },
    { id: 'se_24_7', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if he cannot turn?', type: 'yes_no' },
    { id: 'se_24_8', text: 'Does your child call herself "I" or "me" more often than her own name? For example, "I do it," more often than "Juanita do it."', type: 'yes_no' }
  ],
  27: [
    { id: 'se_27_1', text: 'If you do any of the following gestures, does your child copy at least one of them? a) Open and close your mouth b) Blink your eyes c) Pull on your earlobe d) Pat your cheek', type: 'yes_no' },
    { id: 'se_27_2', text: 'Does your child eat with a fork?', type: 'yes_no' },
    { id: 'se_27_3', text: 'When playing with either a stuffed animal or a doll, does your child pretend to rock it, feed it, change its diapers, put it to bed, and so forth?', type: 'yes_no' },
    { id: 'se_27_4', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if he cannot turn?', type: 'yes_no' },
    { id: 'se_27_5', text: 'Does your child call herself "I" or "me" more often than her own name? For example, "I do it" more often than "Juanita do it."', type: 'yes_no' },
    { id: 'se_27_6', text: 'Does your child put on a coat, jacket, or shirt by himself?', type: 'yes_no' }
  ],
  30: [
    { id: 'se_30_1', text: 'Plays next to other children and sometimes plays with them', type: 'yes_no' },
    { id: 'se_30_2', text: 'Shows you what she can do by saying, "Look at me!"', type: 'yes_no' },
    { id: 'se_30_3', text: 'Follows simple routines when told, like helping to pick up toys when you say, "It\'s clean-up time."', type: 'yes_no' },
    { id: 'se_30_4', text: 'If you do any of the following gestures, does your child copy at least one of them? a) Open and close your mouth b) Blink your eyes c) Pull on your earlobe d) Pat your cheek', type: 'yes_no' },
    { id: 'se_30_5', text: 'Does your child use a spoon to feed himself with little spilling?', type: 'yes_no' },
    { id: 'se_30_6', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if she cannot turn?', type: 'yes_no' },
    { id: 'se_30_7', text: 'Does your child put on a coat, jacket, or shirt by himself?', type: 'yes_no' },
    { id: 'se_30_8', text: 'After you put on loose-fitting pants around her feet, does your child pull them completely up to her waist?', type: 'yes_no' },
    { id: 'se_30_9', text: 'When your child is looking in a mirror and you ask, "Who is in the mirror?" does he say either "me" or his own name?', type: 'yes_no' }
  ],
  33: [
    { id: 'se_33_1', text: 'Does your child use a spoon to feed herself with little spilling?', type: 'yes_no' },
    { id: 'se_33_2', text: 'Does your child push a little wagon, stroller, or other toy on wheels, steering it around objects and backing out of corners if he cannot turn?', type: 'yes_no' },
    { id: 'se_33_3', text: 'Does your child put on a coat, jacket, or shirt by herself?', type: 'yes_no' },
    { id: 'se_33_4', text: 'After you put on loose-fitting pants around his feet, does your child pull them completely up to his waist?', type: 'yes_no' },
    { id: 'se_33_5', text: 'When your child is looking in a mirror and you ask, "Who is in the mirror?" does she say either "me" or her own name?', type: 'yes_no' },
    { id: 'se_33_6', text: 'Using these exact words, ask your child, "Are you a girl or a boy?" Does your child answer correctly?', type: 'yes_no' }
  ],
  36: [
    { id: 'se_36_1', text: 'Calms down within 10 minutes after you leave her, like at a childcare drop off', type: 'yes_no' },
    { id: 'se_36_2', text: 'Notices other children and joins them to play', type: 'yes_no' },
    { id: 'se_36_3', text: 'Does your child use a spoon to feed herself with little spilling?', type: 'yes_no' },
    { id: 'se_36_4', text: 'Does your child push a little wagon, stroller, or toy on wheels, steering it around objects and backing out of corners if he cannot turn?', type: 'yes_no' },
    { id: 'se_36_5', text: 'When your child is looking in a mirror and you ask, "Who is in the mirror?" does she say either "me" or her own name?', type: 'yes_no' },
    { id: 'se_36_6', text: 'Does your child put on a coat, jacket, or shirt by himself?', type: 'yes_no' },
    { id: 'se_36_7', text: 'Using these exact words, ask your child, "Are you a girl or a boy?" Does your child answer correctly?', type: 'yes_no' },
    { id: 'se_36_8', text: 'Does your child take turns by waiting while another child or adult takes a turn?', type: 'yes_no' }
  ],
  42: [
    { id: 'se_42_1', text: 'When he is looking in a mirror and you ask, "Who is in the mirror?" does your child say either "me" or his own name?', type: 'yes_no' },
    { id: 'se_42_2', text: 'Does your child put on a coat, jacket, or shirt by herself?', type: 'yes_no' },
    { id: 'se_42_3', text: 'Using these exact words, ask your child, "Are you a girl or a boy?" Does your child answer correctly?', type: 'yes_no' },
    { id: 'se_42_4', text: 'Does your child take turns by waiting while another child or adult takes a turn?', type: 'yes_no' },
    { id: 'se_42_5', text: 'Does your child serve himself, taking food from one container to another using utensils? For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?', type: 'yes_no' },
    { id: 'se_42_6', text: 'Does your child wash his hands using soap and water and dry off with a towel without help?', type: 'yes_no' }
  ],
  48: [
    { id: 'se_48_1', text: 'Pretends to be something else during play (teacher, superhero, dog)', type: 'yes_no' },
    { id: 'se_48_2', text: 'Asks to go play with children if none are around, like "Can I play with Alex?"', type: 'yes_no' },
    { id: 'se_48_3', text: 'Comforts others who are hurt or sad, like hugging a crying friend', type: 'yes_no' },
    { id: 'se_48_4', text: 'Avoids danger, like not jumping from tall heights at the playground', type: 'yes_no' },
    { id: 'se_48_5', text: 'Likes to be a "helper"', type: 'yes_no' },
    { id: 'se_48_6', text: "Often can't tell what's real and what's make-believe", type: 'yes_no' },
    { id: 'se_48_7', text: 'Changes behavior based on where she is (place of worship, library, playground)', type: 'yes_no' },
    { id: 'se_48_8', text: 'Does your child serve herself, taking food from one container to another using utensils? For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?', type: 'yes_no' },
    { id: 'se_48_9', text: 'Does your child tell you at least four of the following? Please mark the items your child knows. a) First name b) Age c) City she lives in d) Last name e) Boy or girl f) Telephone number', type: 'yes_no' },
    { id: 'se_48_10', text: 'Does your child wash his hands using soap and water and dry off with a towel without help?', type: 'yes_no' },
    { id: 'se_48_11', text: 'Does your child tell you the names of two or more playmates, not including brothers and sisters? (Ask this question without providing help by suggesting names of playmates or friends.)', type: 'yes_no' },
    { id: 'se_48_12', text: 'Does your child brush her teeth by putting toothpaste on the tooth brush and brushing all of her teeth without help? (You may still need to check and rebrush your child\'s teeth.)', type: 'yes_no' },
    { id: 'se_48_13', text: 'Does your child dress or undress himself without help (except for snaps, buttons, and zippers)?', type: 'yes_no' }
  ],
  54: [
    { id: 'se_54_1', text: 'Does your child wash her hands using soap and water and dry off with a towel without help?', type: 'yes_no' },
    { id: 'se_54_2', text: 'Does your child tell you the names of two or more playmates, not including brothers and sisters? (Ask this question without providing help by suggesting names of playmates or friends.)', type: 'yes_no' },
    { id: 'se_54_3', text: 'Does your child brush his teeth by putting toothpaste on the tooth brush and brushing all of his teeth without help? (You may still need to check and rebrush your child\'s teeth.)', type: 'yes_no' },
    { id: 'se_54_4', text: 'Does your child serve herself, taking food from one container to another, using utensils? (For example, does your child use a large spoon to scoop apple sauce from a jar into a bowl?)', type: 'yes_no' },
    { id: 'se_54_5', text: 'Does your child tell you at least four of the following? Please mark the items your child knows. a) First name b) Age c) City he lives in d) Last name e) Boy or girl f) Telephone number', type: 'yes_no' },
    { id: 'se_54_6', text: 'Does your child dress and undress herself, including buttoning medium-size buttons and zipping front zippers?', type: 'yes_no' }
  ],
  60: [
    { id: 'se_60_1', text: 'Follows rules or takes turns when playing games with other children', type: 'yes_no' },
    { id: 'se_60_2', text: 'Sings, dances, or acts for you', type: 'yes_no' },
    { id: 'se_60_3', text: 'Does simple chores at home, like matching socks or clearing the table after eating', type: 'yes_no' },
    { id: 'se_60_4', text: 'Can your child serve himself, taking food from one container to another, using utensils? For example, does your child use a large spoon to scoop applesauce from a jar into a bowl?', type: 'yes_no' },
    { id: 'se_60_5', text: 'Does your child wash her hands and face using soap and water and dry off with a towel without help?', type: 'yes_no' },
    { id: 'se_60_6', text: 'Does your child tell you at least four of the following? Please mark the items your child knows. a) First name b) Age c) City he lives in d) Last name e) Boy or girl f) Telephone number', type: 'yes_no' },
    { id: 'se_60_7', text: 'Does your child dress and undress himself, including buttoning medium-size buttons and zipping front zippers?', type: 'yes_no' },
    { id: 'se_60_8', text: 'Does your child use the toilet by herself? (She goes to the bathroom, sits on the toilet, wipes, and flushes.) Mark "yes" even if she does this after you remind her.', type: 'yes_no' },
    { id: 'se_60_9', text: 'Does your child usually take turns and share with other children?', type: 'yes_no' }
  ]
};

export const SOCIAL_EMOTIONAL_AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
