interface IAEServer {
  serverName: string;
  aeVersion: string;
  dbServerName: string;
  dbName: string;
  serverIp: string;
  aeSiteUrl: string;
  status: boolean;
  listenerUrl: string;
  messagingUrl: string;
  createdBy: number;
  owner: number;
  lastEditedBy: number;

  aeSite: boolean;
  listener: boolean;
  messaging: boolean;
  controlTower: boolean;
  etl: boolean;

  aeFilePath: string;
  userName: string;
  password: string;
}
