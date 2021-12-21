interface IAESchedule {
  id: number;
  status: string;
  trigger: IAETrigger | number;
  scheduleName: string;
  recurringType: any;
  occurOnceDateTime: any;
  recurringTime: any;
  recurringStartDate: any;
  recurringEndDate: any;
  userName: string;
}
