interface IBPServer {
  serverName: string;
  dbServerName: string;
  dbName: string;
  serverIp: string;
  version: string;

  status: boolean;
  createdBy: number;
  owner: number;
  lastEditedBy: number;
  lastRestartTime: string;
  createdAt: string;

  userName: string;
  password: string;

  orchUserName: string;
  orchPassword: string;

  dbUserName: string;
  dbPassword: string;

  bpFilePath: string;
}
