// Type definitions
interface DSMQuestion {
  id: string;
  text: string;
  isHeading?: boolean;
}

interface DSMSection {
  title: string;
  questions: DSMQuestion[];
}

interface DSMQuestions {
  [key: string]: DSMSection;
}

export const DSM_QUESTIONS: DSMQuestions = {
  A1: {
    title: 'A1. Social Emotional Reciprocity',
    questions: [
      { id: 'a1_1', text: 'Abnormal social approach' },
      { id: 'a1_2', text: 'Unusual social initiations' },
      { id: 'a1_3', text: 'Using of others as tools' },
      { id: 'a1_4', text: 'Poor pragmatic/social use of language' },
      { id: 'a1_5', text: 'Failure of normal back and forth conversation' },
      { id: 'a1_6', text: 'Failure to respond when name called or when spoken directly to' },
      { id: 'a1_7', text: 'Does not initiate conversation' },
      { id: 'a1_8', text: 'One-sided conversations / monologues / tangential speech' },
      { id: 'a1_9', text: 'Doesn\'t share, Reduced sharing of interests' },
      { id: 'a1_10', text: 'Lack of showing, bringing or pointing out objects of interest to other people' },
      { id: 'a1_11', text: 'Impairments in joint attention' },
      { id: 'a1_12', text: 'Lack of responsive social smile' },
      { id: 'a1_13', text: 'Reduced sharing of emotions/affect' },
      { id: 'a1_14', text: 'Failure to share enjoyment, excitement, or achievements with others' },
      { id: 'a1_15', text: 'Failure to respond to praise' },
      { id: 'a1_16', text: 'Does not show pleasure in social interactions' },
      { id: 'a1_17', text: 'Failure to offer comfort to others' },
      { id: 'a1_18', text: 'Indifference/aversion to physical contact and affection' },
      { id: 'a1_19', text: 'Only initiates to get help; limited social initiations' },
      { id: 'a1_20', text: 'Lack of initiation of social interaction' },
      { id: 'a1_21', text: 'Failure to engage in simple social games' },
      { id: 'a1_22', text: 'Poor social imitation' }
    ]
  },
  A2: {
    title: 'A2. Nonverbal Communication',
    questions: [
      { id: 'a2_1', text: 'Impairments in social use of eye contact' },
      { id: 'a2_2', text: 'Impairment in the use and understanding of body postures' },
      { id: 'a2_3', text: 'Impairment in the use and understanding of gestures' },
      { id: 'a2_4', text: 'Abnormal volume, pitch, intonation, rate, rhythm, stress, prosody or volume in speech' },
      { id: 'a2_5', text: 'Abnormalities in use and understanding of affect' },
      { id: 'a2_6', text: 'Impairment in the use of facial expressions' },
      { id: 'a2_7', text: 'Lack of warm, joyful expressions directed at others' },
      { id: 'a2_8', text: 'Limited communication of own affect' },
      { id: 'a2_9', text: 'Inability to recognize or interpret other\'s nonverbal expressions communication' },
      { id: 'a2_10', text: 'Lack of coordinated verbal and nonverbal communication' },
      { id: 'a2_11', text: 'Lack of coordinated non-verbal communication' }
    ]
  },
  A3: {
    title: 'A3. Relationships',
    questions: [
      { id: 'a3_1', text: 'Deficits in developing and maintaining relationships, appropriate to developmental level' },
      { id: 'a3_2', text: 'Difficulties adjusting behavior to suit social contexts' },
      { id: 'a3_3', text: 'Does not notice another person\'s lack of interest in an activity' },
      { id: 'a3_4', text: 'Lack of response to contextual cues' },
      { id: 'a3_5', text: 'Inappropriate expressions of emotion' },
      { id: 'a3_6', text: 'Unaware of social conventions/appropriate social behavior' },
      { id: 'a3_7', text: 'Asks socially inappropriate questions or makes socially inappropriate statements' },
      { id: 'a3_8', text: 'Does not notice another\'s distress or disinterest' },
      { id: 'a3_9', text: 'Does not recognize when not welcome in a play or conversational setting' },
      { id: 'a3_10', text: 'Limited recognition of social emotions' },
      { id: 'a3_11', text: 'Does not notice when he or she is being teased' },
      { id: 'a3_12', text: 'Does not notice how his or her behavior impacts others emotionally' },
      { id: 'a3_13', text: 'Difficulties in sharing imaginative play' },
      { id: 'a3_14', text: 'Lack of imaginative play with peers, including social role playing' },
      { id: 'a3_15', text: 'Difficulties in making friends' },
      { id: 'a3_16', text: 'Does not try to establish friendships' },
      { id: 'a3_17', text: 'Does not have preferred friends' },
      { id: 'a3_18', text: 'Lack of cooperative play; parallel play only' },
      { id: 'a3_19', text: 'Unaware of being teased or ridiculed by other children' },
      { id: 'a3_20', text: 'Does not play in groups of children' },
      { id: 'a3_21', text: 'Does not play with children his/her age or developmental level' },
      { id: 'a3_22', text: 'Has an interest in friendship but lacks understanding of the conventions of social interaction' },
      { id: 'a3_23', text: 'Does not respond to the social approaches of other children' },
      { id: 'a3_24', text: 'Absence of interest in others' },
      { id: 'a3_25', text: 'Lack of interest in peers' },
      { id: 'a3_26', text: 'Withdrawn; aloof; in own world' },
      { id: 'a3_27', text: 'Does not try to attract the attention of others' },
      { id: 'a3_28', text: 'Limited interest in others; Unaware or oblivious to children or adults' },
      { id: 'a3_29', text: 'Limited interaction with others' },
      { id: 'a3_30', text: 'Prefers solitary activities' }
    ]
  },
  B1: {
    title: 'B1. Repetitive Movements, Speech, and Use of Objects',
    questions: [
      { id: 'b1_heading_1', text: 'Stereotyped or repetitive speech', isHeading: true },
      { id: 'b1_1', text: 'Pedantic speech or unusually formal language' },
      { id: 'b1_2', text: 'Echolalia' },
      { id: 'b1_3', text: 'Jargon or gibberish' },
      { id: 'b1_4', text: 'Use of rote language' },
      { id: 'b1_5', text: 'Idiosyncratic or metaphorical language' },
      { id: 'b1_6', text: 'Pronoun reversal' },
      { id: 'b1_7', text: 'Refers to self by own name' },
      { id: 'b1_8', text: 'Preservative language' },
      { id: 'b1_9', text: 'Repetitive vocalizations' },
      { id: 'b1_heading_2', text: 'Stereotyped or repetitive motor movements', isHeading: true },
      { id: 'b1_10', text: 'Repetitive hand movements' },
      { id: 'b1_11', text: 'Stereotyped or complex whole-body movements' },
      { id: 'b1_12', text: 'Abnormalities of posture' },
      { id: 'b1_13', text: 'Intense body tensing' },
      { id: 'b1_14', text: 'Unusual facial grimacing' },
      { id: 'b1_15', text: 'Excessive teeth grinding' },
      { id: 'b1_16', text: 'Repetitively puts hands over ears' },
      { id: 'b1_17', text: 'Perseverative or repetitive action / play / behavior' },
      { id: 'b1_18', text: 'Repetitive picking' },
      { id: 'b1_heading_3', text: 'Stereotyped or repetitive use of objects', isHeading: true },
      { id: 'b1_19', text: 'Nonfunctional play with objects' },
      { id: 'b1_20', text: 'Lines up toys or objects' },
      { id: 'b1_21', text: 'Repetitively opens and closes doors' },
      { id: 'b1_22', text: 'Repetitively turns lights on and off' }
    ]
  },
  B2: {
    title: 'B2. Insistence on Sameness, Routines, and Resistance to Change',
    questions: [
      { id: 'b2_1', text: 'Adherence to routine' },
      { id: 'b2_2', text: 'Routines: specific, unusual multiple-step sequences of behavior' },
      { id: 'b2_3', text: 'Insistence on rigidly following specific routines' },
      { id: 'b2_4', text: 'Unusual routines' },
      { id: 'b2_5', text: 'Ritualized Patterns of Verbal and Nonverbal Behavior' },
      { id: 'b2_6', text: 'Repetitive questioning about a particular topic' },
      { id: 'b2_7', text: 'Verbal rituals' },
      { id: 'b2_8', text: 'Compulsions' },
      { id: 'b2_9', text: 'Excessive resistance to change' },
      { id: 'b2_10', text: 'Difficulty with transitions' },
      { id: 'b2_11', text: 'Overreaction to trivial changes' },
      { id: 'b2_12', text: 'Rigid thinking' },
      { id: 'b2_13', text: 'Inability to understand humor' },
      { id: 'b2_14', text: 'Inability to understand nonliteral aspects of speech' },
      { id: 'b2_15', text: 'Excessively rigid, inflexible, or rule-bound in behavior or thought' }
    ]
  },
  B3: {
    title: 'B3. Highly Restricted, Fixated Interests',
    questions: [
      { id: 'b3_1', text: 'Preoccupations; obsessions' },
      { id: 'b3_2', text: 'Interests that are abnormal in intensity' },
      { id: 'b3_3', text: 'Narrow range of interests' },
      { id: 'b3_4', text: 'Focused on the same few objects, topics or activities' },
      { id: 'b3_5', text: 'Preoccupation with numbers, letters, symbols' },
      { id: 'b3_6', text: 'Being overly perfectionistic' },
      { id: 'b3_7', text: 'Interests that are abnormal in focus' },
      { id: 'b3_8', text: 'Excessive focus on nonrelevant or nonfunctional parts of objects' },
      { id: 'b3_9', text: 'Preoccupations' },
      { id: 'b3_10', text: 'Attachment to unusual inanimate object' },
      { id: 'b3_11', text: 'Having to carry around or hold specific or unusual objects' },
      { id: 'b3_12', text: 'Unusual fears' }
    ]
  },
  B4: {
    title: 'B4. Hyper- or Hypo-reactivity to Sensory Input',
    questions: [
      { id: 'b4_1', text: 'High tolerance for pain' },
      { id: 'b4_2', text: 'Poking own eyes' },
      { id: 'b4_3', text: 'Preoccupation with texture or touch' },
      { id: 'b4_4', text: 'Tactile defensiveness; does not like to be touched by certain objects or textures' },
      { id: 'b4_5', text: 'Significant aversion to having hair or toenails cut, or teeth brushed' },
      { id: 'b4_6', text: 'Unusual visual exploration / activity' },
      { id: 'b4_7', text: 'Close visual inspection of objects or self for no clear purpose' },
      { id: 'b4_8', text: 'Looks at objects, people out of corner of eye' },
      { id: 'b4_9', text: 'Unusual squinting of eyes' },
      { id: 'b4_10', text: 'Extreme interest or fascination with watching movement of other things' },
      { id: 'b4_11', text: 'Odd responses to sensory input' },
      { id: 'b4_12', text: 'Atypical and/or persistent focus on sensory input' },
      { id: 'b4_13', text: 'Unusual sensory exploration with objects' },
      { id: 'b4_14', text: 'Licking or sniffing objects' }
    ]
  },
  C: {
    title: 'C. Early Onset',
    questions: [
      { id: 'c', text: 'Symptoms present early in development' }
    ]
  },
  D: {
    title: 'D. Clinical Impairment',
    questions: [
      { id: 'd', text: 'Deficits cause clinically significant impairment in social, occupational, or other important areas of current functioning' }
    ]
  }
};
