
Param(
[string[]]$Servers,
[string]$userName,
[string]$password
)

function Get-ComputerStats {
  param(
    [Parameter(Mandatory=$true, Position=0, 
               ValueFromPipeline=$true, ValueFromPipelineByPropertyName=$true)]
    [ValidateNotNull()]
    [string[]]$ComputerNames
  )

  process {
    $password = ConvertTo-SecureString -String $password -AsPlainText -Force
    $creds = new-object -typename System.Management.Automation.PSCredential -argumentlist $username, $password
    
    foreach ($ComputerName in $ComputerNames) {
      try {
        $cpu_utilization = Get-WmiObject win32_processor -computername $ComputerName -credential $creds -erroraction Stop  | 
                   Measure-Object -property LoadPercentage -Average | 
                   Foreach {$_.Average}
        # echo $cpu_utilization
      }

      catch {
        $cpu_utilization = Get-WmiObject win32_processor -computername $ComputerName | 
                   Measure-Object -property LoadPercentage -Average | 
                   Foreach {$_.Average}
      }

      try {
        $ram_utilization = Get-WmiObject win32_operatingsystem -ComputerName $ComputerName -credential $creds -erroraction Stop |
          Foreach {
            "{0:N2}" -f ((($_.TotalVisibleMemorySize - $_.FreePhysicalMemory)*100)/ $_.TotalVisibleMemorySize)
          }
      }

      catch {
        $ram_utilization = Get-WmiObject win32_operatingsystem -ComputerName $ComputerName |
          Foreach {
            "{0:N2}" -f ((($_.TotalVisibleMemorySize - $_.FreePhysicalMemory)*100)/ $_.TotalVisibleMemorySize)
          }
      }

      try {
        $available_disk_space = Get-WmiObject Win32_Volume -ComputerName $ComputerName -credential $creds -erroraction Stop -Filter "DriveLetter = 'C:'" |
          Foreach {
            "{0:N2}" -f (($_.FreeSpace / $_.Capacity)*100)
          }
      }

      catch {
        $available_disk_space = Get-WmiObject Win32_Volume -ComputerName $ComputerName -Filter "DriveLetter = 'C:'" |
          Foreach {
            "{0:N2}" -f (($_.FreeSpace / $_.Capacity)*100)
          }
      }

      new-object psobject -prop @{ # Work on PowerShell V2 and below
        # [pscustomobject] [ordered] @{ # Only if on PowerShell V3
        "serverName" = $ComputerName
        "cpuUtilization" = $cpu_utilization
        "ramUtilization" = $ram_utilization
        "availableDiskSpace" = $available_disk_space
      }
    }
  }
}

$Servers | Get-ComputerStats | ConvertTo-Json

# try {
#     $password = ConvertTo-SecureString -String $password -AsPlainText -Force
#     $creds = new-object -typename System.Management.Automation.PSCredential -argumentlist $username, $password
#     $Servers | Get-ComputerStats -credential $creds | ConvertTo-Json
# }
# catch {
#     $Servers | Get-ComputerStats | ConvertTo-Json
# }