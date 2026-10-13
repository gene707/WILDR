import React, { useState, useEffect } from 'react';
import { NavigationTab, Mission, JournalEntry } from './types';
import { INITIAL_MISSIONS } from './data/initialMissions';
import { INITIAL_ENTRIES } from './data/initialEntries';
import { AppShell } from './components/layout/AppShell/AppShell';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { MissionsPage } from './pages/Missions/MissionsPage';
import { IdentifyPage } from './pages/Identify/IdentifyPage';
import { JournalPage } from './pages/Journal/JournalPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import './styles/global.css';

const STORAGE_KEYS = {
  MISSIONS: 'wildr_missions_v1',
  JOURNAL: 'wildr_journal_v1',
  TAB: 'wildr_active_tab',
  HIGH_CONTRAST: 'wildr_high_contrast',
};

const VALID_TABS: NavigationTab[] = [
  'discover',
  'missions',
  'identify',
  'journal',
  'settings',
];

export const App: React.FC = () => {
  // Determine initial tab from URL hash, localStorage, or default to 'discover'
  const getInitialTab = (): NavigationTab => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      if (VALID_TABS.includes(hash)) {
        return hash;
      }
      const saved = localStorage.getItem(STORAGE_KEYS.TAB) as NavigationTab;
      if (VALID_TABS.includes(saved)) {
        return saved;
      }
    }
    return 'discover';
  };

  const [activeTab, setActiveTab] = useState<NavigationTab>(getInitialTab);

  // Load missions from localStorage or initial
  const [missions, setMissions] = useState<Mission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MISSIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_MISSIONS;
  });

  // Load journal entries from localStorage or initial
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_ENTRIES;
  });

  // Selected mission for detail modal
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  // High contrast mode
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.HIGH_CONTRAST) === 'true';
    } catch {
      return false;
    }
  });

  // Sync tab changes with hash and storage
  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    try {
      localStorage.setItem(STORAGE_KEYS.TAB, tab);
    } catch {
      // Ignore
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash changes (back/forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist missions
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    } catch {
      // Storage quota or private mode
    }
  }, [missions]);

  // Persist journal entries
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalEntries));
    } catch {
      // Storage quota or private mode
    }
  }, [journalEntries]);

  // High contrast attribute on root element
  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.HIGH_CONTRAST, String(highContrast));
    } catch {
      // Ignore
    }
  }, [highContrast]);

  // Mission status updater
  const handleMissionStatusChange = (
    missionId: string,
    nextStatus: Mission['status']
  ) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? {
              ...m,
              status: nextStatus,
              completedAt:
                nextStatus === 'completed'
                  ? new Date().toISOString()
                  : m.completedAt,
            }
          : m
      )
    );
  };

  // Add new journal entry
  const handleAddJournalEntry = (newEntry: Omit<JournalEntry, 'id'>) => {
    const entryWithId: JournalEntry = {
      ...newEntry,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setJournalEntries((prev) => [entryWithId, ...prev]);
  };

  // Delete journal entry
  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Reset to default data
  const handleResetData = () => {
    setMissions(INITIAL_MISSIONS);
    setJournalEntries(INITIAL_ENTRIES);
    localStorage.removeItem(STORAGE_KEYS.MISSIONS);
    localStorage.removeItem(STORAGE_KEYS.JOURNAL);
  };

  // Clear journal
  const handleClearJournal = () => {
    setJournalEntries([]);
    localStorage.removeItem(STORAGE_KEYS.JOURNAL);
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={handleTabChange}>
      {activeTab === 'discover' && (
        <DiscoverPage
          onNavigate={handleTabChange}
          missions={missions}
          journalEntries={journalEntries}
          onMissionSelect={(m) => setSelectedMission(m)}
          onMissionStatusChange={handleMissionStatusChange}
        />
      )}

      {activeTab === 'missions' && (
        <MissionsPage
          missions={missions}
          onMissionStatusChange={handleMissionStatusChange}
          selectedMission={selectedMission}
          onSelectMission={setSelectedMission}
        />
      )}

      {activeTab === 'identify' && (
        <IdentifyPage
          onSaveToJournal={handleAddJournalEntry}
          onNavigateToJournal={() => handleTabChange('journal')}
        />
      )}

      {activeTab === 'journal' && (
        <JournalPage
          entries={journalEntries}
          onAddEntry={handleAddJournalEntry}
          onDeleteEntry={handleDeleteJournalEntry}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsPage
          journalEntries={journalEntries}
          missions={missions}
          onResetData={handleResetData}
          onClearJournal={handleClearJournal}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast((prev) => !prev)}
        />
      )}
    </AppShell>
  );
};

export default App;
