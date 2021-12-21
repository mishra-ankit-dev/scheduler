Param
(
	[String]$serverName,
    [String]$userName,
	[String]$password,
	[String]$processName,
	[String]$inputParameters
)
$scriptBlock = {
Param
(
	[String]$serverName,
    [String]$userName,
	[String]$password,
	[String]$processName,
	[String]$inputParameters
)
	Write-Output "Inside .ps1 file"
	Write-Output $inputParameters
	Set-Location "C:\Program Files\Blue Prism Limited\Blue Prism Automate"
	Try {
		.\AutomateC /run $processName /resource $serverName /user $username $password /startp $inputParameters
	}
	Catch {
		.\AutomateC /run $processName /resource $serverName /sso /startp $inputParameters
	}
}

Invoke-Command -ComputerName $serverName -ScriptBlock $scriptBlock -ArgumentList $serverName, $username, $password, $processName, $inputParameters
