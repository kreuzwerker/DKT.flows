/* tslint:disable: ter-max-len */
import { Task, TaskType, TaskState } from './../models';

export let TASKS_DATA = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Task 1 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1489311005',
    type: TaskType.CORRECT,
    state: TaskState.STARTED,
    flow: { flow: {id: 'ciy0ie2q1aoul0179imlh0a73', name: 'first flow'} },
    comments: [
      { date: '1489311005', user: { id: '1', name: 'Joe Doe', pictureUrl: 'https://randomuser.me/api/portraits/thumb/men/83.jpg'}, text: 'Comment 1: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
      { date: '1491989405', user: { id: '2', name: 'Jane Mae', pictureUrl: 'https://randomuser.me/api/portraits/thumb/women/82.jpg'}, text: 'Comment 2: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
    ]
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Task 2 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1491989405',
    type: TaskType.APPROVE,
    state: TaskState.NOT_STARTED,
    flow: { flow: {id: 'ciy0ie2q1aoul0179imlh0a73', name: 'first flow'} },
    comments: []
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Task 3 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1494581405',
    type: TaskType.REVIEW,
    state: TaskState.NOT_STARTED,
    flow: { flow: {id: '080d3ee8-a303-476a-c0bf-c6cd3ce988dc', name: 'New flow'} },
    comments: []
  },
  {
    id: '4',
    title: 'Task 4',
    description: 'Task 4 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1497259805',
    type: TaskType.CORRECT,
    state: TaskState.STARTED,
    flow: { flow: {id: '080d3ee8-a303-476a-c0bf-c6cd3ce988dc', name: 'New flow'} },
    comments: []
  },
  {
    id: '5',
    title: 'Task 5',
    description: 'Task 5 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1486891805',
    type: TaskType.APPROVE,
    state: TaskState.NOT_STARTED,
    flow: { flow: {id: 'ciy0ie2q1aoul0179imlh0a73', name: 'first flow'} },
    comments: []
  },
  {
    id: '6',
    title: 'Task 6',
    description: 'Task 6 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1484213405',
    type: TaskType.CORRECT,
    state: TaskState.NOT_STARTED,
    flow: { flow: {id: '080d3ee8-a303-476a-c0bf-c6cd3ce988dc', name: 'New flow'} },
    comments: []
  },
  {
    id: '7',
    title: 'Task 7',
    description: 'Task 7 description: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    date: '1483263005',
    type: TaskType.CORRECT,
    state: TaskState.NOT_STARTED,
    flow: { flow: {id: '080d3ee8-a303-476a-c0bf-c6cd3ce988dc', name: 'New flow'} },
    comments: []
  },
];
