import { ImageSourcePropType } from 'react-native';

/** Real CUBO hardware photography (bundled in assets/cubo). */
export const cuboImages = {
  /** Transparent cut-out on a light tile */
  device: require('../../assets/cubo/cubo-device.png') as ImageSourcePropType,
  mountRear: require('../../assets/cubo/cubo-mount-rear.jpg') as ImageSourcePropType,
  mountSide: require('../../assets/cubo/cubo-mount-side.jpg') as ImageSourcePropType,
};

export const cuboGallery: { key: string; title: string; caption: string; source: ImageSourcePropType }[] = [
  { key: 'device', title: 'CUBO unit', caption: 'Driver-facing camera + on-board controls', source: cuboImages.device },
  { key: 'rear', title: 'Stand mount', caption: 'Tilts to frame the driver', source: cuboImages.mountRear },
  { key: 'side', title: 'Adjustable height', caption: 'Telescoping pole, weighted base', source: cuboImages.mountSide },
];

/** Mock pairing state for the connected unit (matches the Toyota Prius in mockData). */
export const cuboDevice = {
  name: 'CUBO',
  serial: 'CUBO-0417',
  pairedVehicleId: 'toyota-prius',
  pairedVehicleLabel: 'Toyota Prius',
  connection: 'Connected' as const,
  firmware: 'v1.4.2',
  lastSync: '2 min ago',
  stats: [
    { label: 'Camera', value: '30 fps' },
    { label: 'Drives', value: '18' },
    { label: 'Uptime', value: '99.2%' },
  ],
};

/** Capabilities grounded in the CUBO detector project (MediaPipe Face Mesh + YOLOv8). */
export const cuboCapabilities = [
  { label: 'Head turns' },
  { label: 'Phone use' },
  { label: 'Looking down' },
  { label: 'Eyes off road' },
];

export const cuboDeviceSettings = [
  { key: 'audio', label: 'Audio alerts', description: 'Chime when attention leaves the road', enabled: true },
  { key: 'autostart', label: 'Auto-start monitoring', description: 'Begin a session when the car moves', enabled: true },
  { key: 'summaries', label: 'Trip summaries', description: 'Sync a report after every drive', enabled: true },
  { key: 'night', label: 'Low-light boost', description: 'Brighten the feed for night driving', enabled: false },
];
