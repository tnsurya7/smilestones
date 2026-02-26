// Type definitions
interface GrossMotorSkill {
  id: string;
  text: string;
}

interface GrossMotorSkillsByAge {
  [age: number]: GrossMotorSkill[];
}

export const GROSS_MOTOR_SKILLS: GrossMotorSkillsByAge = {
  2: [
    { id: 'gm_2_1', text: 'Can hold head up and begins to push up when lying on tummy' },
    { id: 'gm_2_2', text: 'Makes smoother movements with arms and legs' },
    { id: 'gm_2_3', text: 'When your baby is on her back, does she kick her legs?' },
    { id: 'gm_2_4', text: 'While your baby is on his back, does he move his head from side to side?' },
    { id: 'gm_2_5', text: 'After holding her head up while on her tummy, does your baby lay her head back down on the floor, rather than let it drop or fall forward?' }
  ],
  4: [
    { id: 'gm_4_1', text: 'Holds head steady, unsupported' },
    { id: 'gm_4_2', text: 'Pushes down on legs when feet are on a hard surface' },
    { id: 'gm_4_3', text: 'May be able to roll over from tummy to back' },
    { id: 'gm_4_4', text: 'Can hold a toy and shake it and swing at dangling toys' },
    { id: 'gm_4_5', text: 'When lying on stomach, pushes up to elbows' },
    { id: 'gm_4_6', text: 'Brings hands to mouth' },
    { id: 'gm_4_7', text: 'While your baby is on his back, does he move his head from side to side?' },
    { id: 'gm_4_8', text: 'After holding her head up while on her tummy, does your baby lay her head back down on the floor, rather than let it drop or fall forward?' },
    { id: 'gm_4_9', text: 'When your baby is on his tummy, does he hold his head up so that his chin is about 3 inches from the floor for at least 15 seconds?' },
    { id: 'gm_4_10', text: 'When your baby is on her tummy, does she hold her head straight up, looking around? (She can rest on her arms while doing this.)' },
    { id: 'gm_4_11', text: 'When you hold him in a sitting position, does your baby hold his head steady?' },
    { id: 'gm_4_12', text: 'While your baby is on her back, does your baby bring her hands together over her chest touching her fingers?' }
  ],
  6: [
    { id: 'gm_6_1', text: 'Rolls over in both directions (front to back, back to front)' },
    { id: 'gm_6_2', text: 'Begins to sit without support' },
    { id: 'gm_6_3', text: 'When standing, supports weight on legs and might bounce' },
    { id: 'gm_6_4', text: 'Rocks back and forth, sometimes crawling backward before moving forward' },
    { id: 'gm_6_5', text: 'While your baby is on his back, does your baby lift his legs high enough to see his feet?' },
    { id: 'gm_6_6', text: 'When your baby is on her tummy, does she straighten both arms and push her whole chest off the bed or floor?' },
    { id: 'gm_6_7', text: 'Does your baby roll from his back to his tummy, getting both arms out from under him?' },
    { id: 'gm_6_8', text: 'When you put your baby on the floor, does she lean on her hands while sitting? (If she already sits up straight without leaning on her hands, mark "yes" for this item.)' },
    { id: 'gm_6_9', text: 'If you hold both hands just to balance your baby, does he support his own weight while standing?' },
    { id: 'gm_6_10', text: 'Does your baby get into a crawling position by getting up on her hands and knees?' }
  ],
  8: [
    { id: 'gm_8_1', text: 'When you put your baby on the floor, does she lean on her hands while sitting? (If she already sits up straight without leaning on her hands, mark "yes" for this item.)' },
    { id: 'gm_8_2', text: 'Does your baby roll from his back to his tummy, getting both arms out from under him?' },
    { id: 'gm_8_3', text: 'Does your baby get into a crawling position by getting up on her hands and knees?' },
    { id: 'gm_8_4', text: 'If you hold both hands just to balance your baby, does he support his own weight while standing?' },
    { id: 'gm_8_5', text: 'When sitting on the floor, does your baby sit up straight for several minutes without using her hands for support?' },
    { id: 'gm_8_6', text: 'When you stand your baby next to furniture or the crib rail, does he hold on without leaning his chest against the furniture for support?' }
  ],
  9: [
    { id: 'gm_9_1', text: 'Stands, holding on' },
    { id: 'gm_9_2', text: 'Sits without support' },
    { id: 'gm_9_3', text: 'Crawls' },
    { id: 'gm_9_4', text: 'Pulls to stand' },
    { id: 'gm_9_5', text: 'Can get into sitting position' },
    { id: 'gm_9_6', text: 'When you stand your baby next to furniture or the crib rail, does she hold on without leaning her chest against the furniture for support?' },
    { id: 'gm_9_7', text: 'While holding onto furniture, does your baby bend down and pick up a toy from the floor and then return to a standing position?' },
    { id: 'gm_9_8', text: 'While holding onto furniture, does your baby lower himself with control (without falling or flopping down)?' },
    { id: 'gm_9_9', text: 'Does your baby walk beside furniture while holding on with only one hand?' }
  ],
  10: [
    { id: 'gm_10_1', text: 'If you hold both hands just to balance your baby, does she support her own weight while standing?' },
    { id: 'gm_10_2', text: 'When sitting on the floor, does your baby sit up straight for several minutes without using his hands for support?' },
    { id: 'gm_10_3', text: 'When you stand your baby next to furniture or the crib rail, does she hold on without leaning her chest against the furniture for support?' },
    { id: 'gm_10_4', text: 'While holding onto furniture, does your baby bend down and pick up a toy from the floor and then return to a standing position?' },
    { id: 'gm_10_5', text: 'While holding onto furniture, does your baby lower himself with control (without falling or flopping down)?' },
    { id: 'gm_10_6', text: 'Does your baby walk beside furniture while holding on with only one hand?' }
  ],
  12: [
    { id: 'gm_12_1', text: 'Pulls up to stand' },
    { id: 'gm_12_2', text: 'Walks, holding on to furniture' },
    { id: 'gm_12_3', text: 'Drinks from a cup without a lid, as you hold it' },
    { id: 'gm_12_4', text: 'While holding onto furniture, does your baby bend down and pick up a toy from the floor and then return to a standing position?' },
    { id: 'gm_12_5', text: 'While holding onto furniture, does your baby lower herself with control (without falling or flopping down)?' },
    { id: 'gm_12_6', text: 'If you hold both hands just to balance your baby, does he take several steps without tripping or falling? (If your baby already walks alone, mark "yes" for this item.)' },
    { id: 'gm_12_7', text: 'When you hold one hand just to balance your baby, does she take several steps forward? (If your baby already walks alone, mark "yes" for this item.)' },
    { id: 'gm_12_8', text: 'Does your baby stand up in the middle of the floor by himself and take several steps forward?' }
  ],
  14: [
    { id: 'gm_14_1', text: 'If you hold both hands just to balance your baby, does he take several steps without tripping or falling? (If your baby already walks alone, mark "yes" for this item.)' },
    { id: 'gm_14_2', text: 'When you hold one hand just to balance your baby, does she take several steps forward? (If your baby already walks alone, mark "yes" for this item.)' },
    { id: 'gm_14_3', text: 'Does your baby stand up in the middle of the floor by himself and take several steps forward?' },
    { id: 'gm_14_4', text: 'Does your baby climb onto furniture or other large objects, such as large climbing blocks?' },
    { id: 'gm_14_5', text: 'Does your baby bend over or squat to pick up an object from the floor and then stand up again without any support?' },
    { id: 'gm_14_6', text: 'Does your baby move around by walking, rather than by crawling on his hands and knees?' }
  ],
  15: [
    { id: 'gm_15_1', text: 'Takes a few steps on his own' }
  ],
  16: [
    { id: 'gm_16_1', text: 'Does your child stand up in the middle of the floor by himself and take several steps forward?' },
    { id: 'gm_16_2', text: 'Does your child climb onto furniture or other large objects, such as large climbing blocks?' },
    { id: 'gm_16_3', text: 'Does your child bend over or squat to pick up an object from the floor and then stand up again without any support?' },
    { id: 'gm_16_4', text: 'Does your child move around by walking, rather than crawling on her hands and knees?' },
    { id: 'gm_16_5', text: 'Does your child walk well and seldom fall?' },
    { id: 'gm_16_6', text: 'Does your child climb on an object such as a chair to reach something he wants (for example, to get a toy on a counter or to "help" you in the kitchen)?' }
  ],
  18: [
    { id: 'gm_18_1', text: 'Walks alone' },
    { id: 'gm_18_2', text: 'May walk up steps and run' },
    { id: 'gm_18_3', text: 'Pulls toys while walking' },
    { id: 'gm_18_4', text: 'Can help undress herself' },
    { id: 'gm_18_5', text: 'Drinks from a cup' },
    { id: 'gm_18_6', text: 'Does your child bend over or squat to pick up an object from the floor and then stand up again without any support?' },
    { id: 'gm_18_7', text: 'Does your child move around by walking, rather than by crawling on her hands and knees?' },
    { id: 'gm_18_8', text: 'Does your child walk well and seldom fall?' },
    { id: 'gm_18_9', text: 'Does your child climb on an object such as a chair to reach something he wants (for example, to get a toy on a counter or to "help" you in the kitchen)?' },
    { id: 'gm_18_10', text: 'Does your child walk down stairs if you hold onto one of her hands? She may also hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_18_11', text: 'When you show your child how to kick a large ball, does he try to kick the ball by moving his leg forward or by walking into it? (If your child already kicks a ball, mark "yes" for this item.)' }
  ],
  20: [
    { id: 'gm_20_1', text: 'Does your child climb on an object such as a chair to reach something he wants (for example, to get a toy on a counter or to "help" you in the kitchen)?' },
    { id: 'gm_20_2', text: 'Does your child walk well and seldom fall?' },
    { id: 'gm_20_3', text: 'Does your child walk down stairs if you hold onto one of her hands? She may also hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_20_4', text: 'When you show your child how to kick a large ball, does he try to kick the ball by moving his leg forward or by walking into it? (If your child already kicks a ball, mark "yes" for this item.)' },
    { id: 'gm_20_5', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?' },
    { id: 'gm_20_6', text: 'Does your child walk either up or down at least two steps by himself? He may also hold onto the railing or wall.' }
  ],
  22: [
    { id: 'gm_22_1', text: 'When you show your child how to kick a large ball, does he try to kick the ball by moving his leg forward or by walking into it? (If your child already kicks a ball, mark "yes" for this item.)' },
    { id: 'gm_22_2', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?' },
    { id: 'gm_22_3', text: 'Does your child walk down stairs if you hold onto one of his hands? He may also hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_22_4', text: 'Does your child walk either up or down at least two steps by herself? She may hold onto the railing or wall.' },
    { id: 'gm_22_5', text: 'Does your child jump with both feet leaving the floor at the same time?' },
    { id: 'gm_22_6', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?' }
  ],
  24: [
    { id: 'gm_24_1', text: 'Stands on tiptoe' },
    { id: 'gm_24_2', text: 'Kicks a ball' },
    { id: 'gm_24_3', text: 'Begins to run' },
    { id: 'gm_24_4', text: 'Climbs onto and down from furniture without help' },
    { id: 'gm_24_5', text: 'Walks up and down stairs holding on' },
    { id: 'gm_24_6', text: 'Does your child walk down stairs if you hold onto one of her hands? She may also hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_24_7', text: 'Does your child walk either up or down at least two steps by herself? She may hold onto the railing or wall.' },
    { id: 'gm_24_8', text: 'Does your child jump with both feet leaving the floor at the same time?' }
  ],
  27: [
    { id: 'gm_27_1', text: 'Does your child walk either up or down at least two steps by himself? He may hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_27_2', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?' },
    { id: 'gm_27_3', text: 'Does your child jump with both feet leaving the floor at the same time?' },
    { id: 'gm_27_4', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?' },
    { id: 'gm_27_5', text: 'Does your child jump forward at least 3 inches with both feet leaving the ground at the same time?' },
    { id: 'gm_27_6', text: 'Does your child walk upstairs, using only one foot on each stair? (The left foot is on one step, and the right foot is on the next.) She may hold onto the railing or wall.' }
  ],
  30: [
    { id: 'gm_30_1', text: 'Takes some clothes off by himself, like loose pants or an open jacket' },
    { id: 'gm_30_2', text: 'Jumps off the ground with both feet' },
    { id: 'gm_30_3', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?' },
    { id: 'gm_30_4', text: 'Does your child walk either up or down at least two steps by himself? He may hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_30_5', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?' },
    { id: 'gm_30_6', text: 'Does your child walk upstairs, using only one foot on each stair? (The left foot is on one step, and the right foot is on the next.) She may hold onto the railing or wall.' },
    { id: 'gm_30_7', text: 'Does your child stand on one foot for about 1 second without holding onto anything?' }
  ],
  33: [
    { id: 'gm_33_1', text: 'Does your child run fairly well, stopping herself without bumping into things or falling?' },
    { id: 'gm_33_2', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?' },
    { id: 'gm_33_3', text: 'Does your child jump with both feet leaving the floor at the same time?' },
    { id: 'gm_33_4', text: 'Does your child stand on one foot for about 1 second without holding onto anything?' },
    { id: 'gm_33_5', text: 'While standing, does your child throw a ball overhand by raising his arm to shoulder height and throwing the ball forward? (Dropping the ball or throwing the ball underhand should be scored as "not yet.")' },
    { id: 'gm_33_6', text: 'Does your child walk upstairs, using only one foot on each stair? (The left foot is on one step, and the right foot is on the next.) She may hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' }
  ],
  36: [
    { id: 'gm_36_1', text: 'Puts on some clothes by himself, like loose pants or a jacket' },
    { id: 'gm_36_2', text: 'Without holding onto anything for support, does your child kick a ball by swinging his leg forward?' },
    { id: 'gm_36_3', text: 'Does your child jump with both feet leaving the floor at the same time?' },
    { id: 'gm_36_4', text: 'Does your child walk upstairs, using only one foot on each stair? (The left foot is on one step, and the right foot is on the next.) She may hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_36_5', text: 'Does your child stand on one foot for about 1 second without holding onto anything?' },
    { id: 'gm_36_6', text: 'While standing, does your child throw a ball overhand by raising his arm to shoulder height and throwing the ball forward? (Dropping the ball or throwing the ball underhand should be scored as "not yet.")' },
    { id: 'gm_36_7', text: 'Does your child jump forward at least 6 inches with both feet leaving the ground at the same time?' }
  ],
  42: [
    { id: 'gm_42_1', text: 'Does your child walk upstairs, using only one foot on each stair? (The left foot is on one step, and the right foot is on the next.) He may hold onto the railing or wall. (You can look for this at a store, on a playground, or at home.)' },
    { id: 'gm_42_2', text: 'Does your child stand on one foot for about 1 second without holding onto anything?' },
    { id: 'gm_42_3', text: 'While standing, does your child throw a ball overhand by raising his arm to shoulder height and throwing the ball forward? (Dropping the ball or throwing the ball underhand should be scored as "not yet.")' },
    { id: 'gm_42_4', text: 'Does your child jump forward at least 6 inches with both feet leaving the ground at the same time?' },
    { id: 'gm_42_5', text: 'Does your child catch a large ball with both hands? (You should stand about 5 feet away and give your child two or three tries before you mark the answer.)' },
    { id: 'gm_42_6', text: 'Does your child climb the rungs of a ladder of a playground slide and slide down without help?' }
  ],
  48: [
    { id: 'gm_48_1', text: 'Hops and stands on one foot up to 2 seconds' },
    { id: 'gm_48_2', text: 'Catches a bounced ball most of the time' },
    { id: 'gm_48_3', text: 'Pours, cuts with supervision, and mashes own food' },
    { id: 'gm_48_4', text: 'Does your child climb the rungs of a ladder of a playground slide and slide down without help?' },
    { id: 'gm_48_5', text: 'While standing, does your child throw a ball overhand in the direction of a person standing at least 6 feet away? To throw overhand, your child must raise his arm to shoulder height and throw the ball forward. (Dropping the ball or throwing the ball underhand should be scored as "not yet.")' },
    { id: 'gm_48_6', text: 'Does your child jump forward a distance of 20 inches from a standing position, starting with his feet together?' },
    { id: 'gm_48_7', text: 'Without holding onto anything, does your child stand on one foot for at least 5 seconds without losing her balance and putting her foot down? (You may give your child two or three tries before you mark the answer.)' }
  ],
  54: [
    { id: 'gm_54_1', text: 'Does your child hop up and down on either the right foot or the left foot at least one time without losing her balance or falling?' },
    { id: 'gm_54_2', text: 'While standing, does your child throw a ball overhand in the direction of a person standing at least 6 feet away? To throw overhand, your child must raise his arm to shoulder height and throw the ball forward. (Dropping the ball or throwing the ball underhand should be scored as "not yet.")' },
    { id: 'gm_54_3', text: 'Does your child jump forward a distance of 20 inches from a standing position, starting with her feet together?' },
    { id: 'gm_54_4', text: 'Does your child catch a large ball with both hands? (You should stand about 5 feet away and give your child two or three tries before you mark the answer.)' },
    { id: 'gm_54_5', text: 'Without holding onto anything, does your child stand on one foot for at least 5 seconds without losing her balance and putting her foot down? (You may give your child two or three tries before you mark the answer.)' },
    { id: 'gm_54_6', text: 'Does your child walk on his tiptoes for 15 feet (about the length of a large car)? (You may show him how to do this.)' }
  ],
  60: [
    { id: 'gm_60_1', text: 'Stands on one foot for 10 seconds or longer' },
    { id: 'gm_60_2', text: 'Hops; may be able to skip' },
    { id: 'gm_60_3', text: 'Can do a somersault' },
    { id: 'gm_60_4', text: 'Can use the toilet on her own' },
    { id: 'gm_60_5', text: 'Swings and climbs' },
    { id: 'gm_60_6', text: 'While standing, does your child throw a ball overhand in the direction of a person standing at least 6 feet away? To throw overhand, your child must raise his arm to shoulder height and throw the ball forward. (Dropping the ball or throwing the ball underhand should be scored as "not yet.")' },
    { id: 'gm_60_7', text: 'Does your child catch a large ball with both hands? (You should stand about 5 feet away and give your child two or three tries before you mark the answer.)' },
    { id: 'gm_60_8', text: 'Does your child walk on his tiptoes for 15 feet (about the length of a large car)? (You may show him how to do this.)' }
  ]
};

export const GROSS_MOTOR_AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
