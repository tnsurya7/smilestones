export interface LanguageSkill {
  id: string;
  text: string;
  type: 'yes_no' | 'input';
}

export const LANGUAGE_DEVELOPMENT: Record<number, LanguageSkill[]> = {
  2: [
    { id: 'lang_2_1', text: 'Coos, makes gurgling sounds', type: 'yes_no' },
    { id: 'lang_2_2', text: 'Turns head toward sounds', type: 'yes_no' },
    { id: 'lang_2_3', text: 'When you speak to your baby, does she make sounds back to you?', type: 'yes_no' },
    { id: 'lang_2_4', text: 'Does your baby smile when you talk to him?', type: 'yes_no' },
    { id: 'lang_2_5', text: 'Does your baby chuckle softly?', type: 'yes_no' },
    { id: 'lang_2_6', text: 'After you have been out of sight, does your baby smile or get excited when she sees you?', type: 'yes_no' }
  ],
  4: [
    { id: 'lang_4_1', text: 'Begins to babble', type: 'yes_no' },
    { id: 'lang_4_2', text: 'Babbles with expression and copies sounds he hears', type: 'yes_no' },
    { id: 'lang_4_3', text: 'Cries in different ways to show hunger, pain, or being tired', type: 'yes_no' },
    { id: 'lang_4_4', text: 'Does your baby chuckle softly?', type: 'yes_no' },
    { id: 'lang_4_5', text: 'After you have been out of sight, does your baby smile or get excited when he sees you?', type: 'yes_no' },
    { id: 'lang_4_6', text: 'Does your baby stop cry when she hears a voice other than yours?', type: 'yes_no' },
    { id: 'lang_4_7', text: 'Does your baby make high-pitched squeals?', type: 'yes_no' },
    { id: 'lang_4_8', text: 'Does your baby laugh?', type: 'yes_no' },
    { id: 'lang_4_9', text: 'Does your baby make sounds when looking at toys or people?', type: 'yes_no' }
  ],
  6: [
    { id: 'lang_6_1', text: 'Strings vowels together when babbling ("ah," "eh," "oh") and likes taking turns with parent while making sounds', type: 'yes_no' },
    { id: 'lang_6_2', text: 'Responds to sounds by making sounds', type: 'yes_no' },
    { id: 'lang_6_3', text: 'Responds to own name', type: 'yes_no' },
    { id: 'lang_6_4', text: 'Makes sounds to show joy and displeasure', type: 'yes_no' },
    { id: 'lang_6_5', text: 'Begins to say consonant sounds (jabbering with "m," "b")', type: 'yes_no' },
    { id: 'lang_6_6', text: 'Does your baby make high-pitched squeals?', type: 'yes_no' },
    { id: 'lang_6_7', text: 'When playing with sounds, does your baby make grunting, growling, or other deep-toned sounds?', type: 'yes_no' },
    { id: 'lang_6_8', text: 'If you call your baby when you are out of sight, does she look in the direction of your voice?', type: 'yes_no' },
    { id: 'lang_6_9', text: 'When a loud noise occurs, does your baby turn to see where the sound came from?', type: 'yes_no' },
    { id: 'lang_6_10', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?', type: 'yes_no' },
    { id: 'lang_6_11', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?', type: 'yes_no' }
  ],
  8: [
    { id: 'lang_8_1', text: 'If you call to your baby when you are out of sight, does she look in the direction of your voice?', type: 'yes_no' },
    { id: 'lang_8_2', text: 'When a loud noise occurs, does your baby turn to see where the sound came from?', type: 'yes_no' },
    { id: 'lang_8_3', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?', type: 'yes_no' },
    { id: 'lang_8_4', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?', type: 'yes_no' },
    { id: 'lang_8_5', text: 'Does your baby respond to the tone of your voice and stop his activity at least briefly when you say "no-no" to him?', type: 'yes_no' },
    { id: 'lang_8_6', text: 'Does your baby make two similar sounds like "ba-ba," "da-da," or "ga-ga"? (The sounds do not need to mean anything.)', type: 'yes_no' }
  ],
  9: [
    { id: 'lang_9_1', text: 'Understands "no"', type: 'yes_no' },
    { id: 'lang_9_2', text: 'Makes a lot of different sounds like "mamamama" and "bababababa"', type: 'yes_no' },
    { id: 'lang_9_3', text: 'Copies sounds and gestures of others', type: 'yes_no' },
    { id: 'lang_9_4', text: 'Uses fingers to point at things', type: 'yes_no' },
    { id: 'lang_9_5', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?', type: 'yes_no' },
    { id: 'lang_9_6', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?', type: 'yes_no' },
    { id: 'lang_9_7', text: 'Does your baby make two similar sounds like "ba-ba," "da-da," or "ga-ga"?', type: 'yes_no' },
    { id: 'lang_9_8', text: 'If you ask your baby to, does he play at least one nursery game even if you don\'t show him the activity yourself (such as "bye-bye," "Peek-a-boo," "clap your hands," "So Big")?', type: 'yes_no' },
    { id: 'lang_9_9', text: 'Does your baby follow one simple command, such as "Come here," "Give it to me," or "Put it back," without your using gestures?', type: 'yes_no' },
    { id: 'lang_9_10', text: 'Does your baby say three words, such as "Mama," "Dada," and "Baba"? (A "word" is a sound or sounds your baby says consistently to mean someone or something.)', type: 'yes_no' }
  ],
  10: [
    { id: 'lang_10_1', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?', type: 'yes_no' },
    { id: 'lang_10_2', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?', type: 'yes_no' },
    { id: 'lang_10_3', text: 'Does your baby make two similar sounds like "ba-ba," "da-da," or "ga-ga"? (The sounds do not need to mean anything.)', type: 'yes_no' },
    { id: 'lang_10_4', text: 'If you ask your baby to, does he play at least one nursery game even if you don\'t show him the activity yourself (such as "bye-bye," "Peek-a-boo," "clap your hands," "So Big")?', type: 'yes_no' },
    { id: 'lang_10_5', text: 'Does your baby follow one simple command, such as "Come here," "Give it to me," or "Put it back," without your using gestures?', type: 'yes_no' },
    { id: 'lang_10_6', text: 'Does your baby say three words, such as "Mama," "Dada," and "Baba"? (A "word" is a sound or sounds your baby says consistently to mean someone or something.)', type: 'yes_no' }
  ],
  12: [
    { id: 'lang_12_1', text: 'Responds to simple spoken requests', type: 'yes_no' },
    { id: 'lang_12_2', text: 'Uses simple gestures, like shaking head "no" or waving "bye-bye"', type: 'yes_no' },
    { id: 'lang_12_3', text: 'Makes sounds with changes in tone (sounds more like speech)', type: 'yes_no' },
    { id: 'lang_12_4', text: 'Says "mama" and "dada" and exclamations like "uh-oh!"', type: 'yes_no' },
    { id: 'lang_12_5', text: 'Tries to say words you say', type: 'yes_no' },
    { id: 'lang_12_6', text: 'Does your baby make two similar sounds, such as "ba-ba," "da-da," or "ga-ga"? (The sounds do not need to mean anything.)', type: 'yes_no' },
    { id: 'lang_12_7', text: 'Does your baby follow one simple command, such as "Come here," "Give it to me," or "Put it back," without your using gestures?', type: 'yes_no' },
    { id: 'lang_12_8', text: 'When you ask, "Where is the ball (hat, shoe, etc.)?" does your baby look at the object? (Make sure the object is present. Mark "yes" if she knows one object.)', type: 'yes_no' },
    { id: 'lang_12_9', text: 'When your baby wants something, does he tell you by pointing to it?', type: 'yes_no' }
  ],
  14: [
    { id: 'lang_14_1', text: 'Does your baby say three words, such as "Mama," "Dada," and "Baba"? (A "word" is a sound or sounds your baby says consistently to mean someone or something.)', type: 'yes_no' },
    { id: 'lang_14_2', text: 'When your baby wants something, does she tell you by pointing to it?', type: 'yes_no' },
    { id: 'lang_14_3', text: 'Does your baby shake his head when he means "no" or "yes"?', type: 'yes_no' },
    { id: 'lang_14_4', text: 'Does your baby point to, pat, or try to pick up pictures in a book?', type: 'yes_no' },
    { id: 'lang_14_5', text: 'Does your baby say four or more words in addition to "Mama" and "Dada"?', type: 'yes_no' },
    { id: 'lang_14_6', text: 'When you ask her to, does your baby go into another room to find a familiar toy or object? (You might ask, "Where is your ball?" or say, "Bring me your coat," or "Go get your blanket.")', type: 'yes_no' }
  ],
  15: [
    { id: 'lang_15_1', text: 'Tries to say one or two words besides "mama" or "dada", "ba" for ball or "da" for dog', type: 'yes_no' },
    { id: 'lang_15_2', text: 'Looks at a familiar object when you name it', type: 'yes_no' },
    { id: 'lang_15_3', text: 'Follows directions given with both a gesture and words. for example, he gives you a toy when you hold out your hand and says, "give me the toy"', type: 'yes_no' },
    { id: 'lang_15_4', text: 'Points to ask for something or to get help', type: 'yes_no' }
  ],
  16: [
    { id: 'lang_16_1', text: 'Does your child point to, pat, or try to pick up pictures in a book?', type: 'yes_no' },
    { id: 'lang_16_2', text: 'Does your child say four or more words in addition to "Mama" and "Dada"?', type: 'yes_no' },
    { id: 'lang_16_3', text: 'When your child wants something, does she tell you by pointing to it?', type: 'yes_no' },
    { id: 'lang_16_4', text: 'When you ask your child to, does he go into another room to find a familiar toy or object? (You might ask, "Where is your ball?" or say, "Bring me your coat," or "Go get your blanket.")', type: 'yes_no' },
    { id: 'lang_16_5', text: 'Does your child imitate a two-word sentence? For example, when you say a two-word phrase, such as "Mama eat," "Daddy play," "Go home," or "What\'s this?" does your child say both words back to you? (Mark "yes" even if her words are difficult to understand.)', type: 'yes_no' },
    { id: 'lang_16_6', text: 'Does your child say eight or more words in addition to "Mama" and "Dada"?', type: 'yes_no' }
  ],
  18: [
    { id: 'lang_18_1', text: 'Says several sign words', type: 'yes_no' },
    { id: 'lang_18_2', text: 'Says and shakes head "no"', type: 'yes_no' },
    { id: 'lang_18_3', text: 'Points to show someone what he wants', type: 'yes_no' },
    { id: 'lang_18_4', text: 'When your child wants something, does she tell you by pointing to it?', type: 'yes_no' },
    { id: 'lang_18_5', text: 'When you ask your child to, does he go into another room to find a familiar toy or object? (You might ask, "Where is your ball?" or say, "Bring me your coat," or "Go get your blanket.")', type: 'yes_no' },
    { id: 'lang_18_6', text: 'Does your child say eight or more words in addition to "Mama" and "Dada"?', type: 'yes_no' },
    { id: 'lang_18_7', text: 'Does your child imitate a two-word sentence? For example, when you say a two-word phrase, such as "Mama eat," "Daddy play," "Go home," or "What\'s this?" does your child say both words back to you? (Mark "yes" even if her words are difficult to understand.)', type: 'yes_no' },
    { id: 'lang_18_8', text: 'Without your showing him, does your child point to the correct picture when you say, "Show me the kitty," or ask, "Where is the dog?" (He needs to identify only one picture correctly.)', type: 'yes_no' },
    { id: 'lang_18_9', text: 'Does your child say two or three words that represent different ideas together, such as "See dog," "Mommy come home," or "Kitty gone"? (Don\'t count word combinations that express one idea, such as "bye-bye," "all gone," "all right," and "What\'s that?") Please give an example of your child\'s word combinations:', type: 'input' }
  ],
  20: [
    { id: 'lang_20_1', text: 'Does your child imitate a two-word sentence? For example, when you say a two-word phrase, such as "Mama eat," "Daddy play," "Go home," or "What\'s this?" does your child say both words back to you? (Mark "yes" even if her words are difficult to understand.)', type: 'yes_no' },
    { id: 'lang_20_2', text: 'Does your child say eight or more words in addition to "Mama" and "Dada"?', type: 'yes_no' },
    { id: 'lang_20_3', text: 'Without your showing him, does your child point to the correct picture when you say, "Show me the kitty," or ask, "Where is the dog?" (He needs to identify only one picture correctly.)', type: 'yes_no' },
    { id: 'lang_20_4', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?', type: 'yes_no' },
    { id: 'lang_20_5', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions? a) "Put the toy on the table." b) "Close the door." c) "Bring me a towel." d) "Find your coat." e) "Take my hand." f) "Get your book."', type: 'yes_no' },
    { id: 'lang_20_6', text: 'Does your child say two or three words that represent different ideas together, such as "See dog," "Mommy come home," or "Kitty gone"? (Don\'t count word combinations that express one idea, such as "bye-bye," "all gone," "all right," and "What\'s that?") Please give an example of your child\'s word combinations:', type: 'input' }
  ],
  22: [
    { id: 'lang_22_1', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?', type: 'yes_no' },
    { id: 'lang_22_2', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions? a) "Put the toy on the table." b) "Close the door." c) "Bring me a towel." d) "Find your coat." e) "Take my hand." f) "Get your book."', type: 'yes_no' },
    { id: 'lang_22_3', text: 'When you ask your child to point to her nose, eyes, hair, feet, ears, and so forth, does she correctly point to at least seven body parts? (She can point to parts of herself, you, or a doll. Mark "sometimes" if she correctly points to at least three different body parts.)', type: 'yes_no' },
    { id: 'lang_22_4', text: 'Does your child say 15 or more words in addition to "Mama" and "Dada"?', type: 'yes_no' },
    { id: 'lang_22_5', text: 'Does your child correctly use at least two words like "me," "I," "mine," and "you"?', type: 'yes_no' },
    { id: 'lang_22_6', text: 'Does your child say two or three words that represent different ideas together, such as "See dog," "Mommy come home," or "Kitty gone"? (Don\'t count word combinations that express one idea, such as "bye-bye," "all gone," "all right," and "What\'s that?") Please give an example of your child\'s word combinations:', type: 'input' }
  ],
  24: [
    { id: 'lang_24_1', text: 'Points to things or pictures when they are named', type: 'yes_no' },
    { id: 'lang_24_2', text: 'Knows names of familiar people and body parts', type: 'yes_no' },
    { id: 'lang_24_3', text: 'Says sentences with 2 to 4 words', type: 'yes_no' },
    { id: 'lang_24_4', text: 'Follows simple instructions', type: 'yes_no' },
    { id: 'lang_24_5', text: 'Repeated words overheard in conversation', type: 'yes_no' },
    { id: 'lang_24_6', text: 'Points to things in a book', type: 'yes_no' },
    { id: 'lang_24_7', text: 'Does your child imitate a two-word sentence? For example, when you say a two-word phrase, such as "Mama eat," "Daddy play," "Go home," or "What\'s this?" does your child say both words back to you? (Mark "yes" even if her words are difficult to understand.)', type: 'yes_no' },
    { id: 'lang_24_8', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions? a) "Put the toy on the table." b) "Close the door." c) "Bring me a towel." d) "Find your coat." e) "Take my hand." f) "Get your book."', type: 'yes_no' },
    { id: 'lang_24_9', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?', type: 'yes_no' },
    { id: 'lang_24_10', text: 'Does your child say two or three words that represent different ideas together, such as "See dog," "Mommy come home," or "Kitty gone"? (Don\'t count word combinations that express one idea, such as "bye-bye," "all gone," "all right," and "What\'s that?") Please give an example of your child\'s word combinations:', type: 'input' },
    { id: 'lang_24_11', text: 'Does your child correctly use at least two words like "me," "I," "mine," and "you"?', type: 'yes_no' }
  ],
  27: [
    { id: 'lang_27_1', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions? a) "Put the toy on the table." b) "Close the door." c) "Bring me a towel." d) "Find your coat." e) "Take my hand." f) "Get your book."', type: 'yes_no' },
    { id: 'lang_27_2', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?', type: 'yes_no' },
    { id: 'lang_27_3', text: 'When you ask her to point to her nose, eyes, hair, feet, ears, and so forth, does your child correctly point to at least seven body parts? (She can point to parts of herself, you, or a doll. Mark "sometimes" if she correctly points to at least three different body parts.)', type: 'yes_no' },
    { id: 'lang_27_4', text: 'Does your child correctly use at least two words like "me," "I," "mine," and "you"?', type: 'yes_no' },
    { id: 'lang_27_5', text: 'Does your child make sentences that are three or four words long? Please give an example:', type: 'input' },
    { id: 'lang_27_6', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book on the table" and "put the shoe under the chair." Does your child carry out both of these directions correctly?', type: 'yes_no' }
  ],
  30: [
    { id: 'lang_30_1', text: 'Says about 50 words', type: 'yes_no' },
    { id: 'lang_30_2', text: 'Says two or more words, with one action word, like "Doggie run"', type: 'yes_no' },
    { id: 'lang_30_3', text: 'Names things in a book when you point and ask, "what is this?"', type: 'yes_no' },
    { id: 'lang_30_4', text: 'Says words like "I," "Me", or "we"', type: 'yes_no' },
    { id: 'lang_30_5', text: 'If you point to a picture of a ball (kitty, cup, hat, etc.) and ask your child, "What is this?" does your child correctly name at least one picture?', type: 'yes_no' },
    { id: 'lang_30_6', text: 'Without your giving him clues by pointing or using gestures, can your child carry out at least three of these kinds of directions? a) "Put the toy on the table." b) "Close the door." c) "Bring me a towel." d) "Find your coat." e) "Take my hand." f) "Get your book."', type: 'yes_no' },
    { id: 'lang_30_7', text: 'When you ask your child to point to her nose, eyes, hair, feet, ears, and so forth, does she correctly point to at least seven body parts? (She can point to parts of herself, you, or a doll. Mark "sometimes" if she correctly points to at least three different body parts.)', type: 'yes_no' },
    { id: 'lang_30_8', text: 'Does your child make sentences that are three or four words long? Please give an example:', type: 'input' },
    { id: 'lang_30_9', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book on the table" and "put the shoe under the chair." Does your child carry out both of these directions correctly?', type: 'yes_no' },
    { id: 'lang_30_10', text: 'When looking at a picture book, does your child tell you what is happening or what action is taking place in the picture (for example, "barking," "running," "eating," or "crying")? You may ask, "What is the dog (or boy) doing?"', type: 'yes_no' }
  ],
  33: [
    { id: 'lang_33_1', text: 'When you ask your child to point to his nose, eyes, hair, feet, ears, and so forth, does he correctly point to at least seven body parts? (He can point to parts of himself, you, or a doll. Mark "sometimes" if he correctly points to at least three different body parts.)', type: 'yes_no' },
    { id: 'lang_33_2', text: 'Does your child make sentences that are three or four words long? Please give an example:', type: 'input' },
    { id: 'lang_33_3', text: 'Without giving your child help by pointing or using gestures, ask her to "put the book on the table" and "put the shoe under the chair." Does your child carry out both of these directions correctly?', type: 'yes_no' },
    { id: 'lang_33_4', text: 'When looking at a picture book, does your child tell you what is happening or what action is taking place in the picture (for example, "barking," "running," "eating," or "crying"). You may ask, "What is the dog (or boy) doing?"', type: 'yes_no' },
    { id: 'lang_33_5', text: 'Show your child how a zipper on a coat moves up and down, and say, "See, this goes up and down." Put the zipper to the middle, and ask your child to move the zipper down. Return the zipper to the middle, and ask your child to move the zipper up. Do this several times, placing the zipper in the middle before asking your child to move it up or down. Does your child consistently move the zipper up when you say "up" and down when you say "down"?', type: 'yes_no' },
    { id: 'lang_33_6', text: 'When you ask, "What is your name?" does your child say his first name or nickname?', type: 'yes_no' }
  ],
  36: [
    { id: 'lang_36_1', text: 'Talks with you in conversation using at least two back-and-forth exchanges', type: 'yes_no' },
    { id: 'lang_36_2', text: 'Asks "who," "what," "where," or "why" questions, like "Where is mommy/daddy?"', type: 'yes_no' },
    { id: 'lang_36_3', text: 'Says what action is happening in a picture or book when asked, like "running," "eating," or "playing"', type: 'yes_no' },
    { id: 'lang_36_4', text: 'Says first name, when asked', type: 'yes_no' },
    { id: 'lang_36_5', text: 'Talks well enough for others to understand, most of the time', type: 'yes_no' },
    { id: 'lang_36_6', text: 'When you ask your child to point to her nose, eyes, hair, feet, ears, and so forth, does she correctly point to at least seven body parts? (She can point to parts of herself, you, or a doll. Mark "sometimes" if she correctly points to at least three different body parts.)', type: 'yes_no' },
    { id: 'lang_36_7', text: 'Does your child make sentences that are three or four words long? Please give an example:', type: 'input' },
    { id: 'lang_36_8', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book on the table" and "put the shoe under the chair." Does your child carry out both of these directions correctly?', type: 'yes_no' },
    { id: 'lang_36_9', text: 'Show your child how a zipper on a coat moves up and down, and say, "See, this goes up and down." Put the zipper to the middle and ask your child to move the zipper down. Return the zipper to the middle and ask your child to move the zipper up. Do this several times, placing the zipper in the middle before asking your child to move it up or down. Does your child consistently move the zipper up when you say "up" and down when you say "down"?', type: 'yes_no' }
  ],
  42: [
    { id: 'lang_42_1', text: 'Without giving your child help by pointing or using gestures, ask him to "put the book on the table" and "put the shoe under the chair." Does your child carry out both of these directions correctly?', type: 'yes_no' },
    { id: 'lang_42_2', text: 'When looking at a picture book, does your child tell you what is happening or what action is taking place in the picture (for example, "barking," "running," "eating," or "crying")? You may ask, "What is the dog (or boy) doing?"', type: 'yes_no' },
    { id: 'lang_42_3', text: 'Show your child how a zipper on a coat moves up and down, and say, "See, this goes up and down." Put the zipper to the middle, and ask your child to move the zipper down. Return the zipper to the middle, and ask your child to move the zipper up. Do this several times, placing the zipper in the middle before asking your child to move it up or down. Does your child consistently move the zipper up when you say "up" and down when you say "down"?', type: 'yes_no' },
    { id: 'lang_42_4', text: 'When you ask, "What is your name?" does your child say both her first and last names?', type: 'yes_no' },
    { id: 'lang_42_5', text: 'Without your giving help by pointing or repeating directions, does your child follow three directions that are unrelated to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."', type: 'yes_no' },
    { id: 'lang_42_6', text: 'Does your child use all of the words in a sentence (for example, "a," "the," "am," "is," and "are") to make complete sentences, such as "I am going to the park," or "Is there a toy to play with?" or "Are you coming, too?"', type: 'yes_no' }
  ],
  48: [
    { id: 'lang_48_1', text: 'Knows some basic rules of grammar, such as correctly using "he" or "she"', type: 'yes_no' },
    { id: 'lang_48_2', text: 'Sings a song or says a poem from memory such as "Itsy Bitsy spider" or the "wheels on the Bus"', type: 'yes_no' },
    { id: 'lang_48_3', text: 'Tells stories', type: 'yes_no' },
    { id: 'lang_48_4', text: 'Can say first and last name', type: 'yes_no' },
    { id: 'lang_48_5', text: 'Does your child\'s name at least three items from a common category? For example, if you say to your child, "Tell me some things that you can eat," does your child answer with something like "cookies, eggs, and cereal"? Or if you say, "Tell me the names of some animals," does your child answer with something like "cow, dog, and elephant"?', type: 'yes_no' },
    { id: 'lang_48_6', text: 'Does your child answer the following questions? (Mark "sometimes" if your child answers only one question.) "What do you do when you are hungry?" (Acceptable answers include "get food," "eat," "ask for something to eat," and "have a snack.") Please write your child\'s response: "What do you do when you are tired?" (Acceptable answers include "take a nap," "rest," "go to sleep," "go to bed," "lie down," and "sit down.") Please write your child\'s response:', type: 'input' },
    { id: 'lang_48_7', text: 'Does your child tell you at least two things about common objects? For example, if you say to your child, "Tell me about your ball," does she say something like, "It\'s round. I throw it. It\'s big"?', type: 'yes_no' },
    { id: 'lang_48_8', text: 'Without your giving help by pointing or repeating, does your child follow three directions that are unrelated to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."', type: 'yes_no' },
    { id: 'lang_48_9', text: 'Does your child use all of the words in a sentence (for example, "a," "the," "am," "is," and "are") to make complete sentences, such as "I am going to the park," or "Is there a toy to play with?" or "Are you coming, too?"', type: 'yes_no' }
  ],
  54: [
    { id: 'lang_54_1', text: 'Does your child tell you at least two things about common objects? For example, if you say to your child, "Tell me about your ball," does she say something like, "It\'s round. I throw it. It\'s big"', type: 'yes_no' },
    { id: 'lang_54_2', text: 'Does your child use all of the words in a sentence (for example, "a," "the," "am," "is," and "are") to make complete sentences, such as "I am going to the park," "Is there a toy to play with?" or "Are you coming, too?"', type: 'yes_no' },
    { id: 'lang_54_3', text: 'Does your child use endings of words, such as "-s," "-ed," and "-ing"? For example, does your child say things like, "I see two cats," "I am playing," or "I kicked the ball"?', type: 'yes_no' },
    { id: 'lang_54_4', text: 'Without giving your child help by pointing or repeating directions, does he follow three directions that are unrelated to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."', type: 'yes_no' },
    { id: 'lang_54_5', text: 'Does your child use four- and five-word sentences? For example, does your child say, "I want the car"? Please write an example:', type: 'input' },
    { id: 'lang_54_6', text: 'When talking about something that already happened, does your child use words that end in "-ed," such as "walked," "jumped," or "played"? Ask your child questions, such as "How did you get to the store?" ("We walked.") "What did you do at your friend\'s house?" ("We played.") Please write an example:', type: 'input' }
  ],
  60: [
    { id: 'lang_60_1', text: 'Speaks very clearly', type: 'yes_no' },
    { id: 'lang_60_2', text: 'Tells a simple story using full sentences', type: 'yes_no' },
    { id: 'lang_60_3', text: 'Uses future tense; for example, "grandma will be here"', type: 'yes_no' },
    { id: 'lang_60_4', text: 'Says name and address', type: 'yes_no' },
    { id: 'lang_60_5', text: 'Without your giving help by pointing or repeating directions, does your child follow three directions that are unrelated to one another? Give all three directions before your child starts. For example, you may ask your child, "Clap your hands, walk to the door, and sit down," or "Give me the pen, open the book, and stand up."', type: 'yes_no' },
    { id: 'lang_60_6', text: 'When talking about something that already happened, does your child use words that end in "-ed," such as "walked," "jumped," or "played"? Ask your child questions, such as "How did you get to the store?" ("We walked.") "What did you do at your friend\'s house?" ("We played.") Please write an example:', type: 'input' },
    { id: 'lang_60_7', text: 'Does your child use comparison words, such as "heavier," "stronger," or "shorter"? Ask your child questions, such as "A car is big, but a bus is ___" (bigger); "A cat is heavy, but a man is ___" (heavier); "A TV is small, but a book is ___" (smaller). Please write an example:', type: 'input' },
    { id: 'lang_60_8', text: 'Does your child answer the following questions? (Mark "sometimes" if your child answers only one question.) "What do you do when you are hungry?" (Acceptable answers include "get food," "eat," "ask for something to eat," and "have a snack.") Please write your child\'s response: "What do you do when you are tired?" (Acceptable answers include: "take a nap," "rest," "go to sleep," "go to bed," "lie down," and "sit down.") Please write your child\'s response:', type: 'input' },
    { id: 'lang_60_9', text: 'Does your child repeat the sentences shown below back to you, without any mistakes? (Read the sentences one at a time. You may repeat each sentence one time. Mark "yes" if your child repeats both sentences without mistakes or "sometimes" if your child repeats one sentence without mistakes.) Jane hides her shoes for Maria to find. Al read the blue book under his bed.', type: 'yes_no' }
  ]
};

export const LANGUAGE_AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
