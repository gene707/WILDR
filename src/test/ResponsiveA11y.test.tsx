import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../components/common/Button/Button';
import { FormField } from '../components/common/FormField/FormField';
import { Input } from '../components/common/Input/Input';
import { StatusMessage } from '../components/common/StatusMessage/StatusMessage';
import { LoadingState } from '../components/common/LoadingState/LoadingState';
import { SettingsPage } from '../pages/Settings/SettingsPage';
import { INITIAL_MISSIONS } from '../data/initialMissions';
import { INITIAL_ENTRIES } from '../data/initialEntries';

describe('Accessibility, High Contrast, and Reusable UI Components', () => {
  it('renders accessible Button with aria-busy and disabled states when loading', () => {
    render(
      <Button isLoading loadingText="Saving Observation...">
        Save
      </Button>
    );

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Saving Observation...')).toBeInTheDocument();
  });

  it('links FormField label, input, and error with aria attributes', () => {
    render(
      <FormField
        id="test-field"
        label="Specimen Name"
        error="Name is required"
        required
      >
        {(props) => <Input {...props} />}
      </FormField>
    );

    const input = screen.getByLabelText(/specimen name/i);
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'test-field-error');

    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toHaveTextContent('Name is required');
  });

  it('renders StatusMessage with appropriate role (alert for error, status for info)', () => {
    const { rerender } = render(
      <StatusMessage type="info" title="Offline Note">
        Data is stored locally.
      </StatusMessage>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(
      <StatusMessage type="error" title="Storage Quota">
        Low disk space.
      </StatusMessage>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders LoadingState with accessible announcements and skeleton variant', () => {
    const { rerender } = render(<LoadingState label="Preparing local model..." />);
    expect(screen.getByRole('status')).toHaveTextContent('Preparing local model...');

    rerender(<LoadingState variant="skeleton" count={2} label="Loading cards" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('toggles High Contrast Mode in SettingsPage', () => {
    const handleToggle = vi.fn();

    render(
      <SettingsPage
        journalEntries={INITIAL_ENTRIES}
        missions={INITIAL_MISSIONS}
        onResetData={vi.fn()}
        onClearJournal={vi.fn()}
        highContrast={false}
        onToggleHighContrast={handleToggle}
      />
    );

    const toggle = screen.getByRole('switch', { name: /toggle high contrast/i });
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(toggle);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
