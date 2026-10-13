import { Mission } from '../types';

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mission-leaves-textures',
    title: 'Texture Hunt: Leaf Patterns',
    tagline: 'Find 3 distinct leaf textures without picking them from branches.',
    description:
      'Leaves have evolved thousands of surface structures—from waxy waterproof cuticles to velvet hairs and serrated edges. Find three fallen leaves with noticeably different textures, sketch or observe their vein architecture.',
    category: 'plants',
    difficulty: 'easy',
    estimatedMinutes: 15,
    status: 'completed',
    completedAt: '2026-10-12T14:30:00Z',
    steps: [
      'Locate a shady patch beneath trees or garden shrubs.',
      'Search the ground for freshly fallen leaves (avoid damaging live plants).',
      'Compare one waxy, smooth leaf with one rough, ribbed, or fuzzy leaf.',
      'Hold the leaf up toward the sky to inspect the branching vein network.'
    ],
    safetyTip: 'Avoid touching leaves with three pointed leaflets and glossy oily surfaces (poison ivy/oak). Never pull leaves from living stems.',
    tags: ['botany', 'leaves', 'touch-grass', 'textures']
  },
  {
    id: 'mission-canopy-light',
    title: 'Canopy Light & Dappled Shadows',
    tagline: 'Observe how the upper tree canopy creates microclimates beneath.',
    description:
      'Step under a mature tree canopy. Notice the immediate drop in wind and temperature. Look up at the "crown shyness" gaps between adjacent tree crowns and observe how light filters through.',
    category: 'habitats',
    difficulty: 'easy',
    estimatedMinutes: 10,
    status: 'active',
    steps: [
      'Find a mature oak, maple, pine, or neighborhood grove.',
      'Stand still for 2 minutes and feel the temperature and breeze difference.',
      'Look straight up to see if neighbouring crowns avoid touching.',
      'Note any birds or pollinators moving within the canopy layers.'
    ],
    safetyTip: 'Watch your footing on exposed roots and mossy tree bases.',
    tags: ['canopy', 'microclimate', 'trees', 'sensory']
  },
  {
    id: 'mission-pollinator-patrol',
    title: 'Pollinator Pitstop Watch',
    tagline: 'Spend 10 silent minutes beside a flowering patch or shrub.',
    description:
      'Pollinators are the quiet architects of biodiversity. Focus on a single cluster of flowers and document how many different insects visit within a 10-minute window.',
    category: 'wildlife',
    difficulty: 'moderate',
    estimatedMinutes: 15,
    status: 'not_started',
    steps: [
      'Choose a sunny patch of flowering perennials, clover, or wild blossoms.',
      'Step back 2-3 paces so you do not cast a shadow over the blooms.',
      'Count distinct visitors: bumblebees, honeybees, solitary wasps, hoverflies, or butterflies.',
      'Notice whether they prefer certain colors or flower shapes.'
    ],
    safetyTip: 'Keep a calm, respectful distance. Stinging insects are peaceful when undisturbed.',
    tags: ['insects', 'pollinators', 'biodiversity']
  },
  {
    id: 'mission-bark-architectures',
    title: 'Tree Bark Architectures',
    tagline: 'Spot furrowed, peeling, smooth, and plate-like tree barks.',
    description:
      'A tree’s bark is its armor and ecosystem. Look for lichen colonies, moss carpets, and sap scars across different mature trunks.',
    category: 'plants',
    difficulty: 'easy',
    estimatedMinutes: 20,
    status: 'not_started',
    steps: [
      'Identify three different tree species in your immediate walk.',
      'Touch the bark gently to feel furrow depth, corkiness, or papery peeling.',
      'Look for epiphytes (mosses, foliose or crustose lichens) growing on the north-facing side.',
      'Record your impressions in the Field Journal.'
    ],
    safetyTip: 'Avoid disturbing bird nests or hollow cavities in old trees.',
    tags: ['trees', 'bark', 'lichens', 'tactile']
  },
  {
    id: 'mission-cloud-sky-drift',
    title: 'Cloud Layer Mapping',
    tagline: 'Read the atmospheric signs: cumulus, cirrus, or stratus formations.',
    description:
      'Lie back or sit on a park bench and watch the sky for 10 minutes. Distinguish high wispy ice clouds from low moisture rolls, and determine wind direction aloft.',
    category: 'weather',
    difficulty: 'easy',
    estimatedMinutes: 10,
    status: 'not_started',
    steps: [
      'Find an open vantage point with an unobstructed view of the horizon.',
      'Observe cloud speed relative to a fixed rooftop or tree crown.',
      'Estimate whether cloud altitude is high (cirrus), mid (altocumulus), or low (cumulus).',
      'Record temperature and humidity sensations.'
    ],
    safetyTip: 'Never look directly at the sun while scanning cloud formations.',
    tags: ['sky', 'weather', 'clouds', 'mindfulness']
  },
  {
    id: 'mission-micro-habitat-stones',
    title: 'The World Beneath a Stone',
    tagline: 'Briefly peek under a log or stone and replace it exactly as found.',
    description:
      'Dark, damp micro-habitats house isopods (woodlice), earthworms, beetles, and fungal mycelium networks that break down organic matter.',
    category: 'habitats',
    difficulty: 'curious',
    estimatedMinutes: 15,
    status: 'not_started',
    steps: [
      'Find a loose flat stone or small branch sitting on damp soil.',
      'Carefully roll it toward you (so any startled critter moves away from you).',
      'Observe the scurrying life for no more than 30 seconds.',
      'Gently lower the stone back into its exact original position to protect their home.'
    ],
    safetyTip: 'Always lift toward yourself to prevent surprises. Be gentle to prevent crushing tiny critters.',
    tags: ['soil', 'invertebrates', 'decomposers', 'micro-habitat']
  }
];
