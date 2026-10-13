import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from '../App';

describe('WILDR Application Shell and Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '';
  });

  it('renders application shell with branding and offline status', () => {
    render(<App />);

    expect(screen.getAllByText('WILDR').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Offline Nature Companion')).toBeInTheDocument();
    expect(screen.getByText('Local First')).toBeInTheDocument();
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders all five navigation destinations on screen', () => {
    render(<App />);

    // Discover, Missions, Identify, Field Journal, Settings in navigation
    const discoverButtons = screen.getAllByRole('button', { name: /discover/i });
    const missionsButtons = screen.getAllByRole('button', { name: /missions/i });
    const identifyButtons = screen.getAllByRole('button', { name: /identify/i });
    const journalButtons = screen.getAllByRole('button', { name: /field journal/i });
    const settingsButtons = screen.getAllByRole('button', { name: /settings/i });

    expect(discoverButtons.length).toBeGreaterThan(0);
    expect(missionsButtons.length).toBeGreaterThan(0);
    expect(identifyButtons.length).toBeGreaterThan(0);
    expect(journalButtons.length).toBeGreaterThan(0);
    expect(settingsButtons.length).toBeGreaterThan(0);
  });

  it('renders Discover page by default with Touch Grass challenge details', () => {
    render(<App />);

    expect(screen.getByText('Explore the Living World')).toBeInTheDocument();
    expect(screen.getByText('Put the phone away. Look up.')).toBeInTheDocument();
    expect(screen.getByText('Touch Grass Challenge')).toBeInTheDocument();
  });

  it('navigates to Missions page when clicking Missions tab', () => {
    render(<App />);

    const missionsTabs = screen.getAllByRole('button', { name: /missions/i });
    fireEvent.click(missionsTabs[0]);

    expect(screen.getByRole('heading', { level: 1, name: 'Outdoor Missions' })).toBeInTheDocument();
    expect(
      screen.getByText(/curated outdoor activities designed to cultivate attention/i)
    ).toBeInTheDocument();
  });

  it('navigates to Identify page when clicking Identify tab', () => {
    render(<App />);

    const identifyTabs = screen.getAllByRole('button', { name: /identify/i });
    fireEvent.click(identifyTabs[0]);

    expect(
      screen.getByRole('heading', { level: 1, name: 'AI Nature Identification' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/honest architecture notice: local ai engine in development/i)
    ).toBeInTheDocument();
  });

  it('navigates to Field Journal page when clicking Field Journal tab', () => {
    render(<App />);

    const journalTabs = screen.getAllByRole('button', { name: /field journal/i });
    fireEvent.click(journalTabs[0]);

    expect(screen.getByRole('heading', { level: 1, name: 'Field Journal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+ new observation/i })).toBeInTheDocument();
  });

  it('navigates to Settings page when clicking Settings tab', () => {
    render(<App />);

    const settingsTabs = screen.getAllByRole('button', { name: /settings/i });
    fireEvent.click(settingsTabs[0]);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Settings & Offline Diagnostics' })
    ).toBeInTheDocument();
    expect(screen.getByText(/zero cloud dependence by design/i)).toBeInTheDocument();
  });

  it('includes accessible landmark roles for banner, navigation, main, and contentinfo', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByRole('navigation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
