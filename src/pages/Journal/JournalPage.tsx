import React, { useState, useMemo } from 'react';
import { JournalEntry } from '../../types';
import { PageHeader } from '../../components/common/PageHeader/PageHeader';
import { Button } from '../../components/common/Button/Button';
import { Badge } from '../../components/common/Badge/Badge';
import { FormField } from '../../components/common/FormField/FormField';
import { Input } from '../../components/common/Input/Input';
import { Textarea } from '../../components/common/Textarea/Textarea';
import { Select } from '../../components/common/Select/Select';
import { Modal } from '../../components/common/Modal/Modal';
import { EmptyState } from '../../components/common/EmptyState/EmptyState';
import styles from './JournalPage.module.css';

export interface JournalPageProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  onDeleteEntry: (id: string) => void;
}

const COMMON_HABITATS = [
  'Deciduous forest / woodland',
  'Urban park or lawn',
  'Wildflower meadow',
  'Wetland / riparian edge',
  'Backyard garden',
  'Rocky slope / boulder',
  'Roadside / trail margin',
];

export const JournalPage: React.FC<JournalPageProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
}) => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [habitat, setHabitat] = useState(COMMON_HABITATS[0]);
  const [weather, setWeather] = useState('Partly cloudy, mild');
  const [tag, setTag] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => {
      if (e.identifiedTag) set.add(e.identifiedTag);
    });
    return Array.from(set);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      if (selectedTag !== 'all' && e.identifiedTag !== selectedTag) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = e.title.toLowerCase().includes(q);
        const matchesNotes = e.notes.toLowerCase().includes(q);
        const matchesHabitat = e.habitatType?.toLowerCase().includes(q) ?? false;
        if (!matchesTitle && !matchesNotes && !matchesHabitat) {
          return false;
        }
      }
      return true;
    });
  }, [entries, selectedTag, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please provide a title for your observation.');
      return;
    }
    if (!notes.trim()) {
      setFormError('Please enter a brief note describing what you noticed.');
      return;
    }

    const now = new Date();
    onAddEntry({
      title: title.trim(),
      notes: notes.trim(),
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      habitatType: habitat,
      weatherCondition: weather,
      identifiedTag: tag.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setNotes('');
    setTag('');
    setFormError(null);
    setIsNewModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Field Journal"
        description="Document your outdoor discoveries locally. Observations are stored in your device's browser database with zero tracking."
        badge={<Badge variant="primary" size="sm">{entries.length} Observations</Badge>}
        actions={
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setFormError(null);
              setIsNewModalOpen(true);
            }}
          >
            + New Observation
          </Button>
        }
      />

      {/* Search and Filters */}
      {entries.length > 0 && (
        <section className={styles.controlsSection} aria-label="Journal Filters">
          <div className={styles.searchRow}>
            <div className={styles.searchInputWrapper}>
              <span className={styles.searchIcon} aria-hidden="true">🔍</span>
              <Input
                type="search"
                placeholder="Search observation notes, titles, or habitats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search journal observations"
                className={styles.searchInput}
              />
            </div>
            {searchQuery && (
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                Clear
              </Button>
            )}
          </div>

          {allTags.length > 0 && (
            <div className={styles.tagsFilterRow}>
              <span className={styles.tagsFilterLabel}>Filter by Specimen:</span>
              <div className={styles.tagPillList} role="toolbar" aria-label="Filter journal by tag">
                <button
                  type="button"
                  className={`${styles.tagPill} ${selectedTag === 'all' ? styles.activeTagPill : ''}`}
                  onClick={() => setSelectedTag('all')}
                  aria-pressed={selectedTag === 'all'}
                >
                  All Entries
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`${styles.tagPill} ${selectedTag === t ? styles.activeTagPill : ''}`}
                    onClick={() => setSelectedTag(t)}
                    aria-pressed={selectedTag === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Observations List */}
      <section className={styles.entriesSection} aria-label="Observations List">
        {entries.length === 0 ? (
          <EmptyState
            title="Your Field Journal is Empty"
            description="Take a moment to step outside, observe a leaf pattern, bird visitor, or tree bark, and record your very first observation!"
            action={
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsNewModalOpen(true)}
              >
                Create First Observation
              </Button>
            }
          />
        ) : filteredEntries.length === 0 ? (
          <EmptyState
            title="No observations match your search"
            description="Try clearing your search query or choosing 'All Entries' to see your journal records."
            action={
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}
              >
                Reset Search
              </Button>
            }
          />
        ) : (
          <div className={styles.entryGrid}>
            {filteredEntries.map((entry) => (
              <article
                key={entry.id}
                className={styles.entryCard}
                aria-label={`Observation: ${entry.title}`}
              >
                <div className={styles.entryHeader}>
                  <div className={styles.entryMeta}>
                    <span className={styles.dateLabel}>
                      📅 {entry.date} • {entry.time}
                    </span>
                    {entry.habitatType && (
                      <span className={styles.habitatLabel}>
                        📍 {entry.habitatType}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onDeleteEntry(entry.id)}
                    aria-label={`Delete observation ${entry.title}`}
                    title="Delete observation"
                  >
                    🗑️
                  </button>
                </div>

                <div className={styles.entryTitleRow}>
                  <h2 className={styles.entryTitle}>{entry.title}</h2>
                  {entry.identifiedTag && (
                    <Badge variant="primary" size="sm">
                      {entry.identifiedTag}
                    </Badge>
                  )}
                </div>

                {entry.photoUrl && (
                  <div className={styles.photoPreviewWrapper}>
                    <img
                      src={entry.photoUrl}
                      alt={entry.photoName || entry.title}
                      className={styles.entryPhoto}
                    />
                  </div>
                )}

                <p className={styles.entryNotes}>{entry.notes}</p>

                <div className={styles.entryFooter}>
                  {entry.weatherCondition && (
                    <span className={styles.weatherTag}>
                      🌤️ {entry.weatherCondition}
                    </span>
                  )}
                  {entry.associatedMissionTitle && (
                    <span className={styles.missionTag}>
                      🎯 Mission: {entry.associatedMissionTitle}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* New Observation Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Record New Nature Observation"
        size="md"
      >
        <form onSubmit={handleSubmit} noValidate className={styles.modalForm}>
          {formError && (
            <div className={styles.formErrorAlert} role="alert">
              {formError}
            </div>
          )}

          <FormField id="observation-title" label="Observation Title" required>
            {(props) => (
              <Input
                {...props}
                placeholder="e.g. Serrated Elm Leaf with Dewdrops"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={Boolean(formError && !title.trim())}
              />
            )}
          </FormField>

          <FormField
            id="observation-notes"
            label="Field Notes & Sensory Details"
            helperText="What did you see, hear, or feel? Describe vein shapes, colors, or insects."
            required
          >
            {(props) => (
              <Textarea
                {...props}
                rows={4}
                placeholder="Observed along the north park path..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                isInvalid={Boolean(formError && !notes.trim())}
              />
            )}
          </FormField>

          <div className={styles.formRow}>
            <FormField id="observation-habitat" label="Habitat / Location Type">
              {(props) => (
                <Select
                  {...props}
                  value={habitat}
                  onChange={(e) => setHabitat(e.target.value)}
                >
                  {COMMON_HABITATS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>

            <FormField id="observation-weather" label="Weather Conditions">
              {(props) => (
                <Input
                  {...props}
                  placeholder="e.g. Sunny, 18°C, light wind"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                />
              )}
            </FormField>
          </div>

          <FormField
            id="observation-tag"
            label="Identified Specimen / Tag (Optional)"
            helperText="Common name, family, or label"
          >
            {(props) => (
              <Input
                {...props}
                placeholder="e.g. Sugar Maple, Monarch Butterfly"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            )}
          </FormField>

          <div className={styles.modalActions}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Observation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
