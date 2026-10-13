import React, { useState, useMemo } from 'react';
import { Mission, MissionCategory, MissionStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader/PageHeader';
import { MissionCard } from '../../components/common/MissionCard/MissionCard';
import { Button } from '../../components/common/Button/Button';
import { EmptyState } from '../../components/common/EmptyState/EmptyState';
import { Modal } from '../../components/common/Modal/Modal';
import { Badge } from '../../components/common/Badge/Badge';
import { Input } from '../../components/common/Input/Input';
import styles from './MissionsPage.module.css';

export interface MissionsPageProps {
  missions: Mission[];
  onMissionStatusChange: (missionId: string, nextStatus: MissionStatus) => void;
  selectedMission: Mission | null;
  onSelectMission: (mission: Mission | null) => void;
}

type CategoryFilter = 'all' | MissionCategory;
type StatusFilter = 'all' | MissionStatus;

export const MissionsPage: React.FC<MissionsPageProps> = ({
  missions,
  onMissionStatusChange,
  selectedMission,
  onSelectMission,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      // Category filter
      if (categoryFilter !== 'all' && m.category !== categoryFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && m.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = m.title.toLowerCase().includes(query);
        const matchesDesc = m.description.toLowerCase().includes(query);
        const matchesTags = m.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [missions, categoryFilter, statusFilter, searchQuery]);

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Outdoor Missions"
        description="Curated outdoor activities designed to cultivate attention, sensory awareness, and botanical curiosity. No GPS required."
        badge={
          <Badge variant="primary" size="sm">
            {missions.filter((m) => m.status === 'completed').length} / {missions.length} Done
          </Badge>
        }
      />

      {/* Filter and Search Bar */}
      <section className={styles.controlsSection} aria-label="Mission Filters">
        <div className={styles.searchRow}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">🔍</span>
            <Input
              type="search"
              placeholder="Search by leaf, bark, pollinator, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search missions by keyword"
              className={styles.searchInput}
            />
          </div>

          {searchQuery && (
            <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
              Clear
            </Button>
          )}
        </div>

        {/* Category Pills */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category:</span>
          <div className={styles.pillList} role="toolbar" aria-label="Filter missions by category">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'plants', label: 'Leaves & Botany' },
              { id: 'wildlife', label: 'Insects & Wildlife' },
              { id: 'habitats', label: 'Habitats & Soil' },
              { id: 'weather', label: 'Weather & Sky' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.filterPill} ${categoryFilter === cat.id ? styles.activePill : ''}`}
                onClick={() => setCategoryFilter(cat.id as CategoryFilter)}
                aria-pressed={categoryFilter === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Pills */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Status:</span>
          <div className={styles.pillList} role="toolbar" aria-label="Filter missions by progress status">
            {[
              { id: 'all', label: 'All' },
              { id: 'not_started', label: 'Ready' },
              { id: 'active', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                className={`${styles.filterPill} ${statusFilter === st.id ? styles.activePill : ''}`}
                onClick={() => setStatusFilter(st.id as StatusFilter)}
                aria-pressed={statusFilter === st.id}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className={styles.gridSection} aria-label="Missions List">
        {filteredMissions.length === 0 ? (
          <EmptyState
            title="No outdoor missions matched your filters"
            description="Try selecting a different category or clearing your search term to see more outdoor activities."
            action={
              <Button variant="primary" size="md" onClick={handleResetFilters}>
                Reset All Filters
              </Button>
            }
          />
        ) : (
          <div className={styles.missionsGrid}>
            {filteredMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onSelect={(m) => onSelectMission(m)}
                onStatusChange={onMissionStatusChange}
              />
            ))}
          </div>
        )}
      </section>

      {/* Selected Mission Modal */}
      {selectedMission && (
        <Modal
          isOpen={Boolean(selectedMission)}
          onClose={() => onSelectMission(null)}
          title={selectedMission.title}
          size="lg"
          footer={
            <div className={styles.modalFooterContent}>
              <Button
                variant={
                  selectedMission.status === 'completed'
                    ? 'secondary'
                    : selectedMission.status === 'active'
                    ? 'primary'
                    : 'primary'
                }
                onClick={() => {
                  const next =
                    selectedMission.status === 'not_started'
                      ? 'active'
                      : selectedMission.status === 'active'
                      ? 'completed'
                      : 'not_started';
                  onMissionStatusChange(selectedMission.id, next);
                  // Update selectedMission reference in state
                  onSelectMission({ ...selectedMission, status: next });
                }}
              >
                {selectedMission.status === 'not_started'
                  ? 'Start This Mission'
                  : selectedMission.status === 'active'
                  ? 'Mark as Completed'
                  : 'Restart Mission'}
              </Button>
              <Button variant="outline" onClick={() => onSelectMission(null)}>
                Close
              </Button>
            </div>
          }
        >
          <MissionCard
            mission={selectedMission}
            isDetailed={true}
            onStatusChange={onMissionStatusChange}
          />
        </Modal>
      )}
    </div>
  );
};
