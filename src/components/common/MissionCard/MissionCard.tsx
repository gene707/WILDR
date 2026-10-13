import React from 'react';
import { Mission } from '../../../types';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import styles from './MissionCard.module.css';

export interface MissionCardProps {
  mission: Mission;
  onSelect?: (mission: Mission) => void;
  onStatusChange?: (missionId: string, nextStatus: Mission['status']) => void;
  isDetailed?: boolean;
}

const CATEGORY_LABELS: Record<Mission['category'], string> = {
  plants: 'Leaves & Botany',
  wildlife: 'Wildlife & Insects',
  habitats: 'Habitats & Soil',
  weather: 'Weather & Sky',
  patterns: 'Patterns in Nature',
};

const CATEGORY_VARIANTS: Record<Mission['category'], 'primary' | 'earth' | 'info' | 'neutral' | 'success'> = {
  plants: 'primary',
  wildlife: 'earth',
  habitats: 'success',
  weather: 'info',
  patterns: 'neutral',
};

const DIFFICULTY_VARIANTS: Record<Mission['difficulty'], 'success' | 'warning' | 'primary'> = {
  easy: 'success',
  moderate: 'warning',
  curious: 'primary',
};

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onSelect,
  onStatusChange,
  isDetailed = false,
}) => {
  const isCompleted = mission.status === 'completed';
  const isActive = mission.status === 'active';

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <Badge variant="success" size="sm">
          ✓ Completed
        </Badge>
      );
    }
    if (isActive) {
      return (
        <Badge variant="warning" size="sm">
          ⚡ In Progress
        </Badge>
      );
    }
    return (
      <Badge variant="neutral" size="sm">
        Ready
      </Badge>
    );
  };

  const handleNextStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onStatusChange) return;

    if (mission.status === 'not_started') {
      onStatusChange(mission.id, 'active');
    } else if (mission.status === 'active') {
      onStatusChange(mission.id, 'completed');
    } else {
      onStatusChange(mission.id, 'not_started');
    }
  };

  return (
    <article
      className={`${styles.card} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect?.(mission)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(mission);
        }
      }}
      role="region"
      aria-label={`Mission: ${mission.title}`}
    >
      <div className={styles.headerRow}>
        <div className={styles.badgeGroup}>
          <Badge variant={CATEGORY_VARIANTS[mission.category]} size="sm">
            {CATEGORY_LABELS[mission.category]}
          </Badge>
          <Badge variant={DIFFICULTY_VARIANTS[mission.difficulty]} size="sm">
            {mission.difficulty.toUpperCase()}
          </Badge>
        </div>
        <div className={styles.statusBadge}>{getStatusBadge()}</div>
      </div>

      <div className={styles.titleArea}>
        <h3 className={styles.title}>{mission.title}</h3>
        <p className={styles.tagline}>{mission.tagline}</p>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon} aria-hidden="true">⏱</span>
          <span>~{mission.estimatedMinutes} min</span>
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon} aria-hidden="true">🌱</span>
          <span>Zero-screen goal</span>
        </span>
      </div>

      {isDetailed && (
        <div className={styles.detailsArea}>
          <p className={styles.description}>{mission.description}</p>

          <div className={styles.stepsSection}>
            <h4 className={styles.sectionHeading}>Mission Steps</h4>
            <ol className={styles.stepsList}>
              {mission.steps.map((step, idx) => (
                <li key={idx} className={styles.stepItem}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.safetyBox}>
            <span className={styles.safetyIcon} aria-hidden="true">🛡️</span>
            <div>
              <strong>Outdoor safety: </strong>
              <span>{mission.safetyTip}</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.footerRow}>
        <div className={styles.tagsGroup}>
          {mission.tags.map((tag) => (
            <span key={tag} className={styles.tagPill}>
              #{tag}
            </span>
          ))}
        </div>

        <div className={styles.actionButtons}>
          {onStatusChange && (
            <Button
              size="sm"
              variant={isCompleted ? 'ghost' : isActive ? 'primary' : 'secondary'}
              onClick={handleNextStatus}
              aria-label={
                isCompleted
                  ? `Reset mission ${mission.title}`
                  : isActive
                  ? `Mark ${mission.title} completed`
                  : `Start ${mission.title}`
              }
            >
              {isCompleted ? 'Reset' : isActive ? 'Complete' : 'Start'}
            </Button>
          )}

          {onSelect && !isDetailed && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(mission);
              }}
              aria-label={`View details for ${mission.title}`}
            >
              Details
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
