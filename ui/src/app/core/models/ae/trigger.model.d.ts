interface IAETrigger {
  id: number;
  triggerName: string;
  processName: string;
  profileName: string;
  processExpirationTime: number;
  processInputs: {
    name: string;
    value: string;
  }[];
  server: IAEServer | number;
}
