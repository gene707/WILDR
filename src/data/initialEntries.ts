import { JournalEntry } from '../types';

export const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-moss-granite',
    title: 'Velvet Moss on Granite Boulder',
    notes: 'Found a thriving patch of cushion moss (Bryophyta) on the north face of a trailside boulder. Damp from morning dew, vivid emerald green.',
    date: '2026-10-12',
    time: '14:45',
    habitatType: 'Woodland trail',
    weatherCondition: 'Overcast, 16°C',
    associatedMissionId: 'mission-leaves-textures',
    associatedMissionTitle: 'Texture Hunt: Leaf Patterns',
    identifiedTag: 'Cushion Moss',
  },
  {
    id: 'entry-monarch-milkweed',
    title: 'Late Season Pollinator Activity',
    notes: 'Two honeybees and a painted lady butterfly foraging on purple coneflower (Echinacea) heads. The temperature was mild with very gentle breeze.',
    date: '2026-10-11',
    time: '11:15',
    habitatType: 'Community wildflower meadow',
    weatherCondition: 'Sunny with high clouds, 19°C',
    associatedMissionId: 'mission-pollinator-patrol',
    associatedMissionTitle: 'Pollinator Pitstop Watch',
    identifiedTag: 'Painted Lady Butterfly',
  }
];
