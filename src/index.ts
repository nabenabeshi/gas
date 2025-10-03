
import { printHelloWorld } from "./printHelloWorld"

export function sendForm(event:GoogleAppsScript.Events.FormsOnFormSubmit) {

  let gwsLoginEmail = event.response.getRespondentEmail();
  printHelloWorld(gwsLoginEmail);
}

export function doPost(event:GoogleAppsScript.Events.AppsScriptHttpRequestEvent){

}