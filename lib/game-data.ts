export interface QuizQuestion {
  id: string
  category: "Grammar" | "Vocabulary" | "Culture" | "Idioms" | "Listening" | "Reading"
  question: string
  options: string[]
  answer: string
  explanation: string
}

export interface TranslationPhrase {
  id: string
  sentence: string
  expected: string[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    category: "Vocabulary",
    question: "What's the opposite of 'cheap'?",
    options: ["Expensive", "Rich", "Big", "Heavy"],
    answer: "Expensive",
    explanation: "'Cheap' means low-priced; the opposite is 'expensive'.",
  },
  {
    id: "2",
    category: "Grammar",
    question: "Which sentence is correct?",
    options: ["She don't like coffee", "She does not like coffee", "She not like coffee", "She does not likes coffee"],
    answer: "She does not like coffee",
    explanation: 'With the third person singular in negative form, we use "does not" + base verb.',
  },
  {
    id: "3",
    category: "Culture",
    question: "What is the most famous clock in London?",
    options: ["Tower Clock", "Big Ben", "London Clock", "Elizabeth Tower"],
    answer: "Big Ben",
    explanation: "Big Ben is the iconic clock tower in the Palace of Westminster.",
  },
  {
    id: "4",
    category: "Idioms",
    question: 'What does "to break the ice" mean?',
    options: ["To literally break ice", "To start a conversation", "To be angry", "To cry"],
    answer: "To start a conversation",
    explanation: '"Break the ice" means to initiate conversation in a social situation.',
  },
  {
    id: "5",
    category: "Reading",
    question: 'In the sentence "She quickly ran to the store", what is "quickly"?',
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    answer: "Adverb",
    explanation: '"Quickly" describes how the action is done, making it an adverb.',
  },
  {
    id: "6",
    category: "Listening",
    question: 'Choose the correct pronunciation of "schedule"',
    options: ["SKED-jool", "SHED-jool", "Both are correct", "None of these"],
    answer: "Both are correct",
    explanation: "Both American (SKED-jool) and British (SHED-jool) pronunciations are accepted.",
  },
]

export const translationPhrases: TranslationPhrase[] = [
  {
    id: "1",
    sentence: "She went to the market yesterday.",
    expected: ["Ela foi ao mercado ontem.", "Ela foi para o mercado ontem."],
  },
  {
    id: "2",
    sentence: "I have been studying English for five years.",
    expected: ["Estou estudando inglês há cinco anos.", "Tenho estudado inglês por cinco anos."],
  },
  {
    id: "3",
    sentence: "Could you help me with my homework?",
    expected: ["Você pode me ajudar com meu dever de casa?", "Poderia me ajudar com meu dever?"],
  },
  {
    id: "4",
    sentence: "The weather is beautiful today.",
    expected: ["O tempo está lindo hoje.", "O clima está bonito hoje."],
  },
  {
    id: "5",
    sentence: "I would like to visit London someday.",
    expected: ["Gostaria de visitar Londres em algum dia.", "Eu gostaria de visitar Londres algum dia."],
  },
]
