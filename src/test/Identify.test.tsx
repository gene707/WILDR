import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IdentifyPage } from '../pages/Identify/IdentifyPage';

describe('IdentifyPage component', () => {
  it('displays honest architecture notice explaining Milestone 3 integration', () => {
    render(
      <IdentifyPage
        onSaveToJournal={vi.fn()}
        onNavigateToJournal={vi.fn()}
      />
    );

    expect(
      screen.getByText(/honest architecture notice: local ai engine in development/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/no cloud ai api is used, and no api keys are required/i)
    ).toBeInTheDocument();
  });

  it('renders sample specimen buttons and displays candidate predictions', () => {
    render(
      <IdentifyPage
        onSaveToJournal={vi.fn()}
        onNavigateToJournal={vi.fn()}
      />
    );

    // Initial sample is English Oak
    expect(screen.getByText(/english oak \(quercus robur\)/i)).toBeInTheDocument();

    // Switch to Honeybee
    const beeBtn = screen.getByRole('button', { name: /apis/i });
    fireEvent.click(beeBtn);

    expect(screen.getByText(/western honeybee \(apis mellifera\)/i)).toBeInTheDocument();
  });

  it('saves staged observation to Field Journal', () => {
    const handleSave = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <IdentifyPage
        onSaveToJournal={handleSave}
        onNavigateToJournal={handleNavigate}
      />
    );

    const saveBtn = screen.getByRole('button', { name: /save observation to journal/i });
    fireEvent.click(saveBtn);

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Quercus robur'),
        identifiedTag: 'English Oak Leaf',
      })
    );

    expect(screen.getByText('✓ Saved to Journal!')).toBeInTheDocument();
  });

  it('displays foraging safety warning', () => {
    render(
      <IdentifyPage
        onSaveToJournal={vi.fn()}
        onNavigateToJournal={vi.fn()}
      />
    );

    expect(screen.getByText(/never rely on ai for foraging/i)).toBeInTheDocument();
  });
});
