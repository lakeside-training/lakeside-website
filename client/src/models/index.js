// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Track, Lab, Resource, Module, Course, User, ModuleResource, CourseUser } = initSchema(schema);

export {
  Track,
  Lab,
  Resource,
  Module,
  Course,
  User,
  ModuleResource,
  CourseUser
};