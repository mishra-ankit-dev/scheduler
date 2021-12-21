interface IHealthDetail {
  serverName: string;
  cpuUtilization: number;
  ramUtilization: number;
  availableDiskSpace: number;
  error?: string;
}
