import { useEffect, useMemo } from 'react';
import { useAppApi } from '@codexcrew/app-sdk';
import App from '@/App';
import { configureCrewBridge } from '@/lib/api';
import { createCrewBridge } from './bridge';
import styles from './crew.css?inline';

export default function CrewApp() {
  const client = useAppApi();
  const bridge = useMemo(() => createCrewBridge(client), [client]);
  configureCrewBridge(bridge);
  useEffect(() => () => configureCrewBridge(undefined), []);
  return <div className="expedient-crew"><style>{styles}</style><App /></div>;
}
