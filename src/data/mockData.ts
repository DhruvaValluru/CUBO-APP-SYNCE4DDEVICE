import type { ShowcaseVehicle } from '../components/ShowcaseVehicleCard';
import type { Driver, Vehicle } from '../types/app';

export const drivers: Driver[] = [
  {
    id: 'dimitra',
    name: 'Dimitra',
    relation: 'Driver',
    initials: 'DI',
    avatarColor: '#5AC8FA',
    skinTone: '#E8C4A8',
    shirtColor: '#5AC8FA',
    location: 'Austin, TX',
    alertsThisWeek: 0,
  },
  {
    id: 'pablo',
    name: 'Pablo',
    relation: 'Fleet Owner',
    initials: 'PA',
    avatarColor: '#B8A6D9',
    skinTone: '#C9B098',
    shirtColor: '#B8A6D9',
    location: 'Austin, TX',
    alertsThisWeek: 3,
  },
  {
    id: 'tatiana',
    name: 'Tatiana',
    relation: 'Driver',
    initials: 'TA',
    avatarColor: '#66D9A8',
    skinTone: '#F0C9B2',
    shirtColor: '#66D9A8',
    location: 'Austin, TX',
    alertsThisWeek: 1,
  },
  {
    id: 'alejandro',
    name: 'Alejandro',
    relation: 'Driver',
    initials: 'AL',
    avatarColor: '#AF92E8',
    skinTone: '#D4A574',
    shirtColor: '#AF92E8',
    location: 'Austin, TX',
    alertsThisWeek: 2,
  },
  {
    id: 'ketav',
    name: 'Ketav',
    relation: 'Primary Driver',
    initials: 'KE',
    avatarColor: '#5CB88A',
    skinTone: '#E8C4A8',
    shirtColor: '#5CB88A',
    location: 'Raleigh, NC',
    alertsThisWeek: 1,
  },
  {
    id: 'dad',
    name: 'Dad',
    relation: 'Family Driver',
    initials: 'DA',
    avatarColor: '#7AB8D4',
    skinTone: '#D4A574',
    shirtColor: '#7AB8D4',
    location: 'Durham, NC',
    alertsThisWeek: 0,
  },
  {
    id: 'mom',
    name: 'Mom',
    relation: 'Family Driver',
    initials: 'MO',
    avatarColor: '#8BE5B0',
    skinTone: '#F0C9B2',
    shirtColor: '#8BE5B0',
    location: 'Cary, NC',
    alertsThisWeek: 2,
  },
];

export const vehicles: Vehicle[] = [
  {
    id: 'toyota-prius',
    name: 'Toyota Prius',
    model: 'Toyota Prius',
    driverId: 'pablo',
    status: 'Ready',
    cabinLabel: 'Front camera calibrated',
    plate: 'CUB-001',
    accent: '#56C24D',
    safetyScore: 94,
    focusScore: 96,
    lastEvent: 'No distraction events in last 3 drives',
  },
  {
    id: 'toyota-sienna-pablo',
    name: 'Toyota Sienna',
    model: 'Toyota Sienna',
    driverId: 'pablo',
    status: 'Live',
    cabinLabel: 'Camera online and tracking',
    plate: 'CUB-002',
    accent: '#C9A227',
    safetyScore: 82,
    focusScore: 78,
    lastEvent: 'Mid risk window Tue 4:20 PM',
  },
  {
    id: 'tesla-model-y',
    name: 'City Commuter',
    model: 'Tesla Model Y',
    driverId: 'ketav',
    status: 'Ready',
    cabinLabel: 'Front camera calibrated',
    plate: 'CUB-101',
    accent: '#56C24D',
    safetyScore: 94,
    focusScore: 96,
    lastEvent: 'No distraction events in last 3 drives',
  },
  {
    id: 'honda-accord',
    name: 'Daily Sedan',
    model: 'Honda Accord',
    driverId: 'dad',
    status: 'Monitoring Off',
    cabinLabel: 'Waiting for session start',
    plate: 'CUB-204',
    accent: '#7AB8D4',
    safetyScore: 91,
    focusScore: 89,
    lastEvent: '1 glance-away alert cleared in 0.8s',
  },
  {
    id: 'toyota-sienna-family',
    name: 'Family Shuttle',
    model: 'Toyota Sienna',
    driverId: 'mom',
    status: 'Live',
    cabinLabel: 'Camera online and tracking',
    plate: 'CUB-315',
    accent: '#8BE5B0',
    safetyScore: 88,
    focusScore: 92,
    lastEvent: 'Live monitoring active 2m ago',
  },
];

/** Pablo’s Vehicles section — links to `vehicles` ids */
export const pabloShowcaseVehicles: Array<ShowcaseVehicle & { linkedVehicleId: string }> = [
  {
    id: 'prius',
    model: 'Toyota Prius',
    time: '6:09 PM',
    risk: 'low',
    stars: 5,
    tileColor: '#56C24D',
    carKey: 'prius',
    linkedVehicleId: 'toyota-prius',
  },
  {
    id: 'sienna',
    model: 'Toyota Sienna',
    time: '4:20 PM',
    risk: 'mid',
    stars: 2.5,
    tileColor: '#C9A227',
    carKey: 'sienna',
    linkedVehicleId: 'toyota-sienna-pablo',
  },
];

/** Other Drivers list — order matches reference */
export const otherDriversList: { driverId: string; vehicleLabel: string }[] = [
  { driverId: 'dimitra', vehicleLabel: 'Toyota Sienna' },
  { driverId: 'pablo', vehicleLabel: 'Toyota Prius' },
  { driverId: 'tatiana', vehicleLabel: 'Toyota Sienna' },
  { driverId: 'alejandro', vehicleLabel: 'Toyota Prius' },
];

/** Vehicle id used for MediaPipe / live session per driver */
export const primaryVehicleIdByDriver: Record<string, string> = {
  dimitra: 'toyota-sienna-family',
  pablo: 'toyota-prius',
  tatiana: 'toyota-sienna-pablo',
  alejandro: 'toyota-prius',
  ketav: 'tesla-model-y',
  dad: 'honda-accord',
  mom: 'toyota-sienna-family',
};

export const driverReportSnapshots: Record<
  string,
  { score: number; weeklyTrips: number; distractionSeconds: number[]; phoneEvents: number }
> = {
  dimitra: { score: 88, weeklyTrips: 12, distractionSeconds: [2, 5, 3, 8, 4, 6], phoneEvents: 2 },
  pablo: { score: 85, weeklyTrips: 18, distractionSeconds: [3, 6, 4, 7, 5], phoneEvents: 4 },
  tatiana: { score: 91, weeklyTrips: 9, distractionSeconds: [2, 3, 2, 4], phoneEvents: 1 },
  alejandro: { score: 79, weeklyTrips: 14, distractionSeconds: [6, 8, 7, 9, 5], phoneEvents: 6 },
  ketav: { score: 94, weeklyTrips: 22, distractionSeconds: [1, 2, 1, 3], phoneEvents: 0 },
  dad: { score: 90, weeklyTrips: 8, distractionSeconds: [2, 4, 3], phoneEvents: 1 },
  mom: { score: 87, weeklyTrips: 15, distractionSeconds: [4, 5, 6, 4], phoneEvents: 3 },
};

export const dashboardMetrics = [
  { label: 'Fleet Focus', value: '93%', tone: 'primary' },
  { label: 'Live Sessions', value: '02', tone: 'success' },
  { label: 'Alerts Today', value: '04', tone: 'warning' },
];

export const profileSettings = [
  { label: 'Smart notifications', description: 'Push urgent distraction events to owner', enabled: true },
  { label: 'Driver summaries', description: 'Send end-of-trip attention reports', enabled: true },
  { label: 'Camera permissions', description: 'Ready for real-time cabin monitoring', enabled: true },
  { label: 'Edge processing mode', description: 'Optimized for on-device inference later', enabled: false },
];

export const trendsMock = [
  { label: 'Distractions Per # Min', value: '19', trend: 'down' as const, tone: 'good' as const },
  { label: 'Phone Use', value: '6', trend: 'up' as const, tone: 'bad' as const },
  { label: 'Concentration', value: '94%', trend: 'up' as const, tone: 'good' as const },
];

export const goalsMock = ['Minimize Phone Distractions', 'Keep Attention on the Highway'];

/** Insurance tab — charts & copy */
export const insuranceMonthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
export const monthlyPremiumUsd = [142, 136, 131, 126, 122, 118, 114];
export const bundledSafetyIndex = [68, 70, 73, 76, 79, 82, 85];
export const projectedRenewalPremium = [118, 116, 115, 114, 113, 112, 111];

export const getDriverById = (driverId: string) => drivers.find((driver) => driver.id === driverId);

export const getVehicleById = (vehicleId: string) => vehicles.find((vehicle) => vehicle.id === vehicleId);

export const getPrimaryVehicleIdForDriver = (driverId: string) =>
  primaryVehicleIdByDriver[driverId] ?? vehicles[0]?.id ?? 'toyota-prius';
