import { formatDate } from "@angular/common";
import { FormGroup } from "@angular/forms";

export function IsNullOrEmptyString(value: string): boolean {
  return value == null || value === '' || value.length === 0;
}

export function ArrayIsNotEmpty<T>(value: T[]): boolean {
  return value && value.length > 0;
}

export function ObjectHasValue(obj: any): boolean {
  return obj !== undefined && obj != null && Object.keys(obj).length > 0;
}

export function CloneObject<T>(obj: T): T {
  const objString = JSON.stringify(obj);
  return JSON.parse(objString);
}

export function ConvertObjectToString<T>(obj: T): string {
  if (ObjectHasValue(obj)) {
    return JSON.stringify(obj);
  }
  return '';
}

// export function GetFormValue(form: FormGroup, control: string) {
//   return form.get(control).value;
// }

export function CreateHiddenDownloadLink(Name: string, blob: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.download = Name;
  downloadLink.href = window.URL.createObjectURL(blob);
  const currentDate = new Date().getTime();
  const formattedDate = formatDate(currentDate, "dd/MM/yyyy", "en-US");
  const fileName = "Track-Orders_" + formattedDate + "_" + currentDate;
  downloadLink.setAttribute("download", fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}