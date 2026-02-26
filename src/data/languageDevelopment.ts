// Type definitions
interface LanguageSkill {
  id: string;
  text: string;
}

interface LanguageSkillsByAge {
  [age: number]: LanguageSkill[];
}

export const LANGUAGE_DEVELOPMENT: LanguageSkillsByAge = {
  2: [
    { id: 'lang_2_1', text: 'Coos, makes gurgling sounds' },
    { id: 'lang_2_2', text: 'Turns head toward sounds' },
    { id: 'lang_2_3', text: 'When you speak to your baby, does she make sounds back to you?' },
    { id: 'lang_2_4', text: 'Does your baby smile when you talk to him?' },
    { id: 'lang_2_5', text: 'Does your baby chuckle softly?' },
    { id: 'lang_2_6', text: 'After you have been out of sight, does your baby smile or get excited when she sees you?' }
  ],
  4: [
    { id: 'lang_4_1', text: 'Begins to babble' },
    { id: 'lang_4_2', text: 'Babbles with expression and copies sounds he hears' },
    { id: 'lang_4_3', text: 'Cries in different ways to show hunger, pain, or being tired' },
    { id: 'lang_4_4', text: 'Does your baby chuckle softly?' },
    { id: 'lang_4_5', text: 'After you have been out of sight, does your baby smile or get excited when he sees you?' },
    { id: 'lang_4_6', text: 'Does your baby stop cry when she hears a voice other than yours?' },
    { id: 'lang_4_7', text: 'Does your baby make high-pitched squeals?' },
    { id: 'lang_4_8', text: 'Does your baby laugh?' },
    { id: 'lang_4_9', text: 'Does your baby make sounds when looking at toys or people?' }
  ],
  6: [
    { id: 'lang_6_1', text: 'Strings vowels together when babbling ("ah," "eh," "oh") and likes taking turns with parent while making sounds' },
    { id: 'lang_6_2', text: 'Responds to sounds by making sounds' },
    { id: 'lang_6_3', text: 'Responds to own name' },
    { id: 'lang_6_4', text: 'Makes sounds to show joy and displeasure' },
    { id: 'lang_6_5', text: 'Begins to say consonant sounds (jabbering with "m," "b")' },
    { id: 'lang_6_6', text: 'Does your baby make high-pitched squeals?' },
    { id: 'lang_6_7', text: 'When playing with sounds, does your baby make grunting, growling, or other deep-toned sounds?' },
    { id: 'lang_6_8', text: 'If you call your baby when you are out of sight, does she look in the direction of your voice?' },
    { id: 'lang_6_9', text: 'When a loud noise occurs, does your baby turn to see where the sound came from?' },
    { id: 'lang_6_10', text: 'Does your baby make sounds like "da," "ga," "ka," and "ba"?' },
    { id: 'lang_6_11', text: 'If you copy the sounds your baby makes, does your baby repeat the same sounds back to you?' }
  ],
  8: [
    { id: 'lang_8_1', text: 'If you call to your baby when you are out of sight, does she look in the direction of your voice?' },
    { id: 'lang_8_2', text: 'When a loud noise occurs, does your baby turn to see where the sound came from?' }
  ]
};

export const LANGUAGE_AVAILABLE_AGES = [2, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
