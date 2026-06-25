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

    expect(screen.getByRole('heading', { name: /花店清晨的未送花束/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /江户川柯南/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));

    expect(screen.getByRole('button', { name: /第 4 行第 4 列.*江户川柯南/i })).toBeInTheDocument();

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

    await user.click(screen.getByRole('button', { name: /江户川柯南/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列.*江户川柯南/i }));

    expect(screen.getByRole('button', { name: /^第 4 行第 4 列$/i })).toBeInTheDocument();
  });

  it('uses a hint to confirm the selected suspect position', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /江户川柯南/i }));
    await user.click(screen.getByRole('button', { name: /提示/i }));

    const placement = cases[0].solution.find((candidate) => candidate.suspectId === 'case-01-conan');
    expect(placement).toBeDefined();
    const [row, column] = placement!.cellId.split('-').map(Number);
    expect(
      screen.getByRole('button', { name: new RegExp(`第 ${row + 1} 行第 ${column + 1} 列.*江户川柯南`, 'i') })
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

    await user.click(screen.getByRole('button', { name: /江户川柯南/i }));
    await user.click(screen.getByRole('button', { name: /^第 4 行第 4 列$/i }));

    const source = screen.getByRole('button', { name: /第 4 行第 4 列.*江户川柯南/i });
    const target = screen.getByRole('button', { name: /^第 1 行第 1 列$/i });

    fireEvent.pointerDown(source, { clientX: 120, clientY: 120 });
    fireEvent.pointerUp(target, { clientX: 20, clientY: 20 });

    expect(screen.getByRole('button', { name: /第 1 行第 1 列.*江户川柯南/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^第 4 行第 4 列$/i })).toBeInTheDocument();
  });

  it('renders Conan assets when available', () => {
    const { container } = render(<App />);

    expect(container.querySelector('.legacy-brand-logo')).toHaveAttribute('src', '/conan-assets/conan_logo.png');
    expect(container.querySelector('.legacy-brand-logo')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByAltText('名侦探柯南')).toHaveAttribute('src', '/conan-assets/conan-header-banner.png');
    expect(container.querySelector('.scene-object')).toBeInTheDocument();
    expect(container.querySelector('svg.cell-object-art')).not.toBeInTheDocument();
    expect(container.querySelector('img.cell-object-art')).not.toBeInTheDocument();
    expect(container.querySelector('.support-portrait')).toHaveAttribute(
      'src',
      '/conan-assets/support/agasa-professor.png'
    );
    expect(container.querySelector('.cell-terrain-art')).not.toBeInTheDocument();
    expect(container.querySelector('.board-cell')).toHaveStyle({
      '--terrain': 'url(/conan-assets/textures/room_lodge-wood.svg)'
    });
  });

  it('renders scene art instead of duplicate board-cell object icons', () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll('.board-cell > svg.cell-object-art')).toHaveLength(0);
    expect(container.querySelectorAll('.scene-object').length).toBeGreaterThan(12);
    expect(container.querySelector('.scene-object[data-scene-object="bonsai"]')).toBeInTheDocument();
    expect(container.querySelector('.scene-object[data-scene-object="chair"]')).toBeInTheDocument();
    expect(screen.queryByText('足球')).not.toBeInTheDocument();
    expect(screen.queryByText('电话')).not.toBeInTheDocument();
  });

  it('does not show internal source notes in the briefing card', () => {
    render(<App />);

    expect(screen.getByText(/米花町花店清晨少了一束预约花/)).toBeInTheDocument();
    expect(screen.queryByText(/原作：/)).not.toBeInTheDocument();
    expect(screen.queryByText(/按随机抽样重制/)).not.toBeInTheDocument();
    expect(screen.queryByText(/SVG/)).not.toBeInTheDocument();
  });

  it('renders a selected medium case with SVG-only board objects and an overlaid room label layer', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(container.querySelectorAll('.case-chip')[4]);

    expect(screen.getByRole('heading', { name: /突然来客后的客厅/i })).toBeInTheDocument();
    expect(container.querySelectorAll('.board-cell')).toHaveLength(81);
    expect(container.querySelectorAll('.board-cell > svg.cell-object-art')).toHaveLength(0);
    expect(container.querySelectorAll('.scene-object')).toHaveLength(32);
    expect(container.querySelectorAll('img.cell-object-art')).toHaveLength(0);
    expect(container.querySelector('.barbershop-board-decor')).not.toBeInTheDocument();
    expect(container.querySelector('.board-svg-art .board-room-label')).not.toBeInTheDocument();
    expect([...container.querySelectorAll('.board-label-layer .board-room-label')].map((label) => label.textContent).sort()).toEqual([
      '案发单独区域',
      '主卧',
      '浴室',
      '餐厅',
      '客厅',
      '厨房',
      '客房'
    ].sort());
  });

  it('uses target-style SVG floor tokens for original terrain types', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const rectFills = () => [...container.querySelectorAll('.board-svg-art rect')].map((rect) => rect.getAttribute('fill'));

    await user.click(container.querySelectorAll('.case-chip')[8]);

    expect(rectFills()).toContain('url(#murdoku-floor-water-blue)');
    expect(rectFills()).toContain('url(#murdoku-floor-path-purple)');
    expect(rectFills()).toContain('url(#murdoku-floor-grass-green)');

    await user.click(container.querySelectorAll('.case-chip')[9]);

    expect(rectFills()).toContain('url(#murdoku-floor-sand-yellow)');
    expect(rectFills()).toContain('url(#murdoku-floor-water-blue)');
    expect(rectFills()).toContain('url(#murdoku-floor-path-purple)');
  });

  it('renders Surprise Visitors with a separate scene layer for carpets and room props', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(container.querySelectorAll('.case-chip')[4]);

    expect(screen.getByRole('heading', { name: /突然来客后的客厅/i })).toBeInTheDocument();
    expect(container.querySelectorAll('.scene-floor-overlay.scene-carpet')).toHaveLength(16);
    expect(container.querySelectorAll('.scene-object')).toHaveLength(32);
    expect(container.querySelector('.scene-object[data-scene-object="tv"]')).toBeInTheDocument();
    expect(container.querySelector('.scene-object[data-scene-object="bed"]')).toBeInTheDocument();
    expect(container.querySelector('.scene-object[data-scene-object="shelf"]')).toBeInTheDocument();
  });

  it('draws room walls only where adjacent cells belong to different rooms', () => {
    render(<App />);

    const corner = screen.getByRole('button', { name: /^第 1 行第 1 列$/i });
    const finalRoom = screen.getByRole('button', { name: /^第 1 行第 2 列$/i });
    const beachCell = screen.getByRole('button', { name: /^第 1 行第 3 列$/i });
    const towerCell = screen.getByRole('button', { name: /^第 1 行第 5 列$/i });

    expect(corner).toHaveClass('room-edge-n');
    expect(corner).toHaveClass('room-edge-w');
    expect(corner).toHaveClass('room-edge-e');
    expect(finalRoom).toHaveClass('room-edge-w');
    expect(finalRoom).toHaveClass('room-edge-e');
    expect(beachCell).not.toHaveClass('room-edge-e');
    expect(towerCell).toHaveClass('room-edge-w');
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

  it('keeps logic object labels out of scene-layer board cells', async () => {
    const user = userEvent.setup();
    render(<App />);
    const objectCell = screen.getByRole('button', { name: /^第 1 行第 2 列$/i });

    await user.click(objectCell);

    expect(within(objectCell).queryByText('盆景')).not.toBeInTheDocument();
    expect(within(objectCell).getByText('案发单独区域')).toHaveClass('cell-room');
  });

  it('renders suspect portraits on the board after placement', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(screen.getByRole('button', { name: /江户川柯南/i }));
    await user.click(screen.getByRole('button', { name: /第 4 行第 4 列/i }));

    expect(container.querySelector('.cell-suspect-photo')).toHaveAttribute(
      'src',
      '/conan-assets/portraits/cast-edogawa-conan.png'
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
    expect(result).toHaveTextContent(/犯人是/i);
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
    await user.click(within(screen.getByRole('region', { name: '嫌疑人' })).getByRole('button', { name: /江户川柯南/i }));
    unmount();

    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent(/案件已结/i);
  });
});
