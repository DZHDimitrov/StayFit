import {
  ITask,
  ITaskDisplay,
} from '../interfaces/dashboard/dashboard-task.interface';

export const decorateTask = (task: ITask): ITaskDisplay => {
  let buttonText = '';
  let icon = '';
  let path:any = undefined;
  let action:any = undefined;

  switch (task.name.toLowerCase()) {
    case 'дневник':
      buttonText = 'Създай';
      icon = 'text_snippet';
      action = 'createDiary';
      break;
    case 'напомняне':
      const currentYear = new Date().getFullYear().toString();
      const month = pad((new Date().getMonth() + 1).toString());

      buttonText = 'Обнови';
      icon = 'edit_note';
      path = ['/pages','diary',currentYear.toString(),month.toString(),'overview'].join('/');

      break;
  }

  return {
    ...task,
    buttonText,
    icon,
    path,
    action,
  };
};

function pad(text) {
    text = text.toString();
    return text.length == 1 ? '0' + text : text
}
