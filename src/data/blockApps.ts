import type { ImageSourcePropType } from 'react-native';

export type BlockAppDef = {
  id: string;
  name: string;
  icon: ImageSourcePropType;
};

/** Icons supplied as prototype assets — replace if branding policies change. */
export const BLOCK_APPS: BlockAppDef[] = [
  { id: 'tiktok', name: 'TikTok', icon: require('../../assets/block-apps/tiktok.png') },
  { id: 'instagram', name: 'Instagram', icon: require('../../assets/block-apps/instagram.png') },
  { id: 'snapchat', name: 'Snapchat', icon: require('../../assets/block-apps/snapchat.png') },
  { id: 'messages', name: 'Messages', icon: require('../../assets/block-apps/messages.png') },
  { id: 'facetime', name: 'FaceTime', icon: require('../../assets/block-apps/facetime.png') },
  { id: 'whatsapp', name: 'WhatsApp', icon: require('../../assets/block-apps/whatsapp.png') },
  { id: 'youtube', name: 'YouTube', icon: require('../../assets/block-apps/youtube.png') },
  { id: 'spotify', name: 'Spotify', icon: require('../../assets/block-apps/spotify.png') },
  { id: 'uber', name: 'Uber', icon: require('../../assets/block-apps/uber.png') },
  { id: 'doordash', name: 'DoorDash', icon: require('../../assets/block-apps/doordash.png') },
];
