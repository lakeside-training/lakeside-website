/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrack = /* GraphQL */ `
  query GetTrack($id: ID!) {
    getTrack(id: $id) {
      id
      name
      Courses {
        nextToken
        startedAt
      }
      Labs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTracks = /* GraphQL */ `
  query ListTracks(
    $filter: ModelTrackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTracks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTracks = /* GraphQL */ `
  query SyncTracks(
    $filter: ModelTrackFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTracks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLab = /* GraphQL */ `
  query GetLab($id: ID!) {
    getLab(id: $id) {
      id
      Modules {
        nextToken
        startedAt
      }
      trackID
      image
      icon
      name
      description
      tags
      price
      discountPrice
      duration
      labUrl
      labIamPolicy
      labServiceRole
      isEnabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listLabs = /* GraphQL */ `
  query ListLabs(
    $filter: ModelLabFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        trackID
        image
        icon
        name
        description
        tags
        price
        discountPrice
        duration
        labUrl
        labIamPolicy
        labServiceRole
        isEnabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLabs = /* GraphQL */ `
  query SyncLabs(
    $filter: ModelLabFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        trackID
        image
        icon
        name
        description
        tags
        price
        discountPrice
        duration
        labUrl
        labIamPolicy
        labServiceRole
        isEnabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const labsByTrackID = /* GraphQL */ `
  query LabsByTrackID(
    $trackID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLabFilterInput
    $limit: Int
    $nextToken: String
  ) {
    labsByTrackID(
      trackID: $trackID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackID
        image
        icon
        name
        description
        tags
        price
        discountPrice
        duration
        labUrl
        labIamPolicy
        labServiceRole
        isEnabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
      id
      modules {
        nextToken
        startedAt
      }
      name
      image
      link
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listResources = /* GraphQL */ `
  query ListResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        link
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncResources = /* GraphQL */ `
  query SyncResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncResources(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        image
        link
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getModule = /* GraphQL */ `
  query GetModule($id: ID!) {
    getModule(id: $id) {
      id
      labID
      courseID
      Resources {
        nextToken
        startedAt
      }
      heading
      description
      questions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listModules = /* GraphQL */ `
  query ListModules(
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncModules = /* GraphQL */ `
  query SyncModules(
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncModules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const modulesByLabID = /* GraphQL */ `
  query ModulesByLabID(
    $labID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    modulesByLabID(
      labID: $labID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const modulesByCourseID = /* GraphQL */ `
  query ModulesByCourseID(
    $courseID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelModuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    modulesByCourseID(
      courseID: $courseID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      Users {
        nextToken
        startedAt
      }
      image
      icon
      name
      descrption
      tags
      price
      discountPrice
      duration
      isEnabled
      trackID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCourses = /* GraphQL */ `
  query SyncCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const coursesByTrackID = /* GraphQL */ `
  query CoursesByTrackID(
    $trackID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coursesByTrackID(
      trackID: $trackID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      courses {
        nextToken
        startedAt
      }
      firstName
      lastName
      email
      bio
      userName
      phone
      country
      referalCode
      isActive
      isPromotion
      isTutor
      areaOfInterest
      profilePicture
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        bio
        userName
        phone
        country
        referalCode
        isActive
        isPromotion
        isTutor
        areaOfInterest
        profilePicture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        email
        bio
        userName
        phone
        country
        referalCode
        isActive
        isPromotion
        isTutor
        areaOfInterest
        profilePicture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getModuleResource = /* GraphQL */ `
  query GetModuleResource($id: ID!) {
    getModuleResource(id: $id) {
      id
      resourceId
      moduleId
      resource {
        id
        name
        image
        link
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      module {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listModuleResources = /* GraphQL */ `
  query ListModuleResources(
    $filter: ModelModuleResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModuleResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        resourceId
        moduleId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncModuleResources = /* GraphQL */ `
  query SyncModuleResources(
    $filter: ModelModuleResourceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncModuleResources(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        resourceId
        moduleId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const moduleResourcesByResourceId = /* GraphQL */ `
  query ModuleResourcesByResourceId(
    $resourceId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelModuleResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    moduleResourcesByResourceId(
      resourceId: $resourceId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        resourceId
        moduleId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const moduleResourcesByModuleId = /* GraphQL */ `
  query ModuleResourcesByModuleId(
    $moduleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelModuleResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    moduleResourcesByModuleId(
      moduleId: $moduleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        resourceId
        moduleId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCourseUser = /* GraphQL */ `
  query GetCourseUser($id: ID!) {
    getCourseUser(id: $id) {
      id
      courseId
      userId
      course {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        firstName
        lastName
        email
        bio
        userName
        phone
        country
        referalCode
        isActive
        isPromotion
        isTutor
        areaOfInterest
        profilePicture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCourseUsers = /* GraphQL */ `
  query ListCourseUsers(
    $filter: ModelCourseUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCourseUsers = /* GraphQL */ `
  query SyncCourseUsers(
    $filter: ModelCourseUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCourseUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        courseId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const courseUsersByCourseId = /* GraphQL */ `
  query CourseUsersByCourseId(
    $courseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    courseUsersByCourseId(
      courseId: $courseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        courseId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const courseUsersByUserId = /* GraphQL */ `
  query CourseUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    courseUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        courseId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
