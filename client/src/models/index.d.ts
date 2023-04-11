import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerTrack = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Track, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Courses?: (Course | null)[] | null;
  readonly Labs?: (Course | null)[] | null;
  readonly isEnabled?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTrack = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Track, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Courses: AsyncCollection<Course>;
  readonly Labs: AsyncCollection<Course>;
  readonly isEnabled?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Track = LazyLoading extends LazyLoadingDisabled ? EagerTrack : LazyTrack

export declare const Track: (new (init: ModelInit<Track>) => Track) & {
  copyOf(source: Track, mutator: (draft: MutableModel<Track>) => MutableModel<Track> | void): Track;
}

type EagerLab = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lab, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Modules?: (Module | null)[] | null;
  readonly trackID: string;
  readonly image?: string | null;
  readonly icon?: string | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly price?: number | null;
  readonly discountPrice?: string | null;
  readonly duration?: string | null;
  readonly labUrl?: string | null;
  readonly labIamPolicy?: string | null;
  readonly labServiceRole?: string | null;
  readonly isEnabled?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLab = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lab, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Modules: AsyncCollection<Module>;
  readonly trackID: string;
  readonly image?: string | null;
  readonly icon?: string | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly price?: number | null;
  readonly discountPrice?: string | null;
  readonly duration?: string | null;
  readonly labUrl?: string | null;
  readonly labIamPolicy?: string | null;
  readonly labServiceRole?: string | null;
  readonly isEnabled?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Lab = LazyLoading extends LazyLoadingDisabled ? EagerLab : LazyLab

export declare const Lab: (new (init: ModelInit<Lab>) => Lab) & {
  copyOf(source: Lab, mutator: (draft: MutableModel<Lab>) => MutableModel<Lab> | void): Lab;
}

type EagerResource = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Resource, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly modules?: (ModuleResource | null)[] | null;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly link?: string | null;
  readonly category?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyResource = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Resource, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly modules: AsyncCollection<ModuleResource>;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly link?: string | null;
  readonly category?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Resource = LazyLoading extends LazyLoadingDisabled ? EagerResource : LazyResource

export declare const Resource: (new (init: ModelInit<Resource>) => Resource) & {
  copyOf(source: Resource, mutator: (draft: MutableModel<Resource>) => MutableModel<Resource> | void): Resource;
}

type EagerModule = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Module, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly labID: string;
  readonly courseID: string;
  readonly Resources?: (ModuleResource | null)[] | null;
  readonly heading?: string | null;
  readonly description?: string | null;
  readonly questions?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyModule = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Module, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly labID: string;
  readonly courseID: string;
  readonly Resources: AsyncCollection<ModuleResource>;
  readonly heading?: string | null;
  readonly description?: string | null;
  readonly questions?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Module = LazyLoading extends LazyLoadingDisabled ? EagerModule : LazyModule

export declare const Module: (new (init: ModelInit<Module>) => Module) & {
  copyOf(source: Module, mutator: (draft: MutableModel<Module>) => MutableModel<Module> | void): Module;
}

type EagerCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users?: (CourseUser | null)[] | null;
  readonly image?: string | null;
  readonly icon?: string | null;
  readonly name?: string | null;
  readonly descrption?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly price?: number | null;
  readonly discountPrice?: number | null;
  readonly duration?: string | null;
  readonly isEnabled?: string | null;
  readonly trackID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users: AsyncCollection<CourseUser>;
  readonly image?: string | null;
  readonly icon?: string | null;
  readonly name?: string | null;
  readonly descrption?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly price?: number | null;
  readonly discountPrice?: number | null;
  readonly duration?: string | null;
  readonly isEnabled?: string | null;
  readonly trackID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Course = LazyLoading extends LazyLoadingDisabled ? EagerCourse : LazyCourse

export declare const Course: (new (init: ModelInit<Course>) => Course) & {
  copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courses?: (CourseUser | null)[] | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly bio?: string | null;
  readonly userName?: string | null;
  readonly phone?: string | null;
  readonly country?: string | null;
  readonly referalCode?: string | null;
  readonly isActive?: string | null;
  readonly isPromotion?: string | null;
  readonly isTutor?: string | null;
  readonly isEnabled?: boolean | null;
  readonly isAdmin?: boolean | null;
  readonly areaOfInterest?: (string | null)[] | null;
  readonly profilePicture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courses: AsyncCollection<CourseUser>;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly bio?: string | null;
  readonly userName?: string | null;
  readonly phone?: string | null;
  readonly country?: string | null;
  readonly referalCode?: string | null;
  readonly isActive?: string | null;
  readonly isPromotion?: string | null;
  readonly isTutor?: string | null;
  readonly isEnabled?: boolean | null;
  readonly isAdmin?: boolean | null;
  readonly areaOfInterest?: (string | null)[] | null;
  readonly profilePicture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerModuleResource = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModuleResource, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly resourceId?: string | null;
  readonly moduleId?: string | null;
  readonly resource: Resource;
  readonly module: Module;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyModuleResource = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModuleResource, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly resourceId?: string | null;
  readonly moduleId?: string | null;
  readonly resource: AsyncItem<Resource>;
  readonly module: AsyncItem<Module>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ModuleResource = LazyLoading extends LazyLoadingDisabled ? EagerModuleResource : LazyModuleResource

export declare const ModuleResource: (new (init: ModelInit<ModuleResource>) => ModuleResource) & {
  copyOf(source: ModuleResource, mutator: (draft: MutableModel<ModuleResource>) => MutableModel<ModuleResource> | void): ModuleResource;
}

type EagerCourseUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CourseUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId?: string | null;
  readonly userId?: string | null;
  readonly course: Course;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourseUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CourseUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId?: string | null;
  readonly userId?: string | null;
  readonly course: AsyncItem<Course>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CourseUser = LazyLoading extends LazyLoadingDisabled ? EagerCourseUser : LazyCourseUser

export declare const CourseUser: (new (init: ModelInit<CourseUser>) => CourseUser) & {
  copyOf(source: CourseUser, mutator: (draft: MutableModel<CourseUser>) => MutableModel<CourseUser> | void): CourseUser;
}