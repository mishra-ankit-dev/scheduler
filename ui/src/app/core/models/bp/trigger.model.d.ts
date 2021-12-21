interface IBPTrigger {
  id: number;
  triggerName: string;
  processName: string;
  processType: string;
  processInputs: {
    name: string;
    value: string;
  }[];
  server: IBPServer | number;
}
