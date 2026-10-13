import React from 'react';
import { NavigationTab } from '../../../types';
import { SkipLink } from '../SkipLink/SkipLink';
import { Navigation } from '../Navigation/Navigation';
import { Badge } from '../../common/Badge/Badge';
import styles from './AppShell.module.css';

export interface AppShellProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  return (
    <div className={styles.shell}>
      <SkipLink targetId="main-content" />

      {/* Top Header / App Bar */}
      <header className={styles.header} role="banner">
        <div className={styles.headerInner}>
          <div className={styles.brandRow}>
            <button
              type="button"
              className={styles.brandButton}
              onClick={() => onTabChange('discover')}
              aria-label="WILDR Home"
            >
              <span className={styles.brandLogo} aria-hidden="true">🌿</span>
              <div className={styles.brandText}>
                <span className={styles.brandName}>WILDR</span>
                <span className={styles.brandTagline}>Offline Nature Companion</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNavWrapper}>
            <Navigation activeTab={activeTab} onTabChange={onTabChange} variant="top" />
          </div>

          <div className={styles.headerStatus}>
            <Badge variant="primary" size="sm" icon={<span>📶</span>}>
              Local First
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className={styles.main} role="main" tabIndex={-1}>
        <div className={styles.container}>{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={onTabChange} variant="bottom" />

      {/* App Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.footerNote}>
            <p>
              <strong>WILDR</strong> — Built for the DEV.to <em>Touch Grass</em> challenge.
            </p>
            <p className={styles.footerSubtext}>
              Offline-first by design. All observations and local AI processing stay on your device.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <span className={styles.footerTag}>Milestone 1 Foundation</span>
            <span className={styles.dot}>•</span>
            <span className={styles.footerTag}>Zero Hosted AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
