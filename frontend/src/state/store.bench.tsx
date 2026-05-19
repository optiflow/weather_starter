import { act, renderHook } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import * as api from '../api';
import { StoreProvider, useStore } from './store';

vi.mock('../api', () => ({
  listLocations: vi.fn(),
  createLocation: vi.fn(),
  logInteraction: vi.fn(),
}));

describe('store create performance', () => {
  it('measures create time', async () => {
    const mockListLocations = api.listLocations as unknown as ReturnType<typeof vi.fn>;
    const mockCreateLocation = api.createLocation as unknown as ReturnType<typeof vi.fn>;

    mockListLocations.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate 100ms network latency
      return { locations: [{ id: 1, name: 'Loc1', latitude: 1, longitude: 1 }] };
    });

    mockCreateLocation.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate 50ms network latency
      return { id: 2, name: 'Loc2', latitude: 2, longitude: 2 };
    });

    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    const start = performance.now();
    await act(async () => {
      await result.current.create({ name: 'Loc2', latitude: 2, longitude: 2 });
    });
    const end = performance.now();

    console.log(`Create location took ${end - start} ms`);

    // With load() it should take ~150ms (50ms create + 100ms list)
    // Optimized it should take ~50ms
  });
});
