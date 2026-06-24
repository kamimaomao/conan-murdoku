import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../src/App';
import { cases } from '../src/data/cases';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('places, marks, and erases cells with the mobile controls', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: /毛利侦探事务所的遗失录音/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /浅井编辑/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));

    expect(screen.getByRole('button', { name: /第 4 行第 4 列.*浅井编辑/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /标记不可用/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));

    expect(screen.getByRole('button', { name: /第 4 行第 4 列.*已标记/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /擦除/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));

    expect(screen.getByRole('button', { name: /^第 4 行第 4 列$/i })).toBeInTheDocument();
  });

  it('removes a placed suspect when tapping their board cell again', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /浅井编辑/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列.*浅井编辑/i }));

    expect(screen.getByRole('button', { name: /^第 4 行第 4 列$/i })).toBeInTheDocument();
  });

  it('uses a hint to confirm the selected suspect position', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /浅井编辑/i }));
    await user.click(screen.getByRole('button', { name: /提示/i }));

    const placement = cases[0].solution.find((candidate) => candidate.suspectId === 'case01-editor');
    expect(placement).toBeDefined();
    const [row, column] = placement!.cellId.split('-').map(Number);
    expect(
      screen.getByRole('button', { name: new RegExp(`第 ${row + 1} 行第 ${column + 1} 列.*浅井编辑`, 'i') })
    ).toBeInTheDocument();
  });

  it('shows the full answer on the board', async () => {
    const user = userEvent.setup();
    const firstCase = cases[0];
    render(<App />);

    await user.click(screen.getByRole('button', { name: /答案/i }));

    for (const placement of firstCase.solution) {
      const suspect = firstCase.suspects.find((candidate) => candidate.id === placement.suspectId);
      expect(suspect).toBeDefined();

      const [row, column] = placement.cellId.split('-').map(Number);
      expect(
        screen.getByRole('button', { name: new RegExp(`第 ${row + 1} 行第 ${column + 1} 列.*${suspect!.name}`, 'i') })
      ).toBeInTheDocument();
    }

    expect(screen.getByRole('status')).toHaveTextContent(/答案已显示/i);
  });

  it('moves a placed suspect by dragging from one board cell to another', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /浅井编辑/i }));
    await user.click(screen.getByRole('button', { name: /^第 4 行第 4 列$/i }));

    const source = screen.getByRole('button', { name: /第 4 行第 4 列.*浅井编辑/i });
    const target = screen.getByRole('button', { name: /^第 1 行第 1 列$/i });

    fireEvent.pointerDown(source, { clientX: 120, clientY: 120 });
    fireEvent.pointerUp(target, { clientX: 20, clientY: 20 });

    expect(screen.getByRole('button', { name: /第 1 行第 1 列.*浅井编辑/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^第 4 行第 4 列$/i })).toBeInTheDocument();
  });

  it('renders Conan assets when available', () => {
    const { container } = render(<App />);

    expect(screen.getByAltText('Conan Murdoku')).toHaveAttribute('src', '/conan-assets/conan_logo.png');
    expect(screen.getByAltText('办公桌')).toHaveAttribute('src', '/conan-assets/obj_office_desk.png');
    expect(container.querySelector('.support-portrait')).toHaveAttribute(
      'src',
      '/conan-assets/support/edogawa-conan.png'
    );
    expect(container.querySelector('.cell-terrain-art')).not.toBeInTheDocument();
    expect(container.querySelector('.board-cell')).toHaveStyle({
      '--terrain': 'url(/conan-assets/textures/room_agency-carpet.png)'
    });
  });

  it('draws room walls only where adjacent cells belong to different rooms', () => {
    render(<App />);

    const agencyCorner = screen.getByRole('button', { name: /^第 1 行第 1 列$/i });
    const agencyNeighbor = screen.getByRole('button', { name: /^第 1 行第 2 列$/i });
    const cafeStart = screen.getByRole('button', { name: /^第 1 行第 3 列$/i });
    const cafeNeighbor = screen.getByRole('button', { name: /^第 1 行第 4 列$/i });

    expect(agencyCorner).toHaveClass('room-edge-n');
    expect(agencyCorner).toHaveClass('room-edge-w');
    expect(agencyNeighbor).toHaveClass('room-edge-e');
    expect(cafeStart).toHaveClass('room-edge-w');
    expect(cafeStart).not.toHaveClass('room-edge-e');
    expect(cafeNeighbor).not.toHaveClass('room-edge-w');
  });

  it('keeps board labels hidden until a cell is tapped', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const firstCell = screen.getByRole('button', { name: /^第 1 行第 1 列$/i });

    expect(container.querySelectorAll('.board-cell.labels-revealed')).toHaveLength(0);

    await user.click(firstCell);

    expect(firstCell).toHaveClass('labels-revealed');
    expect(container.querySelectorAll('.board-cell.labels-revealed')).toHaveLength(1);
  });

  it('reveals the object name before the room name when a tapped cell has both', async () => {
    const user = userEvent.setup();
    render(<App />);
    const objectCell = screen.getByRole('button', { name: /^第 1 行第 2 列$/i });

    await user.click(objectCell);

    expect(within(objectCell).getByText('办公桌')).toHaveClass('cell-object');
    expect(within(objectCell).queryByText('毛利侦探事务所')).not.toBeInTheDocument();
  });

  it('renders suspect portraits on the board after placement', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(screen.getByRole('button', { name: /浅井编辑/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));

    expect(container.querySelector('.cell-suspect-photo')).toHaveAttribute(
      'src',
      '/conan-assets/portraits/case-01-a.png'
    );
  });

  it('closes the case when all suspects match the solution', async () => {
    const user = userEvent.setup();
    const firstCase = cases[0];
    render(<App />);

    for (const placement of firstCase.solution) {
      const suspect = firstCase.suspects.find((candidate) => candidate.id === placement.suspectId);
      expect(suspect).toBeDefined();

      const [row, column] = placement.cellId.split('-').map(Number);
      await user.click(screen.getByRole('button', { name: new RegExp(suspect!.name, 'i') }));
      await user.click(screen.getByRole('button', { name: new RegExp(`第 ${row + 1} 行第 ${column + 1} 列`, 'i') }));
    }

    await user.click(screen.getByRole('button', { name: /结案/i }));

    const result = screen.getByRole('status');
    const murderer = firstCase.suspects.find((suspect) => suspect.id === firstCase.murdererId);
    expect(result).toHaveTextContent(/案件已结/i);
    expect(within(result).getByText(new RegExp(murderer!.name, 'i'))).toBeInTheDocument();
  });

  it('keeps a closed case closed after non-board actions and reload', async () => {
    const user = userEvent.setup();
    const firstCase = cases[0];
    const { unmount } = render(<App />);

    for (const placement of firstCase.solution) {
      const suspect = firstCase.suspects.find((candidate) => candidate.id === placement.suspectId);
      expect(suspect).toBeDefined();

      const [row, column] = placement.cellId.split('-').map(Number);
      await user.click(screen.getByRole('button', { name: new RegExp(suspect!.name, 'i') }));
      await user.click(screen.getByRole('button', { name: new RegExp(`第 ${row + 1} 行第 ${column + 1} 列`, 'i') }));
    }

    await user.click(screen.getByRole('button', { name: /结案/i }));
    await user.click(within(screen.getByRole('region', { name: '嫌疑人' })).getByRole('button', { name: /浅井编辑/i }));
    unmount();

    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent(/案件已结/i);
  });
});
