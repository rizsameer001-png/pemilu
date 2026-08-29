export type AppTabParamList = {
  dashboard: undefined;
  constituency: { constituencyId?: string };
  voters: { boothId?: string; search?: string };
  tasks: { filter?: string };
  profile: undefined;
};

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  '(tabs)': undefined;
};
