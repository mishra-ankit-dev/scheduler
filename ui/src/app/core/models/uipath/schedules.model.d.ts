interface IUiPathSchedule {
  id: number;
  status: string;
  trigger: IUiPathTrigger | number;
  scheduleName: string;
  recurringType: any;
  occurOnceDateTime: any;
  recurringTime: any;
  recurringStartDate: any;
  recurringEndDate: any;
  userName: string;
}
