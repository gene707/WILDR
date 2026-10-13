export type NavigationTab =
  | 'discover'
  | 'missions'
  | 'identify'
  | 'journal'
  | 'settings';

export type MissionCategory =
  | 'plants'
  | 'wildlife'
  | 'habitats'
  | 'weather'
  | 'patterns';

export type MissionDifficulty = 'easy' | 'moderate' | 'curious';

export type MissionStatus = 'not_started' | 'active' | 'completed';

export interface Mission {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  estimatedMinutes: number;
  season?: string;
  status: MissionStatus;
  steps: string[];
  safetyTip: string;
  tags: string[];
  completedAt?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  notes: string;
  date: string;
  time: string;
  habitatType?: string;
  weatherCondition?: string;
  associatedMissionId?: string;
  associatedMissionTitle?: string;
  identifiedTag?: string;
  photoUrl?: string;
  photoName?: string;
}

export interface IdentificationCandidate {
  label: string;
  scientificName?: string;
  confidence: number;
  category: 'plant' | 'insect' | 'bird' | 'fungus' | 'other';
  description?: string;
}

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
}
