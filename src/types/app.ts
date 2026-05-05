export type MonitoringStatus = 'Monitoring Off' | 'Ready' | 'Live';

export type Driver = {
  id: string;
  name: string;
  relation: string;
  initials: string;
  avatarColor: string;
  /** Flat illustration colors */
  skinTone: string;
  shirtColor: string;
  location: string;
  alertsThisWeek: number;
};

export type Vehicle = {
  id: string;
  name: string;
  model: string;
  driverId: string;
  status: MonitoringStatus;
  cabinLabel: string;
  plate: string;
  accent: string;
  safetyScore: number;
  focusScore: number;
  lastEvent: string;
};

export type HeadDirection = 'Forward' | 'Left' | 'Right';
