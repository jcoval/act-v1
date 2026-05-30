export const RULE_FREQUENCY = {
  W5: 13, R3: 11, W1: 10, R1: 9, P4: 8, W2: 7,
  R5: 6,  A7: 6,  P8: 5,  S3: 5, R6: 4, A1: 3,
  W3: 3,  A4: 3,  P6: 2,  S6: 2, A5: 1,
  P5: 1,  S5: 1,  P1: 1,  A6: 2, R2: 1, P9: 1,
  S2: 1,  R4: 1,  R7: 2,  S4: 2
};

export const CONFUSION_MATRIX = {
  P4: ["P5", "P8", "P1", "P2", "P3", "P7", "S1"],
  P8: ["P4", "P5", "P2", "P7", "P1"],
  P6: ["P1", "S1", "P5", "P10"],
  P5: ["P4", "P3"],
  P1: ["P5", "P4"],
  P9: ["A1"],
  R3: ["R4"],
  R6: ["R4"],
  R5: ["R2", "R4"],
  R2: ["R4"],
  R4: ["R7"],
  R1: ["R8"],
  W1: ["W5", "R8", "P10"],
  W5: ["W1", "S4", "R8"],
  W2: ["S4", "R8", "A1", "A4", "W1", "A7", "S5"],
  W3: ["W5", "W1"],
  A7: ["A8", "A1", "S6", "W1", "R8"],
  A4: ["A5", "W5", "R8"],
  A1: ["S3", "S4", "A2", "P4", "P5"],
  A5: ["A4", "R8"],
  A6: ["A5"],
  S3: ["S2", "W1", "S8", "S1", "P5", "S6"],
  S6: ["S5", "A7", "W1"],
  S4: ["S3"],
  S2: ["P4"],
  S5: ["S4", "S6"],
};

export const RULES = {
  // PUNCTUATION
  P1: {
    family: "Punctuation", name: "Series comma",
    card: "Use commas to separate three or more items in a list. Include a comma before the final 'and' or 'or'.",
    examples: [
      { wrong: "She bought apples, oranges and bananas.", right: "She bought apples, oranges, and bananas." },
      { wrong: "He is tall dark and handsome.", right: "He is tall, dark, and handsome." },
    ],
  },
  P2: {
    family: "Punctuation", name: "Comma + FANBOYS",
    card: "Use a comma before a coordinating conjunction (for, and, nor, but, or, yet, so) when it joins two independent clauses.",
    examples: [
      { wrong: "She studied hard but she still failed the test.", right: "She studied hard, but she still failed the test." },
      { wrong: "I wanted to go yet I had too much work.", right: "I wanted to go, yet I had too much work." },
    ],
  },
  P3: {
    family: "Punctuation", name: "Introductory comma",
    card: "Place a comma after an introductory clause or phrase before the main clause.",
    examples: [
      { wrong: "After the storm ended the streets were flooded.", right: "After the storm ended, the streets were flooded." },
      { wrong: "Running late for class she skipped breakfast.", right: "Running late for class, she skipped breakfast." },
    ],
  },
  P4: {
    family: "Punctuation", name: "Nonrestrictive comma",
    card: "Set off nonrestrictive (removable) phrases or appositives with commas on BOTH sides. If you can delete it and the sentence still makes sense, it needs commas.",
    examples: [
      { wrong: "My brother Marcus works at NASA.", right: "My brother, Marcus, works at NASA." },
      { wrong: "The Eiffel Tower which was built in 1889 attracts millions of visitors.", right: "The Eiffel Tower, which was built in 1889, attracts millions of visitors." },
    ],
  },
  P5: {
    family: "Punctuation", name: "Superfluous comma",
    card: "Do not insert a comma where none is needed — especially not between a subject and verb, or within a restrictive phrase.",
    examples: [
      { wrong: "The student, who sits in the front row, always answers first.", right: "The student who sits in the front row always answers first." },
      { wrong: "She, quickly finished her homework.", right: "She quickly finished her homework." },
    ],
  },
  P6: {
    family: "Punctuation", name: "Semicolon",
    card: "A semicolon joins two independent clauses without a conjunction. Both sides must be complete sentences.",
    examples: [
      { wrong: "I love hiking, it keeps me fit.", right: "I love hiking; it keeps me fit." },
      { wrong: "She was exhausted; having run ten miles.", right: "She was exhausted; she had run ten miles." },
    ],
  },
  P7: {
    family: "Punctuation", name: "Colon",
    card: "A colon follows an independent clause and introduces a list, explanation, or elaboration. The left side must be a complete sentence.",
    examples: [
      { wrong: "My favorite sports are: soccer, tennis, and swimming.", right: "I have three favorite sports: soccer, tennis, and swimming." },
      { wrong: "She had one goal, to win the championship.", right: "She had one goal: to win the championship." },
    ],
  },
  P8: {
    family: "Punctuation", name: "Dash",
    card: "Em dashes set off a parenthetical element with more emphasis than commas. Must come in pairs unless used at the end of a sentence.",
    examples: [
      { wrong: "The solution—lower taxes was proposed by the senator.", right: "The solution—lower taxes—was proposed by the senator." },
      { wrong: "He finally revealed his secret, he was the anonymous donor.", right: "He finally revealed his secret—he was the anonymous donor." },
    ],
  },
  P9: {
    family: "Punctuation", name: "Apostrophe",
    card: "Use apostrophes for contractions (it's = it is) and possessives (the dog's bone). Never use an apostrophe to form a plural. 'Its' (possessive) has no apostrophe.",
    examples: [
      { wrong: "The dog wagged it's tail.", right: "The dog wagged its tail." },
      { wrong: "The students' project's were displayed in the hall.", right: "The students' projects were displayed in the hall." },
    ],
  },
  P10: {
    family: "Punctuation", name: "End punctuation",
    card: "Choose the correct end punctuation: period for statements, question mark for questions, exclamation point for strong emphasis. Never create a fragment.",
    examples: [
      { wrong: "She asked whether the library was open.", right: "She asked whether the library was open. (statement, not a direct question)" },
      { wrong: "Running through the park at dawn.", right: "She was running through the park at dawn." },
    ],
  },
  // SENTENCE STRUCTURE
  S1: {
    family: "Sentence Structure", name: "Run-on / fused sentence",
    card: "Two independent clauses cannot be joined with no punctuation. Fix with a period, semicolon, or comma + conjunction.",
    examples: [
      { wrong: "The rain poured down we stayed inside.", right: "The rain poured down, so we stayed inside." },
      { wrong: "She loves math she plans to major in it.", right: "She loves math; she plans to major in it." },
    ],
  },
  S2: {
    family: "Sentence Structure", name: "Comma splice",
    card: "A comma alone cannot join two independent clauses. Fix with a semicolon, a period, or add a conjunction after the comma.",
    examples: [
      { wrong: "I finished the test early, I used the extra time to review.", right: "I finished the test early, so I used the extra time to review." },
      { wrong: "The film was long, it was never boring.", right: "The film was long, but it was never boring." },
    ],
  },
  S3: {
    family: "Sentence Structure", name: "Fragment",
    card: "Every sentence needs a subject and a finite verb. Participial phrases (-ing, -ed) and dependent clauses cannot stand alone.",
    examples: [
      { wrong: "Running through the halls and shouting.", right: "She was running through the halls and shouting." },
      { wrong: "Because the weather was terrible.", right: "We canceled the picnic because the weather was terrible." },
    ],
  },
  S4: {
    family: "Sentence Structure", name: "Subordinating conjunction",
    card: "Choose the conjunction that matches the logical relationship: 'although/even though' (concession), 'because/since' (cause), 'while/whereas' (contrast/simultaneous), 'if/unless' (condition).",
    examples: [
      { wrong: "Although she practiced every day, she improved rapidly.", right: "Because she practiced every day, she improved rapidly." },
      { wrong: "While I agree with your point, you are right.", right: "Although I see your point, I disagree." },
    ],
  },
  S5: {
    family: "Sentence Structure", name: "Parallel structure",
    card: "Items in a list or comparison must have the same grammatical form. If one item is a verb, all must be verbs. If one is a noun phrase, all must be noun phrases.",
    examples: [
      { wrong: "She likes hiking, to swim, and cycling.", right: "She likes hiking, swimming, and cycling." },
      { wrong: "He is talented, hardworking, and has ambition.", right: "He is talented, hardworking, and ambitious." },
    ],
  },
  S6: {
    family: "Sentence Structure", name: "Modifier placement",
    card: "A modifier must be placed directly next to what it modifies. A dangling modifier has nothing in the sentence to attach to.",
    examples: [
      { wrong: "Walking down the street, the trees were beautiful.", right: "Walking down the street, she admired the beautiful trees." },
      { wrong: "I almost drove my car to school every day.", right: "I drove my car to school almost every day." },
    ],
  },
  S7: {
    family: "Sentence Structure", name: "Faulty comparison",
    card: "Compare like things. 'The population of NYC is larger than LA' is wrong — compare populations to populations, not a population to a city.",
    examples: [
      { wrong: "The rules of chess are more complex than checkers.", right: "The rules of chess are more complex than those of checkers." },
      { wrong: "Her score was higher than any student in the class.", right: "Her score was higher than that of any other student in the class." },
    ],
  },
  S8: {
    family: "Sentence Structure", name: "Sentence combining",
    card: "When combining sentences, choose the option that is grammatically correct, logically clear, and most concise — without changing meaning.",
    examples: [
      { wrong: "The storm was severe. It was also unexpected. It caused widespread damage.", right: "The severe, unexpected storm caused widespread damage." },
      { wrong: "She is a doctor. She is also a mother. She volunteers on weekends.", right: "A doctor and mother, she also volunteers on weekends." },
    ],
  },
  // AGREEMENT
  A1: {
    family: "Agreement", name: "Subject-verb agreement (basic)",
    card: "A singular subject takes a singular verb; a plural subject takes a plural verb. Ignore prepositional phrases between subject and verb.",
    examples: [
      { wrong: "The list of items are on the counter.", right: "The list of items is on the counter." },
      { wrong: "Each of the students have a textbook.", right: "Each of the students has a textbook." },
    ],
  },
  A2: {
    family: "Agreement", name: "Subject-verb agreement (intervening phrase)",
    card: "Don't be fooled by a phrase between the subject and verb. 'The box of chocolates IS on the table' — the subject is 'box,' not 'chocolates'.",
    examples: [
      { wrong: "The quality of her paintings have improved.", right: "The quality of her paintings has improved." },
      { wrong: "The team of engineers are working on the problem.", right: "The team of engineers is working on the problem." },
    ],
  },
  A3: {
    family: "Agreement", name: "Subject-verb agreement (inverted/collective)",
    card: "In inverted sentences ('There are...'), the verb agrees with the noun that follows it. Collective nouns (team, group) take singular verbs.",
    examples: [
      { wrong: "There was many reasons to celebrate.", right: "There were many reasons to celebrate." },
      { wrong: "The committee have reached a decision.", right: "The committee has reached a decision." },
    ],
  },
  A4: {
    family: "Agreement", name: "Pronoun-antecedent agreement (number)",
    card: "A pronoun must agree in number with its antecedent. 'Each student must bring their book' is wrong — 'each' is singular, so use 'his or her' or rewrite.",
    examples: [
      { wrong: "Every athlete must submit their medical form.", right: "Every athlete must submit his or her medical form." },
      { wrong: "Neither of the candidates changed their position.", right: "Neither of the candidates changed his or her position." },
    ],
  },
  A5: {
    family: "Agreement", name: "Pronoun reference (ambiguous)",
    card: "A pronoun must clearly refer to one specific antecedent. If 'it' or 'they' could refer to multiple nouns, rewrite to eliminate ambiguity.",
    examples: [
      { wrong: "When Maria met Sofia, she was nervous.", right: "When Maria met Sofia, Maria was nervous." },
      { wrong: "The board rejected the proposal because they were unprepared.", right: "The board rejected the proposal because the members were unprepared." },
    ],
  },
  A6: {
    family: "Agreement", name: "Pronoun case (who/whom)",
    card: "Use 'who' when the pronoun is a subject (who is doing the action). Use 'whom' when it is an object. Trick: substitute 'he' → who; substitute 'him' → whom.",
    examples: [
      { wrong: "The scientist whom discovered penicillin changed medicine.", right: "The scientist who discovered penicillin changed medicine." },
      { wrong: "To who should I address the letter?", right: "To whom should I address the letter?" },
    ],
  },
  A7: {
    family: "Agreement", name: "Verb tense consistency",
    card: "Stay in the same tense throughout a passage unless there is a clear reason to shift. Don't drift from past to present without cause.",
    examples: [
      { wrong: "She walked into the room and sees the surprise party.", right: "She walked into the room and saw the surprise party." },
      { wrong: "He finished his essay and then goes to bed.", right: "He finished his essay and then went to bed." },
    ],
  },
  A8: {
    family: "Agreement", name: "Verb tense sequence (past perfect)",
    card: "Use past perfect ('had + verb') only when one past action clearly preceded another past action. Don't use it just because the sentence is in past tense.",
    examples: [
      { wrong: "By the time we arrived, the show already started.", right: "By the time we arrived, the show had already started." },
      { wrong: "She had studied French before she went to Paris.", right: "She studied French before she went to Paris. (both actions are sequential, no need for past perfect)" },
    ],
  },
  A9: {
    family: "Agreement", name: "Subjunctive mood",
    card: "Use subjunctive for hypotheticals and wishes: 'If I were you...' (not 'was'), 'The committee recommended that he be present' (not 'is').",
    examples: [
      { wrong: "If I was taller, I would play basketball.", right: "If I were taller, I would play basketball." },
      { wrong: "The doctor recommended that she takes the medication.", right: "The doctor recommended that she take the medication." },
    ],
  },
  // WORD CHOICE
  W1: {
    family: "Word Choice", name: "Conciseness",
    card: "The shortest correct answer is usually right. Eliminate redundancy (saying the same thing twice), padding, and any phrase that adds no new information.",
    examples: [
      { wrong: "Due to the fact that it was raining, we stayed inside.", right: "Because it was raining, we stayed inside." },
      { wrong: "She is a woman who is known for her kindness.", right: "She is known for her kindness." },
    ],
  },
  W2: {
    family: "Word Choice", name: "Commonly confused words",
    card: "Know these pairs: its/it's, their/there/they're, affect/effect, who/whom, then/than, fewer/less, lay/lie, eminent/imminent.",
    examples: [
      { wrong: "The storm will effect the entire coastline.", right: "The storm will affect the entire coastline." },
      { wrong: "She has less friends than she did in high school.", right: "She has fewer friends than she did in high school." },
    ],
  },
  W3: {
    family: "Word Choice", name: "Idiomatic preposition",
    card: "Some verbs and adjectives demand specific prepositions: 'interested IN,' 'responsible FOR,' 'different FROM,' 'capable OF.' Trust your ear, but learn the common ones.",
    examples: [
      { wrong: "She is very interested about marine biology.", right: "She is very interested in marine biology." },
      { wrong: "His approach is different than mine.", right: "His approach is different from mine." },
    ],
  },
  W4: {
    family: "Word Choice", name: "Adjective vs. adverb",
    card: "Adjectives modify nouns; adverbs modify verbs, adjectives, and other adverbs. 'She runs quick' is wrong — use 'quickly.' 'She is quick' is correct.",
    examples: [
      { wrong: "He spoke incredible softly.", right: "He spoke incredibly softly." },
      { wrong: "She felt badly about the mistake.", right: "She felt bad about the mistake." },
    ],
  },
  W5: {
    family: "Word Choice", name: "Diction / precision",
    card: "Choose the word that is most precise AND matches the passage's tone. Avoid words that are too informal, too vague, or have the wrong connotation for the context.",
    examples: [
      { wrong: "The scientist's findings were pretty important to the field.", right: "The scientist's findings were significant to the field." },
      { wrong: "The treaty had a big impact on relations between the two nations.", right: "The treaty had a profound impact on relations between the two nations." },
    ],
  },
  // RHETORIC
  R1: {
    family: "Rhetoric", name: "Transition (within paragraph)",
    card: "Match the transition to the logical relationship: 'however/but' (contrast), 'therefore/thus' (result), 'furthermore/in addition' (addition), 'for example' (illustration), 'in other words' (restatement).",
    examples: [
      { wrong: "She trained for months. Furthermore, she lost the race.", right: "She trained for months. However, she lost the race." },
      { wrong: "He skipped breakfast. Therefore, he had plenty of energy.", right: "He skipped breakfast. As a result, he had very little energy." },
    ],
  },
  R2: {
    family: "Rhetoric", name: "Transition (between paragraphs)",
    card: "A paragraph transition sentence must connect the content of the paragraph that just ended to the topic of the paragraph about to begin.",
    examples: [
      { wrong: "Using a vague opener like 'There are many other factors to consider' when moving from economics to culture.", right: "Use a specific bridge: 'Beyond its economic effects, the policy also reshaped cultural norms.'" },
      { wrong: "Starting a new paragraph with 'Additionally' when the new paragraph actually contrasts the previous one.", right: "Use 'In contrast' or 'However' to signal a shift in direction." },
    ],
  },
  R3: {
    family: "Rhetoric", name: "Add/delete sentence",
    card: "When asked whether to add or delete: ask (1) does this serve the stated purpose? and (2) is it relevant to the paragraph's focus? Both must be true to keep it.",
    examples: [
      { wrong: "Adding 'Einstein also enjoyed sailing' to a paragraph about his theory of relativity.", right: "Delete it — it's true but off-topic for this paragraph's focus." },
      { wrong: "Deleting the sentence 'This process reduces harmful emissions by 40%' from a paragraph arguing for the policy.", right: "Keep it — it directly supports the paragraph's argument with specific evidence." },
    ],
  },
  R4: {
    family: "Rhetoric", name: "Relevance",
    card: "A detail is relevant if it directly supports the paragraph's main idea. Even interesting or true details should be deleted if they distract from the paragraph's focus.",
    examples: [
      { wrong: "Including 'Darwin was also an avid beetle collector' in a paragraph about natural selection.", right: "Delete it — interesting, but it distracts from the paragraph's scientific argument." },
      { wrong: "Removing 'The vaccine reduced infection rates by 90%' from a paragraph about vaccine effectiveness.", right: "Keep it — it's the central evidence for the paragraph's claim." },
    ],
  },
  R5: {
    family: "Rhetoric", name: "Ordering / sentence placement",
    card: "The correct placement follows logically from the preceding sentence and leads logically into the following sentence. Look for pronoun antecedents and transitional cues.",
    examples: [
      { wrong: "Placing 'It was first used in 1928' before introducing what 'it' refers to.", right: "First introduce the subject (penicillin), then place the date sentence after." },
      { wrong: "Putting a concluding summary sentence in the middle of a paragraph.", right: "Move it to the end, where it wraps up the paragraph's argument." },
    ],
  },
  R6: {
    family: "Rhetoric", name: "Opening / closing",
    card: "An effective opening introduces the main topic of what follows. An effective closing refers back to the essay's central idea or the opening, and wraps up the argument.",
    examples: [
      { wrong: "Opening an essay about climate change with 'Throughout history, humans have faced many challenges.'", right: "Open with something specific: 'Rising sea levels now threaten 40% of the world's population.'" },
      { wrong: "Ending an essay with a new argument that wasn't discussed in the body.", right: "End by echoing the opening idea or summarizing the essay's central claim." },
    ],
  },
  R7: {
    family: "Rhetoric", name: "Writer's goal",
    card: "Read the goal statement carefully. Ask: does the passage primarily accomplish THIS specific goal? A passage can be good but still not accomplish a particular stated goal.",
    examples: [
      { wrong: "Saying a passage 'provides a step-by-step guide' when it only gives a general overview.", right: "Check whether the passage actually has numbered steps or detailed instructions — if not, the goal is not met." },
      { wrong: "Saying a passage 'argues for a position' when it presents both sides equally.", right: "A balanced passage informs; it does not argue. Match the label to what the passage actually does." },
    ],
  },
  R8: {
    family: "Rhetoric", name: "Conciseness in context",
    card: "Before deleting, ask: does removing this change the meaning or leave the sentence grammatically incomplete? If the phrase is necessary, it stays.",
    examples: [
      { wrong: "Deleting 'by the river' from 'The town founded by the river thrived for centuries' — leaving 'The town founded thrived for centuries.'", right: "Keep 'by the river' — removing it creates a grammatical error." },
      { wrong: "Keeping 'in a very real and meaningful way' when the sentence works without it.", right: "Delete the padding — the sentence is cleaner without it." },
    ],
  },
};

export const FAMILY_COLORS = {
  Punctuation: '#4fc3f7',
  'Sentence Structure': '#81c784',
  Agreement: '#ffb74d',
  'Word Choice': '#ce93d8',
  Rhetoric: '#f06292',
};
