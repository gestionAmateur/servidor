import { exampleJob } from './exampleJob';
import { updateAllHistorialRangos } from './updateAllHistorialRangos';

export const startAllJobs = () => {
  exampleJob();
  updateAllHistorialRangos();
};
