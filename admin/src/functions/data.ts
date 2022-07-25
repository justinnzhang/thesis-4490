export function getPercentageOfAcceptUsers(sessions: Session[]) {
  if (percentageCalculationsGuardClause(sessions)) return 'loading...';

  const acceptedUsers = sessions.filter(
    (session) => session.first_accept === true
  );
  return ((acceptedUsers.length / sessions.length) * 100).toFixed(2);
}

export function getPercentageOfContinueUsers(sessions: Session[]) {
  if (percentageCalculationsGuardClause(sessions)) return 'loading...';

  const continueUsers = sessions.filter(
    (session) => session.continue_clicked === true
  );
  return ((continueUsers.length / sessions.length) * 100).toFixed(2);
}

export function getPercentageOfUpdatedClicked(sessions: Session[]) {
  if (percentageCalculationsGuardClause(sessions)) return 'loading...';

  const updatedUsers = sessions.filter(
    (session) => session.updated_clicked === true
  );
  return ((updatedUsers.length / sessions.length) * 100).toFixed(2);
}

export function getPercentageOfMasterSwitchDisabled(sessions: Session[]) {
  if (percentageCalculationsGuardClause(sessions)) return 'loading...';

  const numOfMasterSwitchesDisabled = sessions.filter(
    (session) => getMasterSwitchSetting(session.options_payload) === false
  );
  return ((numOfMasterSwitchesDisabled.length / sessions.length) * 100).toFixed(
    2
  );
}

function percentageCalculationsGuardClause(sessions: Session[]) {
  if (!sessions) return true;
  if (sessions.length === 0) return true;

  return false;
}

export function getMasterSwitchSetting(options_payload: any) {
  if (!options_payload) return 'loading...';

  if (!options_payload.length) return true;

  const master_switch = options_payload?.find(
    (el: any) => el.name === 'Web Advertising Setting'
  );

  return master_switch.state;
}

const test = [
  {
    name: 'Essential browser cookies',
    description:
      'These are cookies that your browser uses. This cannot be disabled.',
    state: true,
    clicks: 0,
    isRequired: true,
    touched: true,
  },
  {
    name: 'Website cookies',
    description:
      "These are essential in ensuring that you're able to use this site properly, powering many of the different features.",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
  {
    name: 'Performance logging',
    description:
      "These are essential in ensuring that you're able to use this site properly",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: false,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
  {
    name: 'Facebook Pixel',
    description:
      "Powers this website's infrastructure. This is essential in ensuring that you're able to use this site properly.",
    link: 'https://www.facebook.com/business/tools/meta-pixel',
    state: true,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
  {
    name: 'Google Analytics',
    description:
      "Provides important insights into the usage of the site, anonymously aggregated. This is essential in ensuring that you're able to use this site properly.",
    link: 'https://analytics.google.com/analytics/web/',
    state: true,
    clicks: 1,
    isRequired: false,
    touched: true,
  },
  {
    name: 'Web Advertising Setting',
    description:
      'By turning this on, your browsing or usage data will not be used. This setting overrides all other cookie settings.',
    state: true,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
  {
    name: 'Third Party Advertisers',
    description:
      "Allows this site to be used free of charge. This is essential in ensuring that you're able to use this site properly.",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
  {
    name: 'University Policies',
    description:
      "As part of a research project, you must agree to the University's policies.",
    link: "https://www.google.com/search?q=what's+a+cookie",
    state: true,
    clicks: 0,
    isRequired: false,
    touched: true,
  },
];
