## 2024-05-16 - Memoizing Context Values
**Learning:** Context Providers that pass an inline object or function as their `value` will cause all consuming components to re-render whenever the Provider re-renders, even if the underlying data has not changed.
**Action:** Always wrap context values in `useMemo` and inline functions in `useCallback` when defining a Context Provider to prevent widespread unnecessary re-renders across the application.
