import { FlowData } from '../models';

export const testUtils = {
  createFlowData: (id: number = 1): FlowData => {
    return   {
      'id': '1',
      'name': 'First flow',
      'description': 'This is a mocked flow object.'
    };
  }
};
