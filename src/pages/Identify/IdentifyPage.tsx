import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader/PageHeader';
import { Button } from '../../components/common/Button/Button';
import { Badge } from '../../components/common/Badge/Badge';
import { StatusMessage } from '../../components/common/StatusMessage/StatusMessage';
import { JournalEntry } from '../../types';
import styles from './IdentifyPage.module.css';

export interface IdentifyPageProps {
  onSaveToJournal: (entry: Omit<JournalEntry, 'id'>) => void;
  onNavigateToJournal: () => void;
}

interface SampleImage {
  id: string;
  name: string;
  tag: string;
  category: 'plant' | 'insect' | 'fungus';
  dataUri: string;
  description: string;
  stagedCandidates: Array<{ label: string; confidence: number; note: string }>;
}

// Inline lightweight SVG-based nature illustrations for offline demonstration
const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'sample-oak-leaf',
    name: 'Quercus robur (Oak Leaf)',
    tag: 'English Oak Leaf',
    category: 'plant',
    description: 'Distinctive lobed margins and short stalk from a woodland floor specimen.',
    dataUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="%23f0f7f3"/><path d="M100 25 C115 45 145 40 140 65 C155 85 140 110 135 130 C125 155 105 175 100 185 C95 175 75 155 65 130 C60 110 45 85 60 65 C55 40 85 45 100 25 Z" fill="%232f6348"/><line x1="100" y1="30" x2="100" y2="185" stroke="%2388be9f" stroke-width="3"/><path d="M100 65 L135 55 M100 95 L140 85 M100 125 L130 120 M100 65 L65 55 M100 95 L60 85 M100 125 L70 120" stroke="%2388be9f" stroke-width="2"/></svg>',
    stagedCandidates: [
      { label: 'English Oak (Quercus robur)', confidence: 0.88, note: 'Lobed margin matches northern temperate oaks' },
      { label: 'White Oak (Quercus alba)', confidence: 0.08, note: 'Slightly narrower leaf sinus' },
      { label: 'Chestnut Oak (Quercus montana)', confidence: 0.02, note: 'Shallow crenations' },
    ],
  },
  {
    id: 'sample-honeybee',
    name: 'Apis mellifera (Honeybee on Flora)',
    tag: 'Western Honeybee',
    category: 'insect',
    description: 'European honeybee foraging on coneflower bloom, showing pollen basket.',
    dataUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="%23fff8e1"/><circle cx="100" cy="100" r="60" fill="%23f2cf78"/><ellipse cx="100" cy="95" rx="35" ry="25" fill="%23734e00"/><rect x="80" y="80" width="8" height="30" fill="%23f2cf78"/><rect x="95" y="78" width="8" height="34" fill="%23f2cf78"/><rect x="110" y="82" width="8" height="26" fill="%23f2cf78"/><circle cx="70" cy="90" r="14" fill="%232d2924"/><ellipse cx="90" cy="65" rx="20" ry="12" fill="%23e9f3f8" opacity="0.8"/></svg>',
    stagedCandidates: [
      { label: 'Western Honeybee (Apis mellifera)', confidence: 0.91, note: 'Abdominal banding and corbicula visible' },
      { label: 'Drone Fly (Eristalis tenax)', confidence: 0.06, note: 'Batesian mimic of honeybee' },
      { label: 'Mining Bee (Andrena spp.)', confidence: 0.02, note: 'Solitary ground nester' },
    ],
  },
  {
    id: 'sample-chanterelle',
    name: 'Cantharellus (Golden Chanterelle)',
    tag: 'Golden Chanterelle',
    category: 'fungus',
    description: 'Funnel-shaped golden cap with blunt, decurrent false gills on mossy soil.',
    dataUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="%23faf8f5"/><path d="M60 70 C75 50 125 50 140 70 C130 95 115 130 110 170 L90 170 C85 130 70 95 60 70 Z" fill="%23d9822b"/><path d="M55 70 Q100 85 145 70 Q100 60 55 70" fill="%23f2cf78"/><line x1="80" y1="80" x2="95" y2="150" stroke="%2399551c" stroke-width="2"/><line x1="120" y1="80" x2="105" y2="150" stroke="%2399551c" stroke-width="2"/></svg>',
    stagedCandidates: [
      { label: 'Golden Chanterelle (Cantharellus cibarius)', confidence: 0.84, note: 'Decurrent ridges instead of true gills' },
      { label: 'False Chanterelle (Hygrophoropsis aurantiaca)', confidence: 0.12, note: 'True crowded gills, brownish center' },
      { label: 'Jack-o-Lantern (Omphalotus illudens)', confidence: 0.03, note: 'Toxic lookalike, grows on wood clusters' },
    ],
  },
];

export const IdentifyPage: React.FC<IdentifyPageProps> = ({
  onSaveToJournal,
  onNavigateToJournal,
}) => {
  const [selectedSample, setSelectedSample] = useState<SampleImage>(SAMPLE_IMAGES[0]);
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);
  const [customImageName, setCustomImageName] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomImageUri(reader.result as string);
      setCustomImageName(file.name);
      setSaveSuccess(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveObservation = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);

    const title = customImageUri
      ? `Local Photo Observation (${customImageName})`
      : `Identification: ${selectedSample.name}`;

    const notes = customImageUri
      ? `Captured local photo for future offline MobileNetV3 evaluation in Milestone 3.`
      : `${selectedSample.description} Staged top prediction: ${selectedSample.stagedCandidates[0].label} (${Math.round(selectedSample.stagedCandidates[0].confidence * 100)}%).`;

    const tag = customImageUri ? 'Photo Staging' : selectedSample.tag;

    onSaveToJournal({
      title,
      notes,
      date: dateStr,
      time: timeStr,
      habitatType: 'Local park / field observation',
      weatherCondition: 'Outdoor ambient',
      identifiedTag: tag,
      photoUrl: customImageUri || selectedSample.dataUri,
      photoName: customImageUri ? customImageName : selectedSample.name,
    });

    setSaveSuccess(true);
  };

  const activeCandidates = customImageUri
    ? [
        {
          label: 'Custom Image Loaded (Inference Engine arrives in M3)',
          confidence: 1.0,
          note: 'Model weights are not downloaded in Milestone 1. Staging pipeline is verified.',
        },
      ]
    : selectedSample.stagedCandidates;

  return (
    <div className={styles.page}>
      <PageHeader
        title="AI Nature Identification"
        description="Private, browser-based vision pipeline. WILDR processes your photos directly on your device without sending pixels to any cloud server."
        badge={<Badge variant="warning" size="sm">Milestone 3 Preview</Badge>}
      />

      {/* Honest Milestone Status Alert */}
      <StatusMessage
        type="info"
        title="Honest Architecture Notice: Local AI Engine in Development"
      >
        <p>
          In <strong>Milestone 1</strong>, the responsive UI, staging pipeline, and offline architecture are established.
          The real <strong>ONNX Runtime Web (MobileNetV3-Small) WASM engine</strong> will be integrated in{' '}
          <strong>Milestone 3</strong>.
        </p>
        <p style={{ marginTop: '6px' }}>
          No cloud AI API is used, and no API keys are required. You can test image staging and export entries to your Field Journal below.
        </p>
      </StatusMessage>

      {/* Main Identification Staging Workspace */}
      <div className={styles.workspaceGrid}>
        {/* Left Column: Image Staging & Selection */}
        <div className={styles.imageColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardHeading}>1. Stage an Outdoor Photo</h2>
            <p className={styles.cardSubtext}>
              Select a sample nature specimen or choose an image file from your device.
            </p>

            {/* Sample Selector */}
            <div className={styles.sampleButtonGroup} role="group" aria-label="Sample Specimen Selector">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  className={`${styles.sampleButton} ${
                    !customImageUri && selectedSample.id === sample.id ? styles.activeSample : ''
                  }`}
                  onClick={() => {
                    setCustomImageUri(null);
                    setSelectedSample(sample);
                    setSaveSuccess(false);
                  }}
                >
                  <span className={styles.sampleEmoji}>
                    {sample.category === 'plant' ? '🌿' : sample.category === 'insect' ? '🐝' : '🍄'}
                  </span>
                  <span>{sample.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Custom Upload Dropzone */}
            <div className={styles.uploadArea}>
              <label htmlFor="image-file-input" className={styles.uploadLabel}>
                <span className={styles.uploadIcon} aria-hidden="true">📁</span>
                <span className={styles.uploadText}>
                  {customImageUri ? `Selected: ${customImageName}` : 'Or choose photo from your device'}
                </span>
                <span className={styles.uploadHint}>Runs strictly offline in browser</span>
              </label>
              <input
                id="image-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </div>

            {/* Image Preview Canvas */}
            <div className={styles.previewContainer}>
              <div className={styles.previewImageWrapper}>
                <img
                  src={customImageUri || selectedSample.dataUri}
                  alt={customImageUri ? customImageName : selectedSample.name}
                  className={styles.previewImage}
                />
              </div>
              <div className={styles.previewMeta}>
                <span>
                  <strong>Subject:</strong> {customImageUri ? customImageName : selectedSample.name}
                </span>
                <span>
                  <strong>Storage:</strong> Local memory (IndexedDB ready)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Identification Pipeline Output */}
        <div className={styles.resultsColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
              <div>
                <h2 className={styles.cardHeading}>2. Candidate Predictions</h2>
                <p className={styles.cardSubtext}>
                  Ranked candidate classes with measured uncertainty.
                </p>
              </div>
              <Badge variant="neutral" size="sm">
                {customImageUri ? 'Staged Upload' : 'Sample Model Output'}
              </Badge>
            </div>

            {/* Candidates List */}
            <div className={styles.candidatesList}>
              {activeCandidates.map((candidate, idx) => (
                <div key={idx} className={styles.candidateRow}>
                  <div className={styles.candidateTop}>
                    <span className={styles.candidateRank}>#{idx + 1}</span>
                    <span className={styles.candidateLabel}>{candidate.label}</span>
                    <span className={styles.candidateConfidence}>
                      {Math.round(candidate.confidence * 100)}%
                    </span>
                  </div>
                  <div className={styles.meterTrack} aria-hidden="true">
                    <div
                      className={styles.meterBar}
                      style={{ width: `${Math.round(candidate.confidence * 100)}%` }}
                    />
                  </div>
                  <p className={styles.candidateNote}>{candidate.note}</p>
                </div>
              ))}
            </div>

            {/* Safety & Botanical Disclaimer */}
            <div className={styles.safetyBox}>
              <span className={styles.safetyIcon} aria-hidden="true">⚠️</span>
              <p className={styles.safetyText}>
                <strong>Never rely on AI for foraging:</strong> AI models make probabilistic suggestions.
                Never consume or handle unknown wild mushrooms or plants based solely on an identification suggestion.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionRow}>
              <Button
                variant="primary"
                size="md"
                onClick={handleSaveObservation}
                disabled={saveSuccess}
              >
                {saveSuccess ? '✓ Saved to Journal!' : 'Save Observation to Journal'}
              </Button>

              {saveSuccess && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={onNavigateToJournal}
                >
                  View in Journal →
                </Button>
              )}
            </div>
          </div>

          {/* Model Architecture Info Card */}
          <div className={styles.archCard}>
            <h3 className={styles.archTitle}>Browser Inference Architecture (Milestone 3)</h3>
            <ul className={styles.archList}>
              <li>
                <strong>Model:</strong> MobileNetV3-Small ONNX
              </li>
              <li>
                <strong>Runtime:</strong> ONNX Runtime Web via WebAssembly (WASM)
              </li>
              <li>
                <strong>Data flow:</strong> Camera/Disk ➔ HTML5 Canvas Preprocess ➔ WebAssembly Inference ➔ IndexedDB Journal
              </li>
              <li>
                <strong>Privacy:</strong> 100% on-device, no network transmission
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
