import gql from 'graphql-tag';
import { TaskType, TaskState, TaskComment } from './../models';

export const taskItemFragment = gql`
  fragment TaskItem on Task {
    id
    title
    description
    date
    type
    state
    flow
    comments
  }
`;

export class TasksListData {
  id: string;
  title: string;
  description: string;
  date: string;
  type: TaskType;
  state: TaskState;
  flow: any;
  comments: TaskComment[];
}

export const getTasksQuery = gql`
  query TasksQuery {
    allTasks {
      id
      title
      description
      type
      date
      state
      flow {
        flow {
          id
          name
        }
      }
      comments {
        comment
      }
    }
  }
`;

// TODO use taskItemFragment
// export const getTasksQuery = gql`
//   query TasksQuery {
//     allTasks {
//       id
//       state
//       flow {
//         id
//         stateMachineArn
//       }
//       comments {
//         comment
//       }
//     }
//   }

//   ${taskItemFragment}
// `;
