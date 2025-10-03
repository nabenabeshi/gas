export function getFromData(event:GoogleAppsScript.Events.FormsOnFormSubmit){
  let res = event.response;
  let itemList = res.getItemResponses();
  for( const item of itemList ){
    let type = item.getItem().getType();
    let itemRet = item.getResponse();
  }
}