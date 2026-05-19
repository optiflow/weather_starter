## 2024-05-19 - Optimizing Local State After Mutations
**Learning:** Refetching all entities immediately after a create operation adds unnecessary network overhead and latency. Appending the successfully created entity to the local state directly can save significant time.
**Action:** When adding or mutating data, consider optimistic UI updates or directly integrating the returned mutated entity into the local state instead of triggering a full refetch list call, unless the list state is heavily reliant on server-side ordering/filtering.
