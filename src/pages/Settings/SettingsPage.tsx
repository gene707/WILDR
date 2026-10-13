import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader/PageHeader';
import { Button } from '../../components/common/Button/Button';
import { Badge } from '../../components/common/Badge/Badge';
import { StatusMessage } from '../../components/common/StatusMessage/StatusMessage';
import { JournalEntry, Mission } from '../../types';
import styles from './SettingsPage.module.css';

export interface SettingsPageProps {
  journalEntries: JournalEntry[];
  missions: Mission[];
  onResetData: () => void;
  onClearJournal: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  journalEntries,
  missions,
  onResetData,
  onClearJournal,
  highContrast,
  onToggleHighContrast,
}) => {
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  const handleExportJSON = () => {
    const data = {
      app: 'WILDR',
      exportDate: new Date().toISOString(),
      version: '0.1.0',
      milestone: 'Milestone 1',
      journalEntries,
      missionsSummary: {
        total: missions.length,
        completed: missions.filter((m) => m.status === 'completed').length,
        active: missions.filter((m) => m.status === 'active').length,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wildr-journal-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Journal observations exported successfully as JSON.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Settings & Offline Diagnostics"
        description="Inspect device storage, export observations, customize display accessibility, and review system architecture."
        badge={<Badge variant="primary" size="sm">Local Diagnostics</Badge>}
      />

      {exportNotice && (
        <StatusMessage type="success" onDismiss={() => setExportNotice(null)}>
          {exportNotice}
        </StatusMessage>
      )}

      <div className={styles.settingsGrid}>
        {/* Offline & Network State */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon} aria-hidden="true">📡</span>
            <div>
              <h2 className={styles.cardTitle}>Offline Status & Connectivity</h2>
              <p className={styles.cardDesc}>Zero cloud dependence by design.</p>
            </div>
          </div>

          <div className={styles.statusList}>
            <div className={styles.statusRow}>
              <span>Network State:</span>
              <Badge variant={isOnline ? 'success' : 'warning'} size="sm">
                {isOnline ? 'Online (Asset cache available)' : 'Offline (Local mode)'}
              </Badge>
            </div>
            <div className={styles.statusRow}>
              <span>Storage Driver:</span>
              <span className={styles.valueStrong}>Local State & LocalStorage</span>
            </div>
            <div className={styles.statusRow}>
              <span>IndexedDB Engine:</span>
              <span className={styles.valueStrong}>Prepared for Milestone 2</span>
            </div>
            <div className={styles.statusRow}>
              <span>Active Missions:</span>
              <span className={styles.valueStrong}>
                {missions.filter((m) => m.status === 'active').length} in progress
              </span>
            </div>
            <div className={styles.statusRow}>
              <span>Journal Entries:</span>
              <span className={styles.valueStrong}>{journalEntries.length} saved</span>
            </div>
          </div>
        </div>

        {/* Accessibility & Display Settings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon} aria-hidden="true">👁️</span>
            <div>
              <h2 className={styles.cardTitle}>Accessibility & Display</h2>
              <p className={styles.cardDesc}>Visual ergonomics for field environments.</p>
            </div>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>High Contrast Mode</span>
              <span className={styles.settingSubtext}>
                Increases text boldness and borders for outdoor sunlight readability.
              </span>
            </div>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${highContrast ? styles.toggleOn : ''}`}
              onClick={onToggleHighContrast}
              role="switch"
              aria-checked={highContrast}
              aria-label="Toggle high contrast display mode"
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        </div>

        {/* Data Management & Export */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon} aria-hidden="true">💾</span>
            <div>
              <h2 className={styles.cardTitle}>Local Data Management</h2>
              <p className={styles.cardDesc}>Your data remains entirely on your device.</p>
            </div>
          </div>

          <div className={styles.actionGroup}>
            <div className={styles.actionRow}>
              <div>
                <strong>Export Field Observations</strong>
                <p className={styles.actionSubtext}>Download your field journal records as structured JSON.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportJSON}
                disabled={journalEntries.length === 0}
              >
                Export JSON
              </Button>
            </div>

            <div className={styles.actionRow}>
              <div>
                <strong>Restore Demo Content</strong>
                <p className={styles.actionSubtext}>Reset missions and observations back to initial starter data.</p>
              </div>
              <Button variant="secondary" size="sm" onClick={onResetData}>
                Reset to Defaults
              </Button>
            </div>

            <div className={styles.actionRow}>
              <div>
                <strong className={styles.dangerText}>Clear Field Journal</strong>
                <p className={styles.actionSubtext}>Remove all journal entries from this device.</p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setResetConfirmOpen(true)}
                disabled={journalEntries.length === 0}
              >
                Clear Entries
              </Button>
            </div>
          </div>
        </div>

        {/* Architecture & Challenge Notes */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon} aria-hidden="true">🌱</span>
            <div>
              <h2 className={styles.cardTitle}>Touch Grass Challenge & Architecture</h2>
              <p className={styles.cardDesc}>DEV.to Hacktoberfest 2026 Open Source Challenge.</p>
            </div>
          </div>

          <div className={styles.archSummary}>
            <p>
              <strong>WILDR</strong> is built on an offline-first philosophy: technology should act as an invitation
              to explore the physical world, not another algorithmic screen trap.
            </p>
            <div className={styles.metaBadgeList}>
              <Badge variant="primary" size="sm">React 18</Badge>
              <Badge variant="primary" size="sm">TypeScript Strict</Badge>
              <Badge variant="primary" size="sm">Vite 6</Badge>
              <Badge variant="primary" size="sm">Vitest</Badge>
              <Badge variant="neutral" size="sm">WCAG AA Compliant</Badge>
              <Badge variant="earth" size="sm">MIT License</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Clearing Journal */}
      {resetConfirmOpen && (
        <div className={styles.dialogBackdrop} role="presentation">
          <div
            className={styles.dialog}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="clear-dialog-title"
          >
            <h3 id="clear-dialog-title" className={styles.dialogTitle}>
              Clear all journal observations?
            </h3>
            <p className={styles.dialogText}>
              This will permanently delete all {journalEntries.length} saved observations from your local storage.
              This action cannot be undone.
            </p>
            <div className={styles.dialogActions}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setResetConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  onClearJournal();
                  setResetConfirmOpen(false);
                  setExportNotice('Field journal has been cleared.');
                  setTimeout(() => setExportNotice(null), 3000);
                }}
              >
                Yes, Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
