
import { printHelloWorld } from "./printHelloWorld";
import { execHogehoge } from "./execHogehoge";

export function sendForm(event:GoogleAppsScript.Events.FormsOnFormSubmit) {

  let gwsLoginEmail = event.response.getRespondentEmail();
  printHelloWorld(gwsLoginEmail);
}

export function doPost(event:GoogleAppsScript.Events.AppsScriptHttpRequestEvent){

}

export function triggerDailyHogehoge(event:GoogleAppsScript.Events.TimeDriven){
  execHogehoge(event);
}