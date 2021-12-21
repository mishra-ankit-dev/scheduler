interface IUiPathServer {
  serverName: string;
  version: string;
  dbServerName: string;
  dbName: string;
  serverIp: string;
  loginUrl: string;
  releasesUrl: string;
  startJobUrl: string;
  getJobsUrl: string;

  status: boolean;
  createdBy: number;
  owner: number;
  lastEditedBy: number;
  lastRestartTime: string;
  createdAt: string;

  uiPathFilePath: string;
  userName: string;
  password: string;

  orchUserName: string;
  orchPassword: string;

  dbUserName: string;
  dbPassword: string;
}
