import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Interfaces to define the structure of the data for type safety.
interface FeedbackEntry {
  SubmitDate: string
  SubmitDevice: string
  'Question 1': number | string // Can be a number or an empty string
  'Question 2': string
  'Question 3': number | string
  'Question 4': number | string
  'Question 5': number | string
  'Question 6': string
  'Question 7': number | string
  'Question 8': string
  'Question 9': string
  'Question 10': string
}

export interface SessionData {
  id: number
  SessionTitle: string
  Feedback: FeedbackEntry[]
}

interface CountItem {
  id: number
  title: string
}

// The output will be the same as the CountItem, but with a total property.
export interface CountResult extends CountItem {
  total: number
}

/**
 * Counts responses from a specific question for a single session based on a provided list of IDs.
 * @param session The single session data object containing a Feedback array.
 * @param countItems An array of objects with an `id` and `title` to count against.
 * @param questionKey The key of the question to count (e.g., "Question 1", "Question 3").
 * @returns A new array of CountResult objects with the `total` count for each ID.
 */
export const countResponses = (
  session: SessionData,
  countItems: CountItem[],
  questionKey: keyof FeedbackEntry
): CountResult[] => {
  // Create a map to store the counts for each ID.
  const counts = new Map<number, number>()

  // Initialize the map with zeros for each ID we want to count.
  countItems.forEach((item) => counts.set(item.id, 0))

  // Iterate through the Feedback array for the single session.
  session.Feedback.forEach((feedback) => {
    // Get the value of the specified question.
    const questionValue = feedback[questionKey]

    // Only proceed if the value is a number and is not an empty string.
    if (typeof questionValue === 'number' && !isNaN(questionValue)) {
      // Check if the value exists in our map of IDs to count.
      if (counts.has(questionValue)) {
        // Increment the count for that specific ID.
        counts.set(questionValue, counts.get(questionValue)! + 1)
      }
    }
  })

  // Map over the original countItems array to create the final output with the totals.
  return countItems.map((item) => ({
    ...item,
    total: counts.get(item.id) || 0, // Use the stored count, defaulting to 0 if not found.
  }))
}

export const rolesToCount: CountItem[] = [
  {
    id: 5,
    title: 'lecturer',
  },
  {
    id: 4,
    title: 'FAOCC',
  },
  {
    id: 3,
    title: 'adjunct',
  },
  {
    id: 2,
    title: 'administrator',
  },
  {
    id: 1,
    title: 'other',
  },
]

export const programsToCount: CountItem[] = [
  {
    id: 1,
    title: 'morning',
  },
  {
    id: 2,
    title: 'evening',
  },
]

export const agreementsToCount: CountItem[] = [
  {
    id: 5,
    title: 'strongly agree',
  },
  {
    id: 4,
    title: 'agree',
  },
  {
    id: 3,
    title: 'neutral',
  },
  {
    id: 2,
    title: 'disagree',
  },
  {
    id: 1,
    title: 'strongly disagree',
  },
]

export const colors: string[] = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
]
