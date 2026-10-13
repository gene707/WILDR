import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MissionsPage } from '../pages/Missions/MissionsPage';
import { INITIAL_MISSIONS } from '../data/initialMissions';

describe('MissionsPage component', () => {
  it('renders mission cards with categories, difficulty, and duration', () => {
    const handleStatusChange = vi.fn();
    const handleSelectMission = vi.fn();

    render(
      <MissionsPage
        missions={INITIAL_MISSIONS}
        onMissionStatusChange={handleStatusChange}
        selectedMission={null}
        onSelectMission={handleSelectMission}
      />
    );

    expect(screen.getByText('Texture Hunt: Leaf Patterns')).toBeInTheDocument();
    expect(screen.getByText('Canopy Light & Dappled Shadows')).toBeInTheDocument();
    expect(screen.getByText('Pollinator Pitstop Watch')).toBeInTheDocument();
  });

  it('filters missions by category', () => {
    render(
      <MissionsPage
        missions={INITIAL_MISSIONS}
        onMissionStatusChange={vi.fn()}
        selectedMission={null}
        onSelectMission={vi.fn()}
      />
    );

    // Click 'Leaves & Botany' pill
    const plantsPill = screen.getByRole('button', { name: 'Leaves & Botany' });
    fireEvent.click(plantsPill);

    expect(screen.getByText('Texture Hunt: Leaf Patterns')).toBeInTheDocument();
    expect(screen.getByText('Tree Bark Architectures')).toBeInTheDocument();
    // Non-plants like Pollinator Pitstop Watch should not be shown
    expect(screen.queryByText('Pollinator Pitstop Watch')).not.toBeInTheDocument();
  });

  it('filters missions by search query and shows empty state when no match is found', () => {
    render(
      <MissionsPage
        missions={INITIAL_MISSIONS}
        onMissionStatusChange={vi.fn()}
        selectedMission={null}
        onSelectMission={vi.fn()}
      />
    );

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'nonexistent-nature-phenomenon-xyz' } });

    expect(screen.getByText('No outdoor missions matched your filters')).toBeInTheDocument();

    // Click Reset All Filters
    const resetBtn = screen.getByRole('button', { name: /reset all filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText('Texture Hunt: Leaf Patterns')).toBeInTheDocument();
  });

  it('triggers onMissionStatusChange when clicking status action button', () => {
    const handleStatusChange = vi.fn();

    render(
      <MissionsPage
        missions={INITIAL_MISSIONS}
        onMissionStatusChange={handleStatusChange}
        selectedMission={null}
        onSelectMission={vi.fn()}
      />
    );

    // Texture Hunt: Leaf Patterns is completed initially, so its button is 'Reset'
    const resetMissionBtn = screen.getByRole('button', {
      name: /reset mission texture hunt: leaf patterns/i,
    });
    fireEvent.click(resetMissionBtn);

    expect(handleStatusChange).toHaveBeenCalledWith('mission-leaves-textures', 'not_started');
  });

  it('opens detailed modal when mission is selected', () => {
    const handleSelectMission = vi.fn();

    render(
      <MissionsPage
        missions={INITIAL_MISSIONS}
        onMissionStatusChange={vi.fn()}
        selectedMission={INITIAL_MISSIONS[0]}
        onSelectMission={handleSelectMission}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Mission Steps')).toBeInTheDocument();
    expect(screen.getByText(/Outdoor safety:/i)).toBeInTheDocument();
  });
});
