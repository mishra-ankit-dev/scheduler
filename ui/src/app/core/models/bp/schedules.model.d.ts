interface IBPSchedule {
  id: number;
  status: string;
  trigger: IBPTrigger | number;
  scheduleName: string;
  recurringType: any;
  occurOnceDateTime: any;
  recurringTime: any;
  recurringStartDate: any;
  recurringEndDate: any;
  userName: string;
}
