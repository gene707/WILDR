import React from 'react';
import { NavigationTab, Mission, JournalEntry } from '../../types';
import { PageHeader } from '../../components/common/PageHeader/PageHeader';
import { Button } from '../../components/common/Button/Button';
import { Badge } from '../../components/common/Badge/Badge';
import { MissionCard } from '../../components/common/MissionCard/MissionCard';
import styles from './DiscoverPage.module.css';

export interface DiscoverPageProps {
  onNavigate: (tab: NavigationTab) => void;
  missions: Mission[];
  journalEntries: JournalEntry[];
  onMissionSelect: (mission: Mission) => void;
  onMissionStatusChange: (missionId: string, status: Mission['status']) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onNavigate,
  missions,
  journalEntries,
  onMissionSelect,
  onMissionStatusChange,
}) => {
  const completedMissionsCount = missions.filter((m) => m.status === 'completed').length;
  const activeMission = missions.find((m) => m.status === 'active') || missions[0];

  return (
    <div className={styles.page}>
      <PageHeader
        title="Explore the Living World"
        description="WILDR is an offline-first companion designed to help you disconnect from endless feeds, step outside, and notice the details in nature."
        badge={<Badge variant="primary" size="sm">Touch Grass Challenge</Badge>}
      />

      {/* Hero Banner */}
      <section className={styles.heroSection} aria-label="Touch Grass Motivation">
        <div className={styles.heroContent}>
          <div className={styles.heroBadgeRow}>
            <span className={styles.natureIcon} aria-hidden="true">🌱</span>
            <span className={styles.heroSub}>Zero-Algorithm Outdoor Time</span>
          </div>
          <h2 className={styles.heroTitle}>Put the phone away. Look up.</h2>
          <p className={styles.heroText}>
            Nature doesn’t have push notifications. Whether you have 10 minutes in a pocket park,
            a community garden, or a forest trail, pick a mission, observe without rush, and record what you find.
          </p>
          <div className={styles.heroActions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('missions')}
            >
              Start an Outdoor Mission
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate('identify')}
            >
              Test AI Image Staging
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className={styles.statsCard}>
          <h3 className={styles.statsHeading}>Local Field Summary</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{completedMissionsCount} / {missions.length}</span>
              <span className={styles.statLabel}>Missions Completed</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{journalEntries.length}</span>
              <span className={styles.statLabel}>Journal Observations</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>Offline / On-Device</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className={styles.quickAccessSection} aria-label="Application Sections">
        <h2 className={styles.sectionTitle}>Where would you like to explore?</h2>
        <div className={styles.grid}>
          <div
            className={styles.featureCard}
            onClick={() => onNavigate('missions')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('missions');
              }
            }}
          >
            <div className={styles.featureIcon} aria-hidden="true">🚩</div>
            <h3 className={styles.featureTitle}>Outdoor Missions</h3>
            <p className={styles.featureText}>
              Bite-sized sensory activities focusing on leaves, bark, pollinators, and microhabitats.
            </p>
            <span className={styles.featureLink}>Browse {missions.length} Missions →</span>
          </div>

          <div
            className={styles.featureCard}
            onClick={() => onNavigate('identify')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('identify');
              }
            }}
          >
            <div className={styles.featureIcon} aria-hidden="true">📷</div>
            <h3 className={styles.featureTitle}>AI Identification</h3>
            <p className={styles.featureText}>
              Private, browser-based image analysis. Learn about the upcoming local ONNX MobileNetV3 engine.
            </p>
            <span className={styles.featureLink}>View AI Staging →</span>
          </div>

          <div
            className={styles.featureCard}
            onClick={() => onNavigate('journal')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('journal');
              }
            }}
          >
            <div className={styles.featureIcon} aria-hidden="true">📓</div>
            <h3 className={styles.featureTitle}>Field Journal</h3>
            <p className={styles.featureText}>
              Keep notes, weather observations, and photo references. Everything stays on this browser.
            </p>
            <span className={styles.featureLink}>Open Journal ({journalEntries.length}) →</span>
          </div>

          <div
            className={styles.featureCard}
            onClick={() => onNavigate('settings')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('settings');
              }
            }}
          >
            <div className={styles.featureIcon} aria-hidden="true">⚙️</div>
            <h3 className={styles.featureTitle}>Offline Settings</h3>
            <p className={styles.featureText}>
              Inspect storage usage, export observations as JSON, and review architecture details.
            </p>
            <span className={styles.featureLink}>Manage Settings →</span>
          </div>
        </div>
      </section>

      {/* Featured Mission */}
      {activeMission && (
        <section className={styles.featuredSection} aria-label="Featured Mission">
          <div className={styles.sectionHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>
                {activeMission.status === 'active' ? 'Active Mission in Progress' : 'Featured Mission of the Day'}
              </h2>
              <p className={styles.sectionSub}>Pick up where you left off or start this observation now.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('missions')}
            >
              See All Missions
            </Button>
          </div>
          <MissionCard
            mission={activeMission}
            onSelect={onMissionSelect}
            onStatusChange={onMissionStatusChange}
            isDetailed={false}
          />
        </section>
      )}

      {/* Recent Journal Teaser */}
      {journalEntries.length > 0 && (
        <section className={styles.recentSection} aria-label="Recent Journal Observations">
          <div className={styles.sectionHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Observations</h2>
              <p className={styles.sectionSub}>Your latest offline field notes.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('journal')}
            >
              View Journal
            </Button>
          </div>
          <div className={styles.journalPreviewGrid}>
            {journalEntries.slice(0, 2).map((entry) => (
              <div key={entry.id} className={styles.journalPreviewCard}>
                <div className={styles.journalMeta}>
                  <span>📅 {entry.date} at {entry.time}</span>
                  {entry.identifiedTag && <Badge variant="primary" size="sm">{entry.identifiedTag}</Badge>}
                </div>
                <h3 className={styles.journalTitle}>{entry.title}</h3>
                <p className={styles.journalNotes}>{entry.notes}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
