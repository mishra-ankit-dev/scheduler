interface IUiPathTrigger {
  id: number;
  releaseKey: string;
  triggerName: string;
  tenancyName: string;
  processName: string;
  processInputs: {
    name: string;
    value: string;
  }[];
  server: IUiPathServer | number;
}
