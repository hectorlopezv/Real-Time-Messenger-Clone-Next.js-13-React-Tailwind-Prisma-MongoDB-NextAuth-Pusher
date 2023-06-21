import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (member: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  add: (member) => set((state) => ({ members: [...state.members, member] })),
  remove: (id) =>
    set((state) => ({ members: state.members.filter((m) => m !== id) })),
  set: (ids) => set({ members: ids }),
}));
export default useActiveList;
