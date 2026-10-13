import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { JournalPage } from '../pages/Journal/JournalPage';
import { INITIAL_ENTRIES } from '../data/initialEntries';

describe('JournalPage component', () => {
  it('renders existing journal observations', () => {
    render(
      <JournalPage
        entries={INITIAL_ENTRIES}
        onAddEntry={vi.fn()}
        onDeleteEntry={vi.fn()}
      />
    );

    expect(screen.getByText('Velvet Moss on Granite Boulder')).toBeInTheDocument();
    expect(screen.getByText('Late Season Pollinator Activity')).toBeInTheDocument();
  });

  it('renders empty state when there are no entries', () => {
    render(
      <JournalPage
        entries={[]}
        onAddEntry={vi.fn()}
        onDeleteEntry={vi.fn()}
      />
    );

    expect(screen.getByText('Your Field Journal is Empty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create first observation/i })).toBeInTheDocument();
  });

  it('opens new observation modal and validates required fields', () => {
    const handleAdd = vi.fn();

    render(
      <JournalPage
        entries={INITIAL_ENTRIES}
        onAddEntry={handleAdd}
        onDeleteEntry={vi.fn()}
      />
    );

    const newBtn = screen.getByRole('button', { name: /\+ new observation/i });
    fireEvent.click(newBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Record New Nature Observation')).toBeInTheDocument();

    // Try submitting without title
    const saveBtn = screen.getByRole('button', { name: /save observation/i });
    fireEvent.click(saveBtn);

    expect(
      screen.getByText('Please provide a title for your observation.')
    ).toBeInTheDocument();
    expect(handleAdd).not.toHaveBeenCalled();
  });

  it('submits valid new observation and triggers onAddEntry', () => {
    const handleAdd = vi.fn();

    render(
      <JournalPage
        entries={INITIAL_ENTRIES}
        onAddEntry={handleAdd}
        onDeleteEntry={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ new observation/i }));

    const titleInput = screen.getByPlaceholderText(/serrated elm leaf/i);
    const notesInput = screen.getByPlaceholderText(/observed along the north park path/i);

    fireEvent.change(titleInput, { target: { value: 'Fern spore patterns' } });
    fireEvent.change(notesInput, { target: { value: 'Sori neatly arranged on undersides.' } });

    fireEvent.click(screen.getByRole('button', { name: /save observation/i }));

    expect(handleAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Fern spore patterns',
        notes: 'Sori neatly arranged on undersides.',
      })
    );
  });

  it('triggers onDeleteEntry when clicking delete button', () => {
    const handleDelete = vi.fn();

    render(
      <JournalPage
        entries={INITIAL_ENTRIES}
        onAddEntry={vi.fn()}
        onDeleteEntry={handleDelete}
      />
    );

    const deleteBtn = screen.getByRole('button', {
      name: /delete observation velvet moss on granite boulder/i,
    });
    fireEvent.click(deleteBtn);

    expect(handleDelete).toHaveBeenCalledWith('entry-moss-granite');
  });
});
