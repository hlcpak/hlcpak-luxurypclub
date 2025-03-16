
export type OrderFilterState = {
  status: 'pending' | 'confirmed' | 'cancelled' | 'all';
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
};
